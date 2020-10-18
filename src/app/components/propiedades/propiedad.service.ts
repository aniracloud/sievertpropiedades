import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, finalize } from 'rxjs/operators';
import { PropiedadI } from '@shared/models/propiedad.interface';
import { FileI } from '@shared/models/file.interface';
import { AngularFireStorage } from '@angular/fire/storage';


@Injectable({
  providedIn: 'root'
})
export class PropiedadService {

  private propiedadescollection: AngularFirestoreCollection<PropiedadI>;
  private filePath: any;
  private downloadURL: Observable<string>;

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




  private savePropiedad(propiedad: PropiedadI) {
    const propiedadObj = {

    codigoPostal: propiedad.codigoPostal,
    comunaSelected: propiedad.comunaSelected,
    direccion: propiedad.direccion,
    modalidad: propiedad.modalidad,
    region: propiedad.region,
    tipoPropiedad: propiedad.tipoPropiedad,
    titlePropiedad: propiedad.titulo,

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

/**************    antiguo formulario   *************** */
/*
      titlePropiedad: propiedad.titlePropiedad,
      */
      contentPropiedad: propiedad.contentPropiedad,

      imagePropiedad: this.downloadURL,
      fileRef: this.filePath,
      tagsPropiedad: propiedad.tagsPropiedad

    };

    if (propiedad.id) {
      return this.propiedadescollection.doc(propiedad.id).update(propiedadObj);
    } else {
      return this.propiedadescollection.add(propiedadObj);
    }
  }





  private uploadimage(propiedad: PropiedadI, image: FileI) {
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
