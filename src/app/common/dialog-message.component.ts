import {Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { DialogData } from '../models/website.model';

@Component({
    selector: 'dialog-message',
    templateUrl: './dialog-message.component.html'
  })
  export class DialogMessageComponent {
  
    constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData, public dialog:MatDialog) {}
  }