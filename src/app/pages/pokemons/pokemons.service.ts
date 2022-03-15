import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pokemons } from './pokemons.model';


@Injectable({
  providedIn: 'root'
})
export class PokemonsService {

  constructor(
    private http: HttpClient
  ) { }

  getPokemons() {
    return this.http.get<{results: Pokemons[]}>('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1126');
  }

  getPokemonDetail(url: string) {
    return this.http.get<Pokemons>(url)
  }
}
