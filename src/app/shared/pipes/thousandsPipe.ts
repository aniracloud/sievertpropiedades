import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'thousandsPipe'
})

export class ThousandsPipe implements PipeTransform {

    public transform(value: any) {
      if (value > 999  && value != null){
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
      }else{
        return '';
      }
    }
}
