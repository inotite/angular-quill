import {Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar} from '@angular/material';
import { DialogData, ITenantWebsitePage, IApiReturnObject } from '../models/website.model';
import { EditorService } from '../services/editor.service';

@Component({
    selector: 'dialog-newpage',
    templateUrl: './dialog-newpage.component.html'
  })
  export class DialogNewPageComponent {
  
    constructor(public dialogRef:MatDialogRef<DialogNewPageComponent>,@Inject(MAT_DIALOG_DATA) public data: ITenantWebsitePage, public dialog:MatDialog, private editorService:EditorService, private snackBar:MatSnackBar) {}

    addPage(){
        this.editorService.addPage(this.data).subscribe((result: IApiReturnObject<ITenantWebsitePage>) => {
           if(result.status === "Failed"){
                this.snackBar.open(result.message, "Close", {duration: 3000});
           }
           else{
                this.dialogRef.close(JSON.parse(JSON.stringify(result)).object);
           }
          });
    }
    updatePage(){
          this.dialogRef.close(this.data);
    }
    
  }