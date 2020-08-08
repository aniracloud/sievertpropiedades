import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import { AuthGuard } from '../../shared/guards/auth.guard';


const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'propiedades',
        loadChildren: () =>
        import('../propiedades/lista-propiedades/lista-propiedades.module').then(
          m => m.ListaPropiedadesModule
        )
      },
      { path: 'profile',
        loadChildren: () =>
        import('./profile/profile.module').then(m => m.ProfileModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
