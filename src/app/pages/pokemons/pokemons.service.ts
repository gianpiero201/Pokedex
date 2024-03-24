import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Pokemon } from './pokemons.model';

@Injectable({
  providedIn: 'root',
})
export class PokemonsService {
  constructor(private http: HttpClient) {}

  getPokemons() {
    let query = {
      query: `query MyQuery {
          pokemons: pokemon_v2_pokemon(limit: 1025) {
            id
            name
            sprites: pokemon_v2_pokemonsprites {
              front_default: sprites(path: "front_default")
            }
            stats: pokemon_v2_pokemonstats {
              base_stat
              effort
              stat: pokemon_v2_stat {
                name
              }
            }
            types: pokemon_v2_pokemontypes {
              slot
              type: pokemon_v2_type {
                name
              }
            }
            specy: pokemon_v2_pokemonspecy {
              generation: pokemon_v2_generation {
                region: pokemon_v2_region {
                  id
                  name
                }
              }
            }
          }
        }`,
      variables: null,
      operationName: 'MyQuery',
    };

    return this.http.post<{ data: { pokemons: Pokemon[] } }>(
      environment.graphql,
      query
    );
  }

  // getPokemonDetail() {
  //   //return this.poke.getPokemonById(id);
  //   let query = {
  //     query:
  //       'query MyQuery {\n  pokemons: pokemon_v2_pokemon(limit: 1025) {\n    id\n    name\n    sprites: pokemon_v2_pokemonsprites {\n      front_default: sprites(path: "front_default")\n    }\n  }\n}\n',
  //     variables: null,
  //     operationName: 'MyQuery',
  //   };

  //   return this.http.post<{ data: { pokemons: Pokemon[] } }>(
  //     environment.graphql,
  //     query
  //   );
  // }

  getPokemonOfRegion(regionId: string) {
    return this.http.get(`https://pokeapi.co/api/v2/generation/${regionId}`);
  }

  getPokemonSpriteGif(name: string) {
    return this.http.get(
      `https://projectpokemon.org/images/sprites-models/swsh-normal-sprites/${name}.gif`
    );
  }
}
