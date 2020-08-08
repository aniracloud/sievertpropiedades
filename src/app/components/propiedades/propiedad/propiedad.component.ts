import { Component, OnInit, Input } from '@angular/core';
import { PropiedadService } from '../../propiedades/propiedad.service';
import { PropiedadI } from '../../../shared/models/propiedad.interface';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-propiedad',
  templateUrl: './propiedad.component.html',
  styleUrls: ['./propiedad.component.scss']
})
export class PropiedadComponent implements OnInit {


  //public propiedades$: Observable<PropiedadI[]>;
  @Input() propiedad: PropiedadI;

  constructor( private propiedadSvc: PropiedadService) {  }

  ngOnInit() {
    //this.propiedades$ = this.propiedadSvc.getAllPropiedades();
  }
}
