import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ufPipe'
})

export class UfPipe implements PipeTransform {

    public transform(value: any) {


       return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        //return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
///d{1,3}(?=(d{3})+(?!d))/g separacion de  miles
    }
}
