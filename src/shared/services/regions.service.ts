import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { region } from '../models/region.model';

@Injectable({
  providedIn: 'root'
})
export class RegionsService {

  constructor(
    private http: HttpClient
  ) { }

  getRegioes() {
    return this.http.get<{results: region[]}>('https://pokeapi.co/api/v2/region')
  }
}
