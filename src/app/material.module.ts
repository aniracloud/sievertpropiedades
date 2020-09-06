import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/pages/home/home.component';


import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, DateAdapter } from '@angular/material/core';
import { MatMomentDateModule, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';

import { MatExpansionModule } from '@angular/material/expansion';



import {MatButtonModule} from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {MatMenuModule} from '@angular/material/menu';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatDividerModule} from '@angular/material/divider';
import {MatChipsModule} from '@angular/material/chips';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';

import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import {MatAutocompleteModule} from '@angular/material/autocomplete';


import { MatCheckboxModule } from '@angular/material/checkbox';

import {MatStepperModule} from '@angular/material/stepper';

import { CdkTreeModule } from '@angular/cdk/tree';

import { MatFormFieldModule } from '@angular/material/form-field';

import { CdkTableModule } from '@angular/cdk/table';

import { TextFieldModule } from '@angular/cdk/text-field';

import {MatRadioModule} from '@angular/material/radio';

import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';


const mymodule = [
  MatRadioModule,
  TextFieldModule,
  CdkTableModule,
  CdkTreeModule,
  MatButtonModule,
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatSidenavModule,
  MatListModule,
  MatCardModule,
  MatProgressSpinnerModule,
  MatChipsModule,
  MatDividerModule,
  MatFormFieldModule,
  MatInputModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatDialogModule,
  MatSelectModule,
  MatAutocompleteModule,
  MatStepperModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatMomentDateModule,
  MatExpansionModule
];


@NgModule({
  declarations: [],
  imports: [ CommonModule, mymodule, MatCheckboxModule, MatExpansionModule],
  exports: [ mymodule, MatCheckboxModule ]
})
export class MaterialModule { }
