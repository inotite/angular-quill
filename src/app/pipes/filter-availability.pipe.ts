import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'availabilityFilter',
    pure: false
})
export class FilterAvailabilityPipe implements PipeTransform {
    transform(items: Date[], callback: (item: any) => boolean): any {
        if (!items || !callback) {
            return items;
        }
        
        return items.filter(item => callback(item));
    }
}