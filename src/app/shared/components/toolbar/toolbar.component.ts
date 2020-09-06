import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';




@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  public appName = 'ngBlog';

  constructor(public authSvc: AuthService) { }



  busquedaForm = new FormGroup({
    busca: new FormControl('', Validators.required)
  });




  ngOnInit() {
  }

  onLogout():void{
    this.authSvc.logout();
  }

  BuscarPropiedad(valor: string) { // terminar el proceso

  }

}
