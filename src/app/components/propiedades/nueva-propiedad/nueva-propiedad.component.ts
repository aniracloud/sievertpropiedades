import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ViewEncapsulation,
  ElementRef,
  HostListener,
  Pipe
} from '@angular/core';



import {
  FormGroup,
  FormControl,
  FormArray,
  Validators,
  FormBuilder
} from '@angular/forms';




import { PropiedadI } from '@shared/models/propiedad.interface';
import { PropiedadService } from '@components/propiedades/propiedad.service';
import { UbicacionesService } from '@shared/services/ubicaciones.service';

import { HttpErrorResponse } from '@angular/common/http';

import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';

import { MatAccordion } from '@angular/material/expansion';

import { FormValidations } from './mode.validator';


import { PesoPipe } from '../../../shared/pipes/thousandsPipe';


import { TrasformaService } from '@shared/services/trasforma.service';
import { MatSelectionListChange } from '@angular/material/list';

import { ModalidadPropiedad, OrientaPropiedad, OthersBuildPropiedad, OthersInstallBuildPropiedad } from '@shared/models/propiedad.interface';



import { map, filter } from 'rxjs/operators';
import { async } from '@angular/core/testing';




@Component({
  selector: 'app-nueva-propiedad',
  templateUrl: './nueva-propiedad.component.html',
  styleUrls: ['./nueva-propiedad.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ],
})



export class NuevaPropiedadComponent implements OnInit {
  @ViewChild('firstAccordion', { static: true }) firstAccordion: MatAccordion;
  @ViewChild('secondAccordion', { static: true }) secondAccordion: MatAccordion;

  @ViewChild('uf') nameFieldUF: ElementRef;

  //@Input() propiedad: PropiedadI;

  @Input() formData: FormGroup;

  private image: any;
  private ubica: any;
  public region: any;



  modalidad: ModalidadPropiedad[] = [
    {name: 'Arriendo', id: 1},
    {name: 'Venta', id: 2}
  ];


  calefa2: Array<string> = [
    'Loza Radiante',
    'Radiador Ind.',
    'Caldera Ind.',
    'Caldera Edificio',
  ];



  orienta2: OrientaPropiedad [] = [
    {name: 'N', id: 1},
    {name: 'NP', id: 2},
    {name: 'NO', id: 3},
    {name: 'S', id: 4},
    {name: 'SO', id: 5},
    {name: 'SP', id: 6}
  ];




  comunidad2 = [
    'Gimnacio',
    'Zona Juegos',
    'Quincho',
    'Bicicletero',
    'Area Verde',
    'Picina',
  ];

  ItemSelectedValues = [];



  OthersBuild: OthersBuildPropiedad [] = [
    {name: 'cocina americana', id: 1},
    {name: 'Estar', id: 2},
    {name: 'Logia', id: 3},
    {name: 'Patio', id: 4},
    {name: 'Home Office', id: 5}
  ];



  OthersInstallBuild: OthersInstallBuildPropiedad [] = [
    {name: 'Conserje', id: 1 },
    {name: 'Areas Verdes', id: 2},
    {name: 'Sauna', id: 3},
    {name: 'Ascensor', id: 4},
    {name: 'Bicicletero', id: 5},
    {name: 'Piscina', id: 6},
    {name: 'Estacionamiento Visitas', id: 7},
    {name: 'Gimnasio', id: 8},
    {name: 'Sala Multiuso', id: 9},
    {name: 'Quincho', id: 10}
  ];



  regionesChile: any = null;
  tipoPropiedades: any = null;
  comunasChile: any;
  comunaSelected: string;

  valorPrecioPeso = '';
  valorPrecioUF = null;
  valoruf = '';



  public valorUF: any;
  public regionSelected: any;

  //public xxx: PropiedadI;

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;


  constructor(
    private propiedadSvc: PropiedadService,
    public  UbicacionSvc: UbicacionesService,
    private _formBuilder: FormBuilder,
    public  trasformaSvc: TrasformaService
  ) {}





  ngOnInit() {

    this.firstFormGroup = this._formBuilder.group({
      titulo: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(30),
          Validators.pattern('^[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ ]+$'),
        ],
      ],
      direccion: ['', Validators.required],
      regionSelected: ['', Validators.required],
      comunaSelected: ['', Validators.required],
      codigoPostal: ['', Validators.pattern('\\-?\\d*\\.?\\d{1,2}')],
      tipoPropiedad: ['', Validators.required],
      modalidad: ['', Validators.required]     //this.buildModalidad(),
    });

    this.secondFormGroup = this._formBuilder.group({
      building: [''],
      old_build: [''],
      met_utiles: [''],
      build_floor: ['', Validators.pattern('^[0-9]+$')],
      bedroom: [''],
      bath: [''],
      build_terrace: [''],
      store: [''],
      estaciona: [''],
      orientacion: [],
      selectedAmbientes: [],
      selectedInstalaciones: [],
      description: ['', Validators.required],
    });

   /* this.secondFormGroup.valueChanges
        .pipe(
          filter<any>(data => this.secondFormGroup.valid),
          map(data => { data.description = data.description.replace(/<(?:.|\n)*?>/gm, '');
                        return data;
          })
        )
      .subscribe(data => console.log(JSON.stringify(data)));*/







    this.thirdFormGroup = this._formBuilder.group({
      valorPrecioUF: ['', Validators.required],
      valorPrecioPeso: ['', Validators.required],
    });

    this.UbicacionSvc.getRegiones().subscribe(
      (dataRegiones) => (this.regionesChile = dataRegiones),
      (err: HttpErrorResponse) => {
        console.log('hay un error');
        console.log(err.status);
      },
      () => {
        console.log('fin Regiones');
      }
    );

    this.UbicacionSvc.getTipo().subscribe(
      (dataTipo) => (this.tipoPropiedades = dataTipo),
      (err: HttpErrorResponse) => {
        console.log('hay un error');
        console.log(err.status);
      },
      () => {
        console.log('fin Tipo');
      }
    );









    this.UbicacionSvc.getEconomico().subscribe(
      (dataUF) => (this.valorUF = dataUF),
      (err: HttpErrorResponse) => {
        console.log('hay un error');
        console.log(err.status);
      },
      () => {
        console.log('fin Economico');
      }
    );

    // this.getFieldNumber();




    // tslint:disable-next-line: no-unused-expression

  }




  getother(change: MatSelectionListChange){

   // console.log(change.option.value, change.option.selected);

  }

  buildModalidad() {
    const values = this.modalidad.map((value) => new FormControl(false));

    return this._formBuilder.array(
      values,
      FormValidations.requiredMinCheckbox(1)
    );
  }

  getModalidadControl() {
    return this.firstFormGroup.get('modalidad')
      ? (<FormArray>this.firstFormGroup.get('modalidad')).controls
      : null;
  }


  OnChange($event: any[]): any {
    // MatCheckboxChange {checked,MatCheckbox}
    console.log($event.values);
    console.log($event);
    if ($event) {
      return this.firstFormGroup.valid;
    }
  }


  onSubmit() {
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
    if (event.key === 'Enter' && tipo === 'uf') {
      console.log(this.valorPrecioUF);
      console.log(this.valorUF.uf.valor);
      console.log('******************');
      this.valorPrecioPeso = (
        +this.valorPrecioUF * +this.valorUF.uf.valor
      ).toLocaleString('es', { maximumFractionDigits: 0 });
    } else {
      if (event.key === 'Enter' && tipo === 'peso') {
        this.valorPrecioUF = (
          +this.valorPrecioPeso / +this.valorUF.uf.valor
        ).toFixed();
        this.valorPrecioPeso = (+this.valorPrecioPeso).toLocaleString('es', {
          maximumFractionDigits: 0,
        });
      }
    }
    this.UbicacionSvc.check(event);
  }




  editName(event: KeyboardEvent) {
    // this.nameFieldUF.nativeElement.focus();
    this.thirdFormGroup.get('valorPrecioUF').valueChanges.subscribe((val) => {
      console.log(val);
    });
  }



  getFieldNumber(evt: KeyboardEvent, tipo: string): any {
    if (tipo === 'uf') {
      if (this.thirdFormGroup.get('valorPrecioUF').value === null) {
        this.valorPrecioPeso = '';
        return;
      }
      const valoruf2 = this.thirdFormGroup.get('valorPrecioUF').value;
      const valor3 = valoruf2.toString();
      if (valor3.length > 0 && valor3 !== '0') {
        if (evt.code === 'Enter') {
          console.log('Valor luego de presionar enter: ', valor3);
          return;
        } else {
          if (valoruf2 < 0) {
            this.valorPrecioUF = '';
            this.valorPrecioPeso = '';
          } else {
            this.valorPrecioPeso = (
              +this.valorPrecioUF * +this.valorUF.uf.valor
            ).toFixed();
          }
        }
      } else {
        this.valorPrecioUF = '';
        this.valorPrecioPeso = '';
      }
      if (evt.code === 'Enter' || evt.code === 'NumpadEnter') {
        console.log('se ha presionado enter o enterpad');
      }
      return;
    }
    if (tipo === 'peso') {
      console.log(evt.code);
      if (this.thirdFormGroup.get('valorPrecioPeso').value === null) {
        this.valorPrecioUF = '';
        return;
      }
      const valorpeso = this.thirdFormGroup.get('valorPrecioPeso').value;
      const valor = valorpeso.toString();
      if (valor.length > 0 && valor != '0') {
        console.log('presiono enter ', valorpeso);
        console.log('codigo enter ', evt.code);
        if (evt.code === 'Enter' || evt.code === 'NumpadEnter') {
          console.log('se ha presionado enter o enterpad');

         // const xxx = +this.valorPrecioPeso;
         // const options1 = { style: 'currency', currency: 'USD' };
         // const numberFormat1 = new Intl.NumberFormat('es-CL');
          //console.log(xxx.toLocaleString('es-CL'));
        //   this.valorPrecioPeso = numberFormat1.format(xxx);
          //this.valorPrecioPeso = (xxx.toLocaleString('es-CL'));

        }
        if (valorpeso < 1) {
          this.valorPrecioUF = '';
          this.valorPrecioPeso = '';
        } else {
          const x = (+this.valorPrecioPeso / this.valorUF.uf.valor).toPrecision(3);
          this.valorPrecioUF = +x;

          return;
        }
      } else {
        this.valorPrecioUF = '';
        this.valorPrecioPeso = '';
      }
      return;
    }
  }



  valida() {


   // console.log(typeof(this.firstFormGroup));


   /* const resultArray1 = Object.entries(this.firstFormGroup.value);
    const resultArray2 = Object.entries(this.secondFormGroup.value);
    const resultArray3 = Object.entries(this.thirdFormGroup.value);*/

   // this.propiedadSvc.componeArreglo(resultArray1, resultArray2, resultArray3);
    this.propiedadSvc.componeArreglo(this.firstFormGroup.value, this.secondFormGroup.value, this.thirdFormGroup.value);


/*
    this.propiedad.titulo = this.firstFormGroup.value.titulo;

    this.propiedad.direccion = this.firstFormGroup.value.direccion;
    this.propiedad.codigoPostal = this.firstFormGroup.value.codigoPostal;
    this.propiedad.region = this.firstFormGroup.value.regionSelected.region;
    this.propiedad.comunaSelected = this.firstFormGroup.value.comunaSelected;
    this.propiedad.modalidad[0].name = this.firstFormGroup.value.modalidad[0].name;
    this.propiedad.modalidad[1].name = this.firstFormGroup.value.modalidad[1].name;
    this.propiedad.tipoPropiedad = this.firstFormGroup.value.tipoPropiedad;
*/


  }




  borracampo() {
    console.log('Estamos en borrar campo');
    this.valorPrecioPeso = '';
    this.valorPrecioUF = null;
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

  addFruitsControls() {}


  getRegionSelectedValue(comuna: string, regionchile2: any) {
    this.comunasChile = comuna;
    this.regionSelected = regionchile2.region;

    //console.log('region seleccionada : ', this.regionSelected);
  }


  getComunaSelectedValue(comuna: string) {
    this.comunaSelected = comuna;
    //console.log('comuna seleccionada : ', this.comunaSelected);
  }


}
