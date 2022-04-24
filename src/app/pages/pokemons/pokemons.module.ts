import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonsComponent } from './pokemons/pokemons.component';
import { RouterModule } from '@angular/router';
import { SharedComponentsModule } from 'src/shared/shared-components/shared-components.module';
import { FormsModule } from '@angular/forms';
import { NgApexchartsModule } from "ng-apexcharts";


@NgModule({
  declarations: [
    PokemonsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      { path: '', component: PokemonsComponent}
    ]),
    SharedComponentsModule,
    NgApexchartsModule
  ]
})
export class PokemonsModule { }
