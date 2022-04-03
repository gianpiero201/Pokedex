import { Component, OnInit } from '@angular/core';
import { RegionsService } from 'src/shared/services/regions.service';
import { region } from '../../../../shared/models/region.model';
import { Pokemons } from '../pokemons.model';
import { PokemonsService } from '../pokemons.service';

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
  styleUrls: ['./pokemons.component.scss'],
})
export class PokemonsComponent implements OnInit {
  regions: region[] = [];

  pokemons: Pokemons[] = [];
  pokeFilter: Pokemons[] = [];
  search: string;
  selectedPokemon: Pokemons;
  isLoading = true;
  openedPokedex = false;
  opdex = false;

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
    });
  }

  async getPokemons() {
      const pokemons = await this.pokemonsService.getPokemons().toPromise() as {results: Pokemons[]};
      this.pokemons = pokemons.results;
      this.getPokemonDetails();
      this.filterUpdate();
  }

  getPokemonDetails() {
    this.pokemons.forEach(async (poke) => {
      const pokemonsDetails = await this.pokemonsService.getPokemonDetail(poke.url).toPromise() as Pokemons;
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
      this.isLoading = false;
    }, 2000);
  }

  getPokemonsOfRegion() {
    this.pokemons
  }

  filterUpdate() {
    const search = this.search?.toUpperCase();

    this.pokeFilter = this.pokemons.filter(poke => {
      return (!search || (
        poke.name?.toUpperCase().includes(search) ||
        poke.id?.toString().includes(search))
       );
    })
  }


  openPokedex() {
    setTimeout(() => {
      this.opdex = true;
    }, 800);
  }
}
