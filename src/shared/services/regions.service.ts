import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Region } from '../models/region.model';

@Injectable({
  providedIn: 'root'
})
export class RegionsService {

  constructor(
    private http: HttpClient
  ) { }

  getRegioes() {
    return this.http.get<{results: Region[]}>('https://pokeapi.co/api/v2/region')
  }
}
