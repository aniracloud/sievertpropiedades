import { Component, OnInit, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder, ControlContainer } from '@angular/forms';
import { PropiedadI } from '@shared/models/propiedad.interface';
import { PropiedadService } from '@components/propiedades/propiedad.service';
import { UbicacionesService } from '@shared/services/ubicaciones.service';

import { deptoInterface} from '@shared/models/caract_depto.interface';



import { of, from, BehaviorSubject, Observable} from 'rxjs';

import {map, startWith} from 'rxjs/operators';

import { Task } from '@shared/models/taks.interface';

import { HttpErrorResponse } from '@angular/common/http';

import { STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';

import { MatAccordion} from '@angular/material/expansion';









@Component({
  selector: 'app-nueva-propiedad',
  templateUrl: './nueva-propiedad.component.html',
  styleUrls: ['./nueva-propiedad.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {showError: true}
  }]
})





export class NuevaPropiedadComponent implements OnInit {

  @ViewChild ('firstAccordion', { static: true }) firstAccordion: MatAccordion;
  @ViewChild ('secondAccordion', { static: true }) secondAccordion: MatAccordion;

  private image: any;
  private ubica: any;
  public region: any;


  name = new FormControl('');

  calefa2: Array<string> = ['Loza Radiante', 'Radiador Ind.', 'Caldera Ind.', 'Caldera Edificio'];
  orienta2 = ['N', 'NP', 'NO', 'S', 'SO', 'SP'];
  comunidad2 = ['Gimnacio', 'Zona Juegos', 'Quincho', 'Bicicletero', 'Area Verde', 'Picina'];
  ItemSelectedValues = [];
  others_build: string[] = ['cocina americana', 'Estar', 'Logia', 'Patio', 'Home Office'];
  othersInstallBuild: string[] = ['Conserje', 'Areas Verdes', 'Sauna', 'Ascensor', 'Bicicletero', 'Piscina', 'Estacionamiento Visitas', 'Gimnasio', 'Sala Multiuso', 'Quincho'];



  regionesChile: any = null;
  tipoPropiedades: any = null;
  comunasChile: any;
  comunas: '';
  comunaSelected: string;
  tipoSelected: string;




  valorPrecioPeso = '';
  valorPrecioUF = '';
  valorcasilla: false;


  firstNameAutofilled: boolean ;
  lastNameAutofilled: boolean ;


  public valorUF: any;

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;




  constructor(  private propiedadSvc: PropiedadService,
                public UbicacionSvc: UbicacionesService,
                private _formBuilder: FormBuilder
                ) {}


  ngOnInit() {

    this.firstFormGroup = this._formBuilder.group({
      titulo:          ['', Validators.required],
      direccion:       ['', Validators.required],
      regionSelected:  ['', Validators.required],
      comunaSelected:  ['', Validators.required],
      codigo:          [''],
      typeSelected:    ['', Validators.required],
      rent:    [''],
      sales:    ['']
    });



    this.secondFormGroup = this._formBuilder.group({
      secondCtrl:   ['', Validators.required],
      Constr:       ['', Validators.required],
      Met_utiles:   ['', Validators.required],
      build_floor:  ['', Validators.required],
      build_terrace: ['', Validators.required],
      orienta:      ['', Validators.required],
      control:      ['', Validators.required],
      bedroom:      ['', Validators.required],
      bath:         ['', Validators.required],
      old_build:    ['', Validators.required],
      store:        ['', Validators.required],
      description:  ['', Validators.required]






    });



    this.thirdFormGroup = this._formBuilder.group({
      secondCtrl:       ['', Validators.required],
      valorPrecioUF:    ['', Validators.required],
      valorPrecioPeso:  ['', Validators.required]
    });




    this.UbicacionSvc.getRegiones()
        .subscribe(dataRegiones => (this.regionesChile = dataRegiones),
                    (err: HttpErrorResponse ) => {
                        console.log('hay un error');
                        console.log(err.status);
                    },
                    () => { console.log('fin Regiones'); }
        );


    this.UbicacionSvc.getTipo()
        .subscribe(dataTipo => (this.tipoPropiedades = dataTipo),
                    (err: HttpErrorResponse) => {
                        console.log('hay un error');
                        console.log(err.status);
                    },
                    () => { console.log('fin Tipo'); }
        );


    this.UbicacionSvc.getEconomico()
        .subscribe(dataUF => (this.valorUF = dataUF),
                    (err: HttpErrorResponse) => {
                        console.log('hay un error');
                        console.log(err.status);
                    },
                    () => { console.log('fin Economico'); }
        );


  }

  OnChange($event){
    console.log($event);


    // MatCheckboxChange {checked,MatCheckbox}
}


  addNewPropiedad(data: PropiedadI) {
    console.log('New post', data);
    // this.propiedadSvc.preAddAndUpdatePropiedad(data, this.image);
  }



  handleimage(event: any): void {
      this.image = event.target.files[0];
  }




  getTecla(event: KeyboardEvent, tipo: string) {
    if ((event.keyCode === 13 && tipo === 'uf')) {
      console.log (this.valorPrecioUF);
      console.log (this.valorUF.uf.valor);
      this.valorPrecioPeso = ((+this.valorPrecioUF) * (+this.valorUF.uf.valor)).toLocaleString('es', { maximumFractionDigits: 0 });
    } else {
      if ((event.keyCode === 13 && tipo === 'peso')) {
        this.valorPrecioUF = ((+this.valorPrecioPeso) / (+this.valorUF.uf.valor)).toFixed();
        this.valorPrecioPeso = (+this.valorPrecioPeso).toLocaleString('es', { maximumFractionDigits: 0 });
      }
    }
    this.UbicacionSvc.check(event);
  }



  borracampo() {
    console.log('Estamos en borrar campo');
    this.valorPrecioPeso = '';
    this.valorPrecioUF = null;
  }




  activa() {

  }

  getItemSelectedValue() {
    this.ItemSelectedValues = [];
    this.calefa2.forEach((control, i) => {
      if (control) {
        this.ItemSelectedValues.push(this.calefa2[i]);
      }
    });
    console.log(this.ItemSelectedValues);
  }


  addFruitsControls() {

  }

  getComunaSelectedValue(region: string) {
    this.comunasChile = region;
  }

}
