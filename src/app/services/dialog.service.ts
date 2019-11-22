import {Injectable, EventEmitter} from '@angular/core';
import { MatDialog} from '@angular/material';
import { DialogconfirmComponent } from '../common/dialog-confirm.component';
import { DialogMessageComponent } from '../common/dialog-message.component';
import { DialogNewPageComponent } from '../common/dialog-newpage.component';
import { ITenantWebsitePage } from '../models/website.model';

@Injectable()
export class DialogService{
    constructor(public dialog:MatDialog){}
    openDialog(title:string, message:string, type:string) {
        const dialogRef = this.dialog.open(DialogconfirmComponent, {
            width: '250px',
            data: {title: title, message:message, type: type, confirm: false}
        });
        
        return dialogRef;
    };
    
    message(title:string, message:string, type:string){
        this.dialog.open(DialogMessageComponent, {
            data: {
              title: title,
              message:message,
              type: type
            }
          });
    }

    openNewPageDialog(page:ITenantWebsitePage){

        const dialogRef = this.dialog.open(DialogNewPageComponent, {
            width: '400px',
            data: page});
        return dialogRef;
    }
}