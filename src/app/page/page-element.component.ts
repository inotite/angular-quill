import {Component, Input} from '@angular/core';
import { IContainer, IElement } from '../models/website.model';
import { ElementService } from '../services/element.service';

@Component({
    selector: "[pageElement]",
    template:`
            <prop-element [activeElement]= "activeElement" [element]="element" [container]="container"></prop-element>
            <h1 data-type="h1" *ngIf="element.type==='h1'" [innerHtml]="element.content" (click)="setActive($event)"></h1>
            <h2 data-type="h2" *ngIf="element.type==='h2'" [innerHtml]="element.content" (click)="setActive($event)"></h2>
            <h3 data-type="h3" *ngIf="element.type==='h3'" [innerHtml]="element.content" (click)="setActive($event)"></h3>
            <h4 data-type="h4" *ngIf="element.type==='h4'" [innerHtml]="element.content" (click)="setActive($event)"></h4>
            <h5 data-type="h5" *ngIf="element.type==='h5'" [innerHtml]="element.content" (click)="setActive($event)"></h5>
            <h6 data-type="h6" *ngIf="element.type==='h6'" [innerHtml]="element.content" (click)="setActive($event)"></h6>
            <div data-type="text" *ngIf="element.type==='text'" [innerHtml]="element.content" (click)="setActive($event)"></div>
            <img class="image" data-type="image" *ngIf="element.type==='image'" [src]="element.content" (click)="setActive($event)" />
            <appointment-plugin data-type="appointment" *ngIf="element.type==='appointment'" (click)="setActive($event)"></appointment-plugin>
    `
})

export class PageElementComponent{
    @Input() element: IElement
    @Input() container: IContainer
    @Input() isEdit:boolean
    @Input() activeElement:any
    constructor(private elementService:ElementService){}
    ngOnInit(){

    }
    setActive(event){
        this.elementService.setActive(event);
    }
    
}