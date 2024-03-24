import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { pathMatch: 'full', path: '', redirectTo: 'regions'},
  { path: 'regions', loadChildren: () => import('./pages/pokemons/pokemons.module').then(m => m.PokemonsModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
