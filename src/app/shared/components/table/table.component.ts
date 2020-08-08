import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { MatTableDataSource} from '@angular/material/table';
import { PropiedadService } from '../../../components/propiedades/propiedad.service';
import { PropiedadI } from '../../models/propiedad.interface';

import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';




export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})

export class TableComponent implements OnInit, AfterViewInit {



  search: string;
  displayedColumns: string[] = ['titlePropiedad', 'tags', 'Accion'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(  private propiedadSvc: PropiedadService,
                public dialog: MatDialog) { }

  ngOnInit() {
    this.propiedadSvc.getAllPropiedades().subscribe(propiedades => (this.dataSource.data = propiedades));
  }



  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


   applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }



  onEditPropiedad(propiedad: PropiedadI) {
    //console.log('Edit ', propiedad);
    this.openDialog(propiedad);
  }


  onDeletedPropiedad(propiedad: PropiedadI) {
    Swal.fire({
      title: 'Estas Seguro?',
      text: 'Esto no puede ser revertido!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Si, borrar',
      cancelButtonText: 'No, cancel',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        //quiere borrar
        this.propiedadSvc.deletePropiedadById(propiedad).then(()=>{
          Swal.fire('Borrado!', 'tu propiedad fue eliminada.', 'success');
        }).catch((error) => {
          Swal.fire('Error!', 'no pudo ser borrada la propiedad.', 'error');
        });
      }
    });
  }


  onNewPropiedad(propiedad: PropiedadI) {
    this.openDialog();
  }


  openDialog(propiedad?: PropiedadI): void {
    const config = {
      data: {
        message: propiedad ? 'Edit Propiedad' : 'Nueva Propiedad',
        content: propiedad
      }
    };

    const dialogRef = this.dialog.open(ModalComponent, config);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result ${result}`);
    });
  }





}
