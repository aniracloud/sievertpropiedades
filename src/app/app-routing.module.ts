import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule, RouterLinkActive } from '@angular/router';
import { ContainerAppComponent } from './components/pages/container-app/container-app.component';
import { DetailsPropiedadComponent } from './components/propiedades/details-propiedad/details-propiedad.component';



const routes: Routes = [
  {
    path: '', component: ContainerAppComponent,
    children: [
      { path: 'home', loadChildren: () => import('./components/pages/home/home.module').then(m => m.HomeModule) },
      { path: 'propiedad/:id', component: DetailsPropiedadComponent },
      { path: 'about', loadChildren: () => import('./components/pages/about/about.module').then(m => m.AboutModule)
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      }
    ]
  },
  { path: 'admin', loadChildren: () => import('./components/admin/admin.module').then(m => m.AdminModule) },
  { path: 'login', loadChildren: () => import('./components/auth/login/login.module').then(m => m.LoginModule) },
  { path: 'ayuda', loadChildren: () => import('./components/admin/ayuda/ayuda.module').then(m => m.AyudaModule) },
  { path: 'upload-image', loadChildren: () => import('./shared/upload-image/upload-image.module').then(m => m.UploadImageModule) }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
