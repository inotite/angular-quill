import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'elementFilter',
    pure: false
})
export class FilterElementPipe implements PipeTransform {
    transform(items: any[], callback: (item: any) => boolean): any {
        if (!items || !callback) {
            return items;
        }
        
        return items.filter(item => callback(item));
    }
}