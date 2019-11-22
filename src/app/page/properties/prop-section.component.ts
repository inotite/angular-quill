import {Component, Input, OnInit} from '@angular/core'
import { ISection, ITenantWebsitePage } from 'src/app/models/website.model';
import { ElementService } from 'src/app/services/element.service';
import { DialogService } from 'src/app/services/dialog.service';

@Component({
    selector: 'prop-section',
    templateUrl: './prop-section.component.html'
})

export class PropSectionComponent implements OnInit{
    @Input() activeElement:any
    @Input() section: ISection
    @Input() page: ITenantWebsitePage
    @Input() bgColor: string
    @Input() fgColor: string
    @Input() height:number
    @Input() vAlign:string
    @Input() hAlign:string
    constructor(private elementService:ElementService, private dialogService:DialogService){}
    ngOnInit(){
        let s = JSON.parse(this.section.styles);
        this.bgColor = s["background-color"];
        this.fgColor = s["color"];
        this.vAlign = s["align-content"];
        this.hAlign = s["justify-content"];
        try{
            this.height = parseInt(s["min-height"].replace("px",""));
        }
        catch(e){}
    }
    addContainer(){
        let section = this.elementService.newContainer(this.section);
        this.section = section;
    }

    closePanel(event:any): void{
        this.elementService.setUnactive(event);
    }

    confirmRemove(): void {
        var dialogRef = this.dialogService.openDialog("Confirm Delete", "Are you sure you want to remove this section?", "warning");
        dialogRef.afterClosed().subscribe(result => {
            if(result){
                this.removeSection();
            }
            
        });
    }
    updateStyle(event:any, property:string){
        this.section.styles = this.elementService.updateStyle(event,property,this.section.styles);
    }
    removeSection():void{
        this.section.isDelete = true;
    }
    moveUp(){
        let result = this.elementService.moveUp<ISection>(this.page.sections, this.section, this.activeElement);
        this.page.sections = result;
    }
    moveDown(){
        let result = this.elementService.moveDown<ISection>(this.page.sections, this.section, this.activeElement);
        this.page.sections = result;
    }
}