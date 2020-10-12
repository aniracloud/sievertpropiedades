import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ViewEncapsulation,
  ElementRef,
  HostListener
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

  /*
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    console.log('Codigo del evento ', event.code);
    if((event.code === 'Enter') && (this.thirdFormGroup.get('valorPrecioUF').value != null) ){

      console.log('en el campo UF - Enter');
      const x = ((+this.valorPrecioPeso) / (this.valorUF.uf.valor)).toPrecision(3);
      this.valorPrecioUF = +x;

    }else{
      if((event.code === 'NumpadEnter') && (this.thirdFormGroup.get('valorPrecioUF').value != null) ){
        console.log('en el campo UF - NumpadEnter');
      }
    }

    }*/

  /*if (!this.isComparisonWindow) {
      if (event.key === 'ArrowLeft') {
        this.navigateLeft();
      } else if (event.key === 'ArrowRight') {
        this.navigateRight();
      }*/

  private image: any;
  private ubica: any;
  public region: any;


  modalidad = ['Arriendo', 'Venta'];

  calefa2: Array<string> = [
    'Loza Radiante',
    'Radiador Ind.',
    'Caldera Ind.',
    'Caldera Edificio',
  ];
  orienta2 = ['N', 'NP', 'NO', 'S', 'SO', 'SP'];
  comunidad2 = [
    'Gimnacio',
    'Zona Juegos',
    'Quincho',
    'Bicicletero',
    'Area Verde',
    'Picina',
  ];
  ItemSelectedValues = [];
  others_build: string[] = [
    'cocina americana',
    'Estar',
    'Logia',
    'Patio',
    'Home Office',
  ];
  othersInstallBuild: string[] = [
    'Conserje',
    'Areas Verdes',
    'Sauna',
    'Ascensor',
    'Bicicletero',
    'Piscina',
    'Estacionamiento Visitas',
    'Gimnasio',
    'Sala Multiuso',
    'Quincho',
  ];

  regionesChile: any = null;
  tipoPropiedades: any = null;
  comunasChile: any;
  comunas: '';
  comunaSelected: string;
  tipoSelected: string;

  valorPrecioPeso = '';
  valorPrecioUF = null;
  valorcasilla: false;
  valoruf = '';

  public build_floor = '';

  public valorUF: any;

  public regionSelected: any;


  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

  constructor(
    private propiedadSvc: PropiedadService,
    public UbicacionSvc: UbicacionesService,
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
      modalidad: this.buildModalidad(),
      // modalidad: this._formBuilder.group({
      //  rent:    [''],
      //  sales:    ['']
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

      orienta: [''],
      control: [''],
      ambientes: [],
      description: ['', Validators.required],
    });

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



  }



  buildModalidad() {
    const values = this.modalidad.map((value) => new FormControl(false));
    //console.log(values[1]);
    return this._formBuilder.array(
      values,
      FormValidations.requiredMinCheckbox(1)
    );
    /* this._formBulder.array([
      new FormControl(false),
      new FormControl(false)
    ]);*/
  }

  getModalidadControl() {
    return this.firstFormGroup.get('modalidad')
      ? (<FormArray>this.firstFormGroup.get('modalidad')).controls
      : null;
  }

  OnChange($event): any {
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
      if (valor3.length > 0 && valor3 != '0') {
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
    console.log('validando el formulario');
    console.log('region seleccionada : ', this.regionSelected);
    console.log('comuna seleccionada : ', this.comunaSelected);
    console.log('formulario 1', this.firstFormGroup);
    console.log('formulario 2', this.secondFormGroup);
    console.log('formulario 3', this.thirdFormGroup);
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
