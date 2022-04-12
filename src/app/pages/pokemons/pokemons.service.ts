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

  getPokemons(limit = 898,offset = 0) {
    return this.http.get<{results: Pokemons[]}>("https://pokeapi.co/api/v2/pokemon?limit="+limit+"&offset="+offset);
  }

  getPokemonDetail(url: string) {
    return this.http.get<Pokemons>(url);
  }

  getPokemonOfRegion(regionId: string) {
    return this.http.get(`https://pokeapi.co/api/v2/generation/${regionId}`);
  }

  getPokemonSpriteGif(name: string) {
    return this.http.get(`https://projectpokemon.org/images/sprites-models/swsh-normal-sprites/${name}.gif`)
  }
}
