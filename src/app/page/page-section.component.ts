import {Component, Input, OnChanges} from '@angular/core';
import { ISection, IContainer, ITenantWebsitePage } from '../models/website.model';
import { ElementService } from '../services/element.service';
@Component({
    selector: "[pageSection]",
    template:`
            <prop-section [activeElement]="activeElement" [section]="section" [page]="page"></prop-section>
            <div  [ngClass]="[section.containerType]">
                <div class="columns is-multiline is-mobile" [ngStyle]="getStyles(section.styles)">
                    <div [activeElement]="activeElement" [ngStyle]="container.styles" data-type="container" pageContainer *ngFor="let container of section?.containers.sort(elementService.sortElement) | elementFilter: elementService.filterElement" [container]="container" [section]="section" class="column evov-element" [isEdit]="isEdit" (click)="setActive($event)" [ngClass]= "['is-' + container.desktopWidth + '-desktop','is-' + container.tabletWidth + '-tablet','is-' + container.mobileWidth + '-mobile']"></div>
                </div>
            </div>
            `
})

export class PageSectionComponent implements OnChanges{
    @Input() section: ISection
    @Input() page: ITenantWebsitePage
    @Input() isEdit: boolean
    @Input() viewport: string
    @Input() activeElement:any
    constructor(private elementService:ElementService){}
    ngOnInit(){
    }
    getStyles(styles:string):object{
        return JSON.parse(styles);
    }
    ngOnChanges(){
    }
    addContainer(){
        let newContainer:IContainer = { 
            id: null, 
            sectionId: this.section.id, 
            index: this.section.containers.length + 1, 
            isDelete: false, 
            desktopWidth: 12, 
            mobileWidth: 12, 
            tabletWidth: 12, 
            elements:[],styles:"" }
        this.section.containers.push(newContainer);
    }
    setActive(event){
        this.elementService.setActive(event);
    }
    
}

function sortByIndexAsc(c1:IContainer, c2:IContainer){
    if(c1.index > c2.index)
        return 1;
    else if(c1.index === c2.index)
        return 0;
    else
      return -1  ;
}