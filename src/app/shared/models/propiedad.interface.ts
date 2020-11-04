 /*export interface PropiedadI {
  titlePropiedad: string;
  contentPropiedad: string;
  imagePropiedad?: any;
  id?: string;
  tagsPropiedad: string;
  fileRef?: string;
}*/

export class ModalidadPropiedad{
  name: string;
  id: number ;
}

export class OrientaPropiedad{
  name: string;
  id: number;
}

export class OthersBuildPropiedad{
  name: string;
  id: number;
}

export class OthersInstallBuildPropiedad{
  name: string;
  id: number;
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
  modalidad: ModalidadPropiedad[]; /****     agregar  ***/
  region: string;
  tipoPropiedad: string;

/******  Formulario 2 ******/

  bath: number;
  bedroom: number;
  build_floor: number;
  build_terrace: number;
  building: string;
  description: string;
  met_utiles: number; /* cambiar typo */
  old_build: Date;
  orientacion: ModalidadPropiedad[]; /**** agregar ***/
  selectedAmbientes: ModalidadPropiedad[]; /**** agregar ***/
  selectedInstalaciones: ModalidadPropiedad[]; /**** agregar ***/
  store: number;
  estaciona: number;

/****  Formulario 3 ***/

  valorPrecioPeso: string;
  valorPrecioUF: number;
}
