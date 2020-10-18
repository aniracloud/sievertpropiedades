 /*export interface PropiedadI {
  titlePropiedad: string;
  contentPropiedad: string;
  imagePropiedad?: any;
  id?: string;
  tagsPropiedad: string;
  fileRef?: string;
}*/

// tslint:disable-next-line: class-name
export interface modalidadPropiedad{
  name: string;
  id: number ;
}

export interface PropiedadI {

  titlePropiedad: string;
  contentPropiedad: string;
  imagePropiedad?: any;
  id?: string;
  tagsPropiedad: string;
  fileRef?: string;


  codigoPostal: number;
  comunaSelected: string;
  direccion: string;
  modalidad: modalidadPropiedad[];
  region: string;
  tipoPropiedad: string;
  titulo: string;

/******  Formulario 2 ******/

  bath: number;
  bedroom: number;
  build_floor: number;
  build_terrace: number;
  building: string;
  description: string;
  met_utiles: string;
  old_build: Date;
  orientacion: modalidadPropiedad[];
  selectedAmbientes: modalidadPropiedad[];
  selectedInstalaciones: modalidadPropiedad[];
  store: number;
  estaciona: number;

/****  Formulario 3 ***/

  valorPrecioPeso: string;
  valorPrecioUF: number;
}
