import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { forkJoin } from 'rxjs';
import { RegionsService } from 'src/shared/services/regions.service';
import { Region } from '../../../../shared/models/region.model';
import { Pokemon } from '../pokemons.model';
import { PokemonsService } from '../pokemons.service';

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
  styleUrls: ['./pokemons.component.scss'],
})
export class PokemonsComponent implements OnInit {
  regions: Region[] = [
    {
      id: 0,
      name: 'Todas',
    },
  ];

  pokemons: Pokemon[] = [];
  pokeFilter: Pokemon[] = [];
  pokemonsInRegion: Pokemon[] = [];
  search: string;
  selectedPokemon?: Pokemon;
  stats: { value: number; name: string }[] = [];
  selectedRegion: Region;
  isLoading = true;
  LoadingRegion = false;
  colorScheme: Color = {
    name: '',
    group: ScaleType.Linear,
    selectable: false,
    domain: ['#00bb00', '#fbff00', '#ff9900', '#00c4ff', '#9310f7', '#e12df7'],
  };
  statsSum: number = 0;

  pag: number = 1;

  @ViewChild('charts') charts: ElementRef<HTMLDivElement>;
  @ViewChild('regionsTopBar') regionsTopBar: ElementRef<HTMLDivElement>;
  @ViewChild('topBarPokemons') topBarPokemons: ElementRef<HTMLDivElement>;

  constructor(
    private regionsService: RegionsService,
    private pokemonsService: PokemonsService
  ) {}

  ngOnInit(): void {
    this.isLoading = false;
    forkJoin({
      regions: this.getRegions(),
      pokemons: this.getPokemons(),
    }).subscribe({
      next: (response) => {
        this.pokemons = response.pokemons.data.pokemons;
        this.pokeFilter = this.pokemons;

        this.regions = [...this.regions, ...response.regions.results];
        this.regions.forEach((r) => {
          r.id = response.regions.results.indexOf(r) + 1;
        });
        this.getPokemonsOfRegion(this.regions[0]);
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  getPokemons() {
    return this.pokemonsService.getPokemons();
  }

  getRegions() {
    return this.regionsService.getRegioes();
  }

  sumStatus() {
    this.statsSum = 0;
    this.selectedPokemon?.stats?.forEach((pokemonStat) => {
      this.statsSum += pokemonStat.base_stat;
    });
  }

  getPokemonsOfRegion(region: Region) {
    this.LoadingRegion = true;
    this.selectedRegion = region;

    if (region.id === 0) {
      this.pokemonsInRegion = this.pokemons;
    } else {
      this.pokemonsInRegion = this.pokemons.filter((p) => {
        return p.specy.generation.region.id == region.id;
      });
      if (this.selectedPokemon?.specy.generation.region.id !== region.id) {
        this.selectedPokemon = this.pokemonsInRegion[0];
      }
    }

    this.filterUpdate();

    this.showLinks(true);
    this.LoadingRegion = false;
  }

  filterUpdate() {
    const search = this.search?.toUpperCase();

    this.pokeFilter = this.pokemonsInRegion.filter((poke) => {
      return (
        !search ||
        poke.name?.toUpperCase().includes(search) ||
        poke.id?.toString().includes(search)
      );
    });
    this.isLoading = false;
    this.LoadingRegion = false;
  }

  showLinks(selectedRegion = false) {
    const classes = this.regionsTopBar.nativeElement.classList;

    if (classes.contains('show') || selectedRegion) {
      this.regionsTopBar.nativeElement.classList.remove('show');
      this.topBarPokemons.nativeElement.classList.add('show');
    } else {
      this.regionsTopBar.nativeElement.classList.add('show');
      this.topBarPokemons.nativeElement.classList.remove('show');
    }
  }

  selectPokemon(poke: Pokemon) {
    if (this.selectedPokemon === poke) {
      this.selectedPokemon = undefined;
      return;
    }
    this.selectedPokemon = poke;
  }
}
