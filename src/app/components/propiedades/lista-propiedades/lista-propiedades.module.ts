import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListaPropiedadesRoutingModule } from './lista-propiedades-routing.module';
import { ListaPropiedadesComponent } from './lista-propiedades.component';
import { MaterialModule } from '../../../material.module';
import { TableComponent } from '../../../shared/components/table/table.component';




@NgModule({
  declarations: [ListaPropiedadesComponent, TableComponent],
  imports: [
    CommonModule,
    ListaPropiedadesRoutingModule,
    MaterialModule
  ]
})
export class ListaPropiedadesModule { }
