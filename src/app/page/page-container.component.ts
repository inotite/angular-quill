import {Component, Input} from '@angular/core';
import { ISection, IContainer, IElement } from '../models/website.model';
import { ElementService } from '../services/element.service';

@Component({
    selector: "[pageContainer]",
    template:`
        <prop-container [activeElement]="activeElement" [container]="container" [section]="section"></prop-container>
        <div pageElement [activeElement]="activeElement" *ngFor="let element of container?.elements.sort(elementService.sortElement) | elementFilter: elementService.filterElement" [element]="element" [container]="container" class="evov-element" (click)="setActive($event)" [ngClass]= "['is-' + element?.desktopWidth + '-desktop','is-' + element?.tabletWidth + '-tablet','is-' + element?.mobileWidth + '-mobile']" [ngStyle]="getStyles(element.styles)"></div>

    `
})

export class PageContainerComponent{
    @Input() container: IContainer
    @Input() section:ISection
    @Input() isEdit: boolean
    @Input() activeElement:any
    constructor(private elementService:ElementService){
    }
    ngOnInit(){
    }
    setActive(event){
        this.elementService.setActive(event);
    }
    getStyles(styles:string):object{
        try{
            return JSON.parse(styles);
        }
        catch(e){
            return {};
        }
    }
}