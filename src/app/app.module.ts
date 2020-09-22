import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NuevaPropiedadComponent } from './components/propiedades/nueva-propiedad/nueva-propiedad.component';
import { NuevaPropiedadModule } from './components/propiedades/nueva-propiedad/nueva-propiedad.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { ToolbarComponent } from './shared/components/toolbar/toolbar.component';


/* Firebase */

import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule, BUCKET } from '@angular/fire/storage';//StorageBucket

import { AngularFireAuthModule } from '@angular/fire/auth';


import { environment } from '../environments/environment';
import { ReactiveFormsModule } from '@angular/forms';
import { ContainerAppComponent } from './components/pages/container-app/container-app.component';
import { ModalComponent } from './shared/components/modal/modal.component';
import { EditPropiedadComponent } from './components/propiedades/edit-propiedad/edit-propiedad.component';
import { EditPropiedadModule } from './components/propiedades/edit-propiedad/edit-propiedad.module';
import { DetailsPropiedadComponent } from './components/propiedades/details-propiedad/details-propiedad.component';
import { SearchPropiedadesModule } from './components/propiedades/search-propiedades/search-propiedades.module';


import { HttpClientModule } from '@angular/common/http';

import { FormsModule } from '@angular/forms';


import { UfPipe } from './shared/pipes/thousandsPipe';





@NgModule({
  declarations: [
    AppComponent,
    NuevaPropiedadComponent,
    ToolbarComponent,
    ContainerAppComponent,
    ModalComponent,
    EditPropiedadComponent,
    DetailsPropiedadComponent,
    UfPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AppRoutingModule,
    NuevaPropiedadModule,
    AngularFireAuthModule,
    MaterialModule,
    ReactiveFormsModule,
    EditPropiedadModule,
    SearchPropiedadesModule,
    HttpClientModule,
    FormsModule

  ],
  entryComponents:[ModalComponent],
  providers: [
    {provide: BUCKET, useValue: 'gs://sievertpropiedades-26a87.appspot.com'},
    {provide: LOCALE_ID, useValue: 'es-CL' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

//StorageBucket
