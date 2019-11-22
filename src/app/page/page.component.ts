import {Component, Input, OnInit} from '@angular/core';
import { ITenantWebsitePage, ISection } from '../models/website.model';
import {EditorService} from '../services/editor.service';
import { ElementService } from '../services/element.service';
@Component({
    selector: "page",
    template:`
            <div id="evovFullWrapper" class="evov-full-wraper">
                <div id="evovSitePage" class="evov-site-page content" >
                    <div data-type="section" pageSection class="evov-element section" [activeElement]="activeElement" (click)="setActive($event)" cdkDropListGroup *ngFor="let section of page?.sections.sort(elementService.sortElement) | elementFilter:elementService.filterElement" [section]="section" [page]="page" [isEdit]="isEdit" [ngStyle]="getStyles(section.styles)">
                    </div>
                </div>
            </div>
    `,
    styles: [`.evov-full-wraper{margin-top:14px;}`]
})

export class PageComponent implements OnInit{
    @Input() page: ITenantWebsitePage
    isEdit:boolean
    activeElement:any

    constructor(private editorService: EditorService, private elementService:ElementService){}
    ngOnInit(){     
        this.isEdit = true;
        this.activeElement = null;
    }
    getStyles(styles:string):object{
        return JSON.parse(styles);
    }
    setActive(event){
        this.activeElement = event;
        this.elementService.setActive(event);
    }
    
}