import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class TrasformaService {
  constructor() {}

  transform(value: any): any {
    //return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return (value.replace(/\B(?=(\d{3})+(?!\d))/g, "."));


    ///d{1,3}(?=(d{3})+(?!d))/g separacion de  miles
  }
}
