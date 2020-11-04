import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, finalize } from 'rxjs/operators';
import { PropiedadI } from '@shared/models/propiedad.interface';
import { FileI } from '@shared/models/file.interface';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormGroup } from '@angular/forms';
import { database } from 'firebase';
import { tipoPropiedad } from '../../shared/models/tipopropiedad.interface';


@Injectable({
  providedIn: 'root'
})





export class PropiedadService {

  private propiedadescollection: AngularFirestoreCollection<PropiedadI>;
  private filePath: any;
  private downloadURL: Observable<string>;

  steps = [];

  constructor(
    private afs: AngularFirestore,
    private storage: AngularFireStorage) {
    this.propiedadescollection = afs.collection<PropiedadI>('propiedades');
  }

  public getAllPropiedades():Observable<PropiedadI[]> {
    return this.propiedadescollection
    .snapshotChanges()
    .pipe(
      map(actions =>
        actions.map(a =>{
          const data = a.payload.doc.data() as PropiedadI;
          const id = a.payload.doc.id;
          return { id, ... data};
        })
      )
    );
  }


  public getOnePropiedad(id: PropiedadI):Observable<PropiedadI> {
    return this.afs.doc<PropiedadI>(`propiedades/${id}`).valueChanges();
  }


   public deletePropiedadById(propiedad: PropiedadI){
     return this.propiedadescollection.doc(propiedad.id).delete();
   }


  public editPropiedadById(propiedad: PropiedadI, newImage?: FileI) {

    if (newImage) {
      this.uploadimage(propiedad, newImage);
      console.log('Si cambio la imagen');
    } else {
      console.log('grabando imagen');
      return this.propiedadescollection.doc(propiedad.id).update(propiedad);
    }
  }


  public preAddAndUpdatePropiedad(propiedad: PropiedadI, image: FileI): void {
    this.uploadimage(propiedad, image);
  }





  public pasaDatos(propiedad: PropiedadI){


    //propiedad.titlePropiedad = formulario.value.titulo;

    //data.titlePropiedad = formulario.value.titulo;

   // console.log('los datos formulario ', formulario.value.titulo);

    console.log('valor', JSON.stringify(propiedad.titlePropiedad));

   // console.log('los datos propiedad ', propiedad.titulo);
    console.log('los datos propiedad ', propiedad.description);
    console.log('los datos propiedad ', propiedad.valorPrecioPeso);

  }


    public otro(formulario: FormGroup){

      console.log('titulo es: ', formulario.value.titulo);


      const propiedadObj = {
        codigoPostal: formulario.value.codigoPostal,
        region: formulario.value.region,
        comunaSelected: formulario.value.comunaSelected,
        direccion: formulario.value.direccion,
        modalidad: formulario.value.modalidad,
        tipoPropiedad: formulario.value.tipoPropiedad,
        titlePropiedad: formulario.value.titulo,

         /******  Formulario 2 ******/
      /*
        bath: formulario.value.bath,
        bedroom: formulario.value.bedroom,
        build_floor: formulario.value.build_floor,
        build_terrace: formulario.value.build_terrace,
        building: formulario.value.building,
        description: formulario.value.description,
        met_utiles: formulario.value.met_utiles,
        old_build: formulario.value.old_build,
        orientacion: formulario.value.orientacion,
        selectedAmbientes: formulario.value.selectedAmbientes,
        selectedInstalaciones: formulario.value.selectedInstalaciones,
        store: formulario.value.store,
        estaciona: formulario.value.estaciona,
      */
        /****  Formulario 3 ***/
      /*
        valorPrecioPeso:  formulario.value.valorPrecioPeso,
        valorPrecioUF:  formulario.value.valorPrecioUF,
      */
        /*** ***********    antiguo formulario   *************** */

       // titleFormulario: formulario.value.titulo, //formulario antiguo aparece esta variable
        //contentPropiedad: formulario.value.contentPropiedad,

        imagePropiedad: this.downloadURL,
        fileRef: this.filePath,
       // tagsPropiedad: formulario.tagsPropiedad    Areglar

      };

     // console.log('titulo  ', propiedadObj.titlePropiedad);
      //this.propiedadescollection.add(propiedadObj);

    }


public componeArreglo(arreglo1: any, arreglo2: any, arreglo3: any){


 // this.steps.push(...arreglo1, ...arreglo2, ...arreglo3);
 /* this.steps.push(arreglo2);
  this.steps.push(arreglo3);*/

  const propiedad = Object.assign({}, arreglo1, arreglo2, arreglo3);


  //console.log('objeto', this.steps);

 // console.log('formulario propiedad  ', propiedad);


  this.savePropiedad(propiedad);
}





  public savePropiedad(propiedad: PropiedadI) {
    const propiedadObj = {
      codigoPostal: propiedad.codigoPostal,
      comunaSelected: propiedad.comunaSelected,
      direccion: propiedad.direccion,
      modalidad: propiedad.modalidad,
      region: propiedad.region,
      tipoPropiedad: propiedad.tipoPropiedad,

      titlePropiedad: propiedad.titlePropiedad,
         /******  Formulario 2 ******/

      bath: propiedad.bath,
      bedroom: propiedad.bedroom,
      build_floor: propiedad.build_floor,
      build_terrace: propiedad.build_terrace,
      building: propiedad.building,
      description: propiedad.description,
      met_utiles: propiedad.met_utiles,
      old_build: propiedad.old_build,
      orientacion: propiedad.orientacion,
      selectedAmbientes: propiedad.selectedAmbientes,
      selectedInstalaciones: propiedad.selectedInstalaciones,
      store: propiedad.store,
      estaciona: propiedad.estaciona,

     /****  Formulario 3 ***/

      valorPrecioPeso:  propiedad.valorPrecioPeso,
      valorPrecioUF:  propiedad.valorPrecioUF,

/*** ***********    antiguo formulario   *************** */
/*titlePropiedad: propiedad.titlePropiedad,       */

      contentPropiedad: propiedad.contentPropiedad,

      imagePropiedad: this.downloadURL,
      fileRef: this.filePath,
      tagsPropiedad: propiedad.tagsPropiedad

    };

    console.log('codigo postal ', propiedadObj.codigoPostal );





   /* if (propiedad.id) {
      return this.propiedadescollection.doc(propiedad.id).update(propiedadObj);
    } else {
      return this.propiedadescollection.add(propiedadObj);
    }*/
  }





  uploadimage(propiedad: PropiedadI, image: FileI) {
    this.filePath = `iamges/${image.name}`;
    const fileRef = this.storage.ref(this.filePath);
    const task = this.storage.upload(this.filePath, image);
    task.snapshotChanges()
    .pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe( urlImage => {
          this.downloadURL = urlImage;
          this.savePropiedad(propiedad);
          // call posust
        });
      })
    ).subscribe();
  }









}
