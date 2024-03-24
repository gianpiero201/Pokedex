import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedComponentsModule } from 'src/shared/shared-components/shared-components.module';
import { PokemonsComponent } from './pokemons/pokemons.component';

@NgModule({
  declarations: [PokemonsComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: PokemonsComponent }]),
    SharedComponentsModule,
  ],
})
export class PokemonsModule {}
