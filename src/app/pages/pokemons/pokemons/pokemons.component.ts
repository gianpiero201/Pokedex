import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { Pokemon, PokemonSpecies } from 'pokenode-ts';
import { RegionsService } from 'src/shared/services/regions.service';
import { Region } from '../../../../shared/models/region.model';
import { PokemonsService } from '../pokemons.service';

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
  styleUrls: ['./pokemons.component.scss'],
})
export class PokemonsComponent implements OnInit {
  regions: Region[] = [];

  pokemons: Pokemon[] = [];
  pokeFilter: Pokemon[] = [];
  pokemonsInRegion: Pokemon[] = [];
  search: string;
  selectedPokemon: Pokemon;
  stats: {value: number, name: string}[] = []
  selectedRegion: Region;
  isLoading = true;
  LoadingRegion = false;
  colorScheme: Color = {
    name: '',
    group: ScaleType.Linear,
    selectable: false,
    domain: ['#00bb00','#fbff00','#ff9900','#00c4ff','#9310f7','#e12df7']
  };


  pag: number = 1;

  @ViewChild('charts') charts: ElementRef<HTMLDivElement>;
  @ViewChild('regionsTopBar') regionsTopBar: ElementRef<HTMLDivElement>;
  @ViewChild('topBarPokemons') topBarPokemons: ElementRef<HTMLDivElement>;


  constructor(
    private regionsService: RegionsService,
    private pokemonsService: PokemonsService
  ) {}

  ngOnInit(): void {
    this.getRegions();
    this.getPokemons();
  }

  getRegions() {
    this.regionsService.getRegioes().subscribe((regions) => {
      this.regions = regions.results;
      this.regions.forEach(r => {
        r.id = (regions.results.indexOf(r)+1).toString();
      })
      this.selectedRegion = this.regions[0];
    });
  }

  async getPokemons() {
    const pokemons = (await this.pokemonsService.getPokemons().toPromise()) as {
      results: Pokemon[];
    };
    this.pokemons = pokemons.results;
    this.getPokemonsOfRegion(this.regions[0]);
  }

  getPokemonDetails() {
    this.pokemonsInRegion.forEach(async (poke,index) => {
      let pokeId = poke.url.replace("https://pokeapi.co/api/v2/pokemon/","").replace("/","");
      const pokemonsDetails = (await this.pokemonsService.getPokemonDetail(Number.parseInt(pokeId,10)));

      poke.abilities = pokemonsDetails.abilities;
      poke.forms = pokemonsDetails.forms;
      poke.game_indices = pokemonsDetails.game_indices;
      poke.height = pokemonsDetails.height;
      poke.held_items = pokemonsDetails.held_items;
      poke.id = pokemonsDetails.id;
      poke.is_default = pokemonsDetails.is_default;
      poke.location_area_encounters = pokemonsDetails.location_area_encounters;
      poke.moves = pokemonsDetails.moves;
      poke.order = pokemonsDetails.order;
      poke.past_types = pokemonsDetails.past_types;
      poke.species = pokemonsDetails.species;
      poke.sprites = pokemonsDetails.sprites;
      poke.stats = pokemonsDetails.stats;
      poke.types = pokemonsDetails.types;
      poke.weight = pokemonsDetails.weight;

      if (index == this.pokemonsInRegion.length-1) {
        this.filterUpdate();
        this.chartLoading();
      }
    });
  }

  chartLoading() {
    this.stats = [];
    this.selectedPokemon.stats.forEach(pokemonStat => {
      this.stats.push({name: pokemonStat.stat.name, value: pokemonStat.base_stat})
    })
  }

  async getPokemonsOfRegion(region: Region) {
    this.LoadingRegion = true;
    this.selectedRegion = region;

    const pokemonsOfRegion = (await this.pokemonsService
      .getPokemonOfRegion(this.selectedRegion.id).toPromise() as any)['pokemon_species'] as PokemonSpecies[];

    this.pokemonsInRegion = this.pokemons.filter(p => {
      return !!pokemonsOfRegion.find(pr => pr.name.toUpperCase() === p.name.toUpperCase())
    })
    this.selectedPokemon = this.pokemonsInRegion[0];
    this.getPokemonDetails();
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

  showLinks() {
    const classes = this.regionsTopBar.nativeElement.classList;

    if (classes.contains('show')) {
      this.regionsTopBar.nativeElement.classList.remove('show');
      this.topBarPokemons.nativeElement.classList.add('show');
    } else {
      this.regionsTopBar.nativeElement.classList.add('show');
      this.topBarPokemons.nativeElement.classList.remove('show');

    }
  }
}
