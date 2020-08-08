import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})


export class UbicacionesService {

  public urlRegion = 'https://private-f81c18-regionesdechile.apiary-mock.com/regiones';

  public urlTipo = 'https://private-398bf2-propiedad.apiary-mock.com/propiedad';

  public urlEconomico = 'https://mindicador.cl/api';



  allowedChars = new Set('0123456789'.split('').map(c => c.charCodeAt(0)));



  constructor(  private regionesHttp: HttpClient,
                private tipoHttp: HttpClient,
                private economicoHttp: HttpClient) {}


  public getRegiones() {
    const url = `${this.urlRegion}`;
    return this.regionesHttp.get(url);
  }


  public getTipo() {
    const url2 = `${this.urlTipo}`;
    return this.tipoHttp.get(url2);
  }

  public getEconomico() {
    const url3 = `${this.urlEconomico}`;
    return this.economicoHttp.get(url3);
    }



  check(event: KeyboardEvent) {
    // 31 and below are control keys, don't block them.

    if (event.keyCode > 31 && !this.allowedChars.has(event.keyCode)) {

      event.preventDefault();
    }
  }


}




