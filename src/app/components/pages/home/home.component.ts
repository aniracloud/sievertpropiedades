import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PropiedadI } from '../../../shared/models/propiedad.interface';
import { PropiedadService } from '../../propiedades/propiedad.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public propiedades$: Observable<PropiedadI[]>;

  constructor(private propiedadSvc: PropiedadService){

  }
  ngOnInit() {
    this.propiedades$ = this.propiedadSvc.getAllPropiedades();
  }
}
