import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pesoPipe'
})

export class PesoPipe implements PipeTransform {

    public transform(value: any): any {
       //return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        return (value.toFixed(2)).replace(/\B(?=(\d{3})+(?!\d))/g, ".")
///d{1,3}(?=(d{3})+(?!d))/g separacion de  miles
    }
}
