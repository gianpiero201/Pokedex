import { Component, OnInit } from '@angular/core';
import { RegionsService } from 'src/shared/services/regions.service';
import { region } from '../../../../shared/models/region.model';
import { Pokemons } from '../pokemons.model';
import { PokemonsService } from '../pokemons.service';

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
  styleUrls: ['./pokemons.component.scss']
})
export class PokemonsComponent implements OnInit {

  regions: region[] = [];

  pokemons: Pokemons[] = [];

  pag: number = 1;

  constructor(
    private regionsService: RegionsService,
    private pokemonsService: PokemonsService
  ) { }

  ngOnInit(): void {
    this.getRegions();
    this.getPokemons();
  }

  getRegions() {
    this.regionsService.getRegioes().subscribe(regions => {
      this.regions = regions.results;
    })
  }

  getPokemons() {
    this.pokemonsService.getPokemons().subscribe(pokemons => {
      this.pokemons = pokemons.results;
      this.getPokemonDetails();
    })
  }

  getPokemonDetails() {
    this.pokemons.forEach(poke => {
      this.pokemonsService.getPokemonDetail(poke.url).subscribe(x =>{
        poke.abilities = x.abilities;
        poke.forms = x.forms;
        poke.game_indices = x.game_indices;
        poke.height = x.height;
        poke.held_items = x.held_items;
        poke.id = x.id;
        poke.is_default = x.is_default;
        poke.location_area_encounters = x.location_area_encounters;
        poke.moves = x.moves;
        poke.order = x.order;
        poke.past_types = x.past_types;
        poke.species = x.species;
        poke.sprites = x.sprites;
        poke.stats = x.stats;
        poke.types = x.types;
        poke.weight = x.weight;
      })
    })
  }

}
