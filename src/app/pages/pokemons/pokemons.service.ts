import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocationClient, Pokemon, PokemonClient } from 'pokenode-ts';

@Injectable({
  providedIn: 'root',
})
export class PokemonsService {
  constructor(private http: HttpClient) {}

  location = new LocationClient();
  poke = new PokemonClient();

  getPokemons(limit = 898, offset = 0) {
    return this.http.get<{ results: Pokemon[] }>(
      'https://pokeapi.co/api/v2/pokemon?limit=' + limit + '&offset=' + offset
    );
  }

  getPokemonDetail(id: number) {
    return this.poke.getPokemonById(id);
  }

  getPokemonOfRegion(regionId: string) {
    return this.http.get(`https://pokeapi.co/api/v2/generation/${regionId}`);
  }

  getPokemonSpriteGif(name: string) {
    return this.http.get(
      `https://projectpokemon.org/images/sprites-models/swsh-normal-sprites/${name}.gif`
    );
  }
}
