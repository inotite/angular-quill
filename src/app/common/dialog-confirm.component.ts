import {Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { DialogData } from '../models/website.model';

@Component({
    selector: 'dialog-confirm',
    templateUrl: './dialog-confirm.component.html'
  })
  export class DialogconfirmComponent {
  
    constructor(
      public dialogRef: MatDialogRef<DialogconfirmComponent>,
      @Inject(MAT_DIALOG_DATA) public data: DialogData, public dialog:MatDialog) {}
  }