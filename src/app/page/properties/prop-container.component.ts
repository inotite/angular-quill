import {Component, Input, ViewEncapsulation} from '@angular/core';
import { ISection, IContainer, IElement } from '../../models/website.model';
import { ElementService } from '../../services/element.service';
import { Globals } from 'src/app/globals';
import { DialogService } from 'src/app/services/dialog.service';
@Component({
    selector: "prop-container",
    templateUrl:"./prop-container.component.html",
    styleUrls: ['./prop-container.component.css'],
    encapsulation: ViewEncapsulation.None
})

export class PropContainerComponent{
    @Input() container: IContainer
    @Input() section: ISection
    @Input() activeElement:any
    viewport:number
    constructor(private elementService:ElementService, private globals: Globals, private dialogService:DialogService){

    }
    ngOnInit(){
        this.viewport = this.globals.viewport;
    }
    addElement(type:string){
        let container = this.elementService.newElement(type, this.container);
        this.container = container;     
    }
    confirmRemove():void{
        let dialogref = this.dialogService.openDialog("Confirm Delete", "Are you sure you want to remove this container?", "warning");
        dialogref.afterClosed().subscribe(result => {
            if(result){
                this.removeContainer();
            }
        })
    }
    removeContainer():void{
        this.container.isDelete = true;
    }
    moveUp():void{

        let result = this.elementService.moveUp<IContainer>(this.section.containers, this.container, this.activeElement);
        this.section.containers = result;
    }
    moveDown():void{
        let result = this.elementService.moveDown<IContainer>(this.section.containers, this.container, this.activeElement);
        this.section.containers = result;
    }
    closePanel(event:any):void{
        this.elementService.setUnactive(event);
    }
}