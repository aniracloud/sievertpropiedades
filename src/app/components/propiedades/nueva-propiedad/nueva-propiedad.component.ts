import { Component, OnInit, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder, ControlContainer, FormControlName, AbstractControl } from '@angular/forms';
import { PropiedadI } from '@shared/models/propiedad.interface';
import { PropiedadService } from '@components/propiedades/propiedad.service';
import { UbicacionesService } from '@shared/services/ubicaciones.service';

import { HttpErrorResponse } from '@angular/common/http';

import { STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';

import { MatAccordion} from '@angular/material/expansion';
import { concatMapTo, map } from 'rxjs/operators';
import { getTestBed } from '@angular/core/testing';
import { FormValidations } from './mode.validator';
import { pipe} from 'rxjs';
import { SlicePipe } from '@angular/common';



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


  modalidad = ['Arriendo', 'Venta'];



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



  public build_floor = '';


  public valorUF: any;

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;




  constructor(  private propiedadSvc: PropiedadService,
                public UbicacionSvc: UbicacionesService,
                private _formBuilder: FormBuilder,

                ) {}


  ngOnInit() {

    this.firstFormGroup = this._formBuilder.group({
      titulo:           ['', [Validators.required,
                            Validators.minLength(5),
                            Validators.maxLength(30),
                            Validators.pattern('^[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ ]+$')]],
      direccion:       ['', Validators.required],
      regionSelected:  ['', Validators.required],
      comunaSelected:  ['', Validators.required],
      codigo:          ['', Validators.pattern('\\-?\\d*\\.?\\d{1,2}')],
      typeSelected:    ['', Validators.required],
      modalidad:       this.buildModalidad()
     // modalidad: this._formBuilder.group({
      //  rent:    [''],
      //  sales:    ['']
      });


    this.secondFormGroup = this._formBuilder.group({
      building:   [''],
      old_build:       [''],
      met_utiles:   ['', Validators.required],
      build_floor:  ['', Validators.pattern('^[0-9]+$')],

      bedroom:  ['', Validators.required],
      bath:         ['', Validators.required],
      build_terrace: ['', Validators.required],
      store:        ['', Validators.required],


      orienta:      ['', Validators.required],
      control:      ['', Validators.required],


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

        this.getFieldNumber();
  }

  buildModalidad(){
    const values = this.modalidad.map(value => new FormControl(false));
    console.log(values[1]);
    return this._formBuilder.array(values,FormValidations.requiredMinCheckbox(1));
    /* this._formBulder.array([
      new FormControl(false),
      new FormControl(false)
    ]);*/
  }



  getModalidadControl() {
    return this.firstFormGroup.get('modalidad') ? (<FormArray>this.firstFormGroup.get('modalidad')).controls : null;
  }






  OnChange($event): any{
    // MatCheckboxChange {checked,MatCheckbox}
   console.log($event.values);
   console.log($event);
   if ($event){
    return this.firstFormGroup.valid;
  }

  }

  onSubmit(){
    console.log('Valores => ' + JSON.stringify(this.firstFormGroup.value));
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


  getFieldNumber() {
    //const valor = (this.secondFormGroup.get('build_floor').value);
    this.secondFormGroup.get('build_floor').valueChanges
    .subscribe(val=>{


      console.log(val | SlicePipe '1:2');
    });

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
