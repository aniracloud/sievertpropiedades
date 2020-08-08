import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaPropiedadesComponent } from './lista-propiedades.component';

const routes: Routes = [{ path: '', component: ListaPropiedadesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListaPropiedadesRoutingModule { }
