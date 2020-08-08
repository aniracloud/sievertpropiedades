import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { PropiedadService } from '../propiedad.service';
import { Observable } from 'rxjs';
import { PropiedadI } from 'src/app/shared/models/propiedad.interface';


@Component({
  selector: 'app-details-propiedad',
  templateUrl: './details-propiedad.component.html',
  styleUrls: ['./details-propiedad.component.scss']
})
export class DetailsPropiedadComponent implements OnInit {

  public propiedad$: Observable<PropiedadI>;

  constructor( private route: ActivatedRoute, private propiedadSvc: PropiedadService ) { }

  ngOnInit() {
    const idPropiedad = this.route.snapshot.params.id;
    this.propiedad$ = this.propiedadSvc.getOnePropiedad(idPropiedad);
  }

}
