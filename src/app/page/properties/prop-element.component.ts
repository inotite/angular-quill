import {Component, Input} from '@angular/core';
import { IElement, IContainer } from 'src/app/models/website.model';
import {QuillModule} from 'ngx-quill';
import { element, container } from '@angular/core/src/render3';
import { ElementService } from 'src/app/services/element.service';
import { Globals } from 'src/app/globals';
import { DialogService } from 'src/app/services/dialog.service';

@Component({
    selector: 'prop-element',
    templateUrl: './prop-element.component.html'
})
export class PropElementComponent{
    @Input() element: IElement
    @Input() container: IContainer
    @Input() activeElement:any
    viewport:number
    constructor(private elementService:ElementService, private globals: Globals, private dialogService:DialogService){}
    ngOnInit(){
        this.viewport = this.globals.viewport;
    }
    setHtmlContent(event:any){
        this.element.content= event.html;
    }
    removeElement(){
        let dialogRef = this.dialogService.openDialog("Removal Confirm", "Are you sure you want to remove this element?", "warning");
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.element.isDelete = true;
            }
        });
    }
    moveUp(){

        let result:IElement[] = this.container.elements.move(this.container.elements.indexOf(this.element), this.container.elements.indexOf(this.element) - 1);
        

        for(var i =0; i < result.length;i++){
            result[i].index = i;
        }
        this.elementService.setActive(this.activeElement);
        this.container.elements = result;
    }
    moveDown(){
        let result:IElement[] = this.container.elements.move(this.container.elements.indexOf(this.element), this.container.elements.indexOf(this.element) + 1);
        for(var i =0; i < result.length;i++){
            result[i].index = i;
        }
        this.elementService.setActive(this.activeElement);
        this.container.elements = result;
    }
    closePanel(event:any){
        this.elementService.setUnactive(event);
    }
}
