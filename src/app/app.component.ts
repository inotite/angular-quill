import 'hammerjs';
import { Component, OnInit } from '@angular/core';
import { ITenantWebsite, ITenantWebsitePage, ISection } from './models/website.model';
import { EditorService } from './services/editor.service';
import { FormControl } from '@angular/forms';
import { ElementService } from './services/element.service';
import { Globals } from './globals';
import { DialogService } from './services/dialog.service';
import { MatIconRegistry, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  website: ITenantWebsite
  pages: ITenantWebsitePage[]
  currentPage: ITenantWebsitePage
  savedPage: ITenantWebsitePage
  mode = new FormControl('side');
  viewport: number
  
  constructor(private editorService: EditorService, 
    private elementService: ElementService, 
    private globals: Globals, 
    private dialogService: DialogService, 
    iconRegistry: MatIconRegistry,
    private snackBar:MatSnackBar
    ) { }
  
  ngOnInit() {
    this.editorService.getWebsite().subscribe((website: ITenantWebsite) => {
      this.website = website;
      this.pages = website.pages;
      this.currentPage = null;
      this.savedPage = null;
      this.viewport = this.globals.viewport
      this.globals.tenantId = website.tenantId

    });
  }
  setViewport(display: number) {
    this.elementService.setViewport(display);
    this.globals.viewport = display;
    console.log(display);
  }
  confirmChangePage(page: ITenantWebsitePage) {
    //We need to check if there was any changes to the page
    if (JSON.stringify(this.savedPage) === JSON.stringify(this.currentPage)) {
      this.setCurrentPage(page);
    }
    else {
      let dialogRef = this.dialogService.openDialog("Open Page", "Are you sure you want to open this page? Any unsave changes will be lost.", "warning");
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.setCurrentPage(page);
        }
      });
    }
  }
  confirmNewPageDialog(){
    if (JSON.stringify(this.savedPage) === JSON.stringify(this.currentPage)) {
      this.openNewPageDialog();
    }
    else {
      let dialogRef = this.dialogService.openDialog("New Page", "Are you sure you want to leave this page? Any unsave changes will be lost.", "warning");
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.openNewPageDialog();
        }
      });
    }
  }
  editPage(){
    const dialogRef = this.dialogService.openNewPageDialog(this.currentPage);
    dialogRef.afterClosed().subscribe(result=> {
      console.log(result);
      if(result !== undefined && result != null){
        for(var i = 0; i < this.website.pages.length; i++){
          if(this.website.pages[i].id == result.id){
            this.website.pages[i] = result;
          }
        }
        this.currentPage = result;
        this.savePage();
      }
    })
  }
  openNewPageDialog(){
    let newPage:ITenantWebsitePage = {
      id: 0,
      createDate: null,
      lastUpdated: null,
      name: "",
      title: "",
      seoKeywords: "",
      tenantWebsiteId: this.website.id,
      tenantId: this.website.tenantId,
      default: false,
      sections: [],
      isMenuItem: false
    };
    const dialogRef = this.dialogService.openNewPageDialog(newPage);
    dialogRef.afterClosed().subscribe(result=> {
      console.log(result);
      if(result !== undefined && result !== null){
        this.website.pages.push(result);
        this.snackBar.open("Page created successfully.", "Close", {duration:3000});
      }
    })
  }
  addSection() {
    let section:ISection = {
      id: 0,
      published: true,
      tenantWebsitePageId: this.currentPage.id,
      index: this.currentPage.sections.length + 1,
      containers: [],
      isDelete: false,
      styles: "{}",
      containerType: "container"
    }
    this.currentPage.sections.push(section)
  }
  setCurrentPage(page: ITenantWebsitePage) {
    this.editorService.getPage(page.id).subscribe((page: ITenantWebsitePage) => {
      this.savedPage = JSON.parse(JSON.stringify(page));
      this.currentPage = JSON.parse(JSON.stringify(page));
    });
  }
  savePage() {
    this.editorService.savePage(this.currentPage).subscribe((page: ITenantWebsitePage) => {
      this.savedPage = JSON.parse(JSON.stringify(page));
      this.snackBar.open("Page saved successfully.", "Close", {duration:3000});
    })
  }
}
