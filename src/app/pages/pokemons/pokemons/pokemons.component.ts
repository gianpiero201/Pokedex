import { Component, OnInit } from '@angular/core';
import { RegionsService } from 'src/shared/services/regions.service';
import { Region } from '../../../../shared/models/region.model';
import { Pokemons, Species } from '../pokemons.model';
import { PokemonsService } from '../pokemons.service';

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
  styleUrls: ['./pokemons.component.scss'],
})
export class PokemonsComponent implements OnInit {
  regions: Region[] = [];

  pokemons: Pokemons[] = [];
  pokeFilter: Pokemons[] = [];
  search: string;
  selectedPokemon: Pokemons;
  selectedRegion: Region = {id: "-1",name: ""};
  isLoading = true;
  LoadingRegion = false;

  pag: number = 1;

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
    });
  }

  async getPokemons() {
    const pokemons = (await this.pokemonsService.getPokemons().toPromise()) as {
      results: Pokemons[];
    };
    this.pokemons = pokemons.results;
    this.selectedPokemon = pokemons.results[0];
    this.getPokemonDetails();
  }

  getPokemonDetails() {
    this.pokemons.forEach(async (poke) => {
      const pokemonsDetails = (await this.pokemonsService
        .getPokemonDetail(poke.url)
        .toPromise()) as Pokemons;
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
    });
    setTimeout(() => {
      this.filterUpdate();
    }, 2000);
  }

  regionClick(region: Region) {
    this.LoadingRegion = true
    if (this.selectedRegion.id === region.id) {
      this.selectedRegion = {id: "-1",name: ""};
      this.filterUpdate();
      return;
    }

    this.selectedRegion = region;
    this.getPokemonsOfRegion();
  }

  async getPokemonsOfRegion() {
    const pokemonsOfRegion = (await this.pokemonsService
      .getPokemonOfRegion(this.selectedRegion.id).toPromise() as any)['pokemon_species'] as Species[];

    this.pokeFilter = this.pokemons.filter(p => {
      return !!pokemonsOfRegion.find(pr => pr.name === p.species.name)
    })

    this.LoadingRegion = false;
  }

  filterUpdate() {
    const search = this.search?.toUpperCase();

    this.pokeFilter = this.pokemons.filter((poke) => {
      return (
        !search ||
        poke.name?.toUpperCase().includes(search) ||
        poke.id?.toString().includes(search)
      );
    });
    this.isLoading = false;
    this.LoadingRegion = false
  }
}
