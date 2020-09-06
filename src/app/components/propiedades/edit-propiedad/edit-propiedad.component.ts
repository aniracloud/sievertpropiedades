import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PropiedadI } from '../../../shared/models/propiedad.interface';
import { PropiedadService } from '../propiedad.service';



@Component({
  selector: 'app-edit-propiedad',
  templateUrl: './edit-propiedad.component.html',
  styleUrls: ['./edit-propiedad.component.scss']
})
export class EditPropiedadComponent implements OnInit {

  private image: any;
  public imageOriginal: any;
  public imagePropiedad2 : string;

  @Input() propiedad: PropiedadI;

  constructor( private propiedadSvc: PropiedadService) { }

  public editPropiedadForm = new FormGroup({
    id: new FormControl('', Validators.required),
    titlePropiedad: new FormControl('', Validators.required),
    contentPropiedad: new FormControl('', Validators.required),
    tagsPropiedad: new FormControl('', Validators.required),
    imagePropiedad: new FormControl('', Validators.required),
  });



  ngOnInit() {

    this.image = this.propiedad.imagePropiedad;
    this.imageOriginal = this.propiedad.imagePropiedad;
    this.initValuesForm();
  }

  editPropiedad(propiedad: PropiedadI) {
    console.log('Img-1', this.image);
    console.log('Original-1', this.imageOriginal);

    if (this.image === this.imageOriginal){
      this.propiedad.imagePropiedad = this.imageOriginal;
      this.propiedadSvc.editPropiedadById(propiedad);
      // call method(propiedad)

    }else {
      // call method(propiedad, this.image)
      this.propiedadSvc.editPropiedadById(propiedad, this.image);//this.image
    }
   }



  handleimage(event: any): void {
    this.image = event.target.files[0];
  }



  private initValuesForm(): void {
    this.editPropiedadForm.patchValue({
      id: this.propiedad.id,
      titlePropiedad: this.propiedad.titlePropiedad,
      contentPropiedad: this.propiedad.contentPropiedad,
      tagsPropiedad: this.propiedad.tagsPropiedad,
      imagePropiedad2: this.imageOriginal
    });
  }

}
