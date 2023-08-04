import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const result = [];
    if(!value) return;
    if(arg[0] === '') return value;
    for(const item of value) {
      if (item[arg[1]].toLowerCase().indexOf(arg[0].toLowerCase()) > -1 ||
        item[arg[2]]?.toLowerCase().indexOf(arg[0].toLowerCase()) > -1){
        result.push(item);
      };
    };
    return result;
  }

}
