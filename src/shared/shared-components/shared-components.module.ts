import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardBodyComponent } from './card-body/card-body.component';
import { LoadingComponent } from './loading/loading.component';



@NgModule({
  declarations: [
    CardBodyComponent,
    LoadingComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CardBodyComponent,
    LoadingComponent
  ]
})
export class SharedComponentsModule { }
