import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.component';
import {HttpClientModule} from '@angular/common/http';
import { DialogconfirmComponent } from './common/dialog-confirm.component';
import {EditorService} from './services/editor.service';
import { PageComponent } from './page/page.component';
import { PageSectionComponent } from './page/page-section.component';
import { PageContainerComponent } from './page/page-container.component';
import { ElementService } from './services/element.service';

import { PageElementComponent } from './page/page-element.component';
import { PropContainerComponent } from './page/properties/prop-container.component';
import { PropPageComponent } from './page/properties/prop-page.component';
import { PropSectionComponent } from './page/properties/prop-section.component';
import { Globals } from './globals';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {QuillModule} from 'ngx-quill';
import { PropElementComponent } from './page/properties/prop-element.component';
import { DialogService } from './services/dialog.service';
import { FilterElementPipe } from './pipes/filter-element.pipe';
import { DialogMessageComponent } from './common/dialog-message.component';
import { AppointmentComponent } from './plugins/appointment.component';
import { FilterAvailabilityPipe } from './pipes/filter-availability.pipe';
import { MatIconModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MccColorPickerModule} from 'material-community-components';
import { DialogNewPageComponent } from './common/dialog-newpage.component';



@NgModule({
  declarations: [
    AppComponent, PageComponent, 
    PageSectionComponent, 
    PageContainerComponent, 
    PageElementComponent,
    PropContainerComponent, 
    PropPageComponent, 
    PropSectionComponent, 
    PropElementComponent,
    DialogconfirmComponent,
    DialogMessageComponent,
    DialogNewPageComponent,
    FilterElementPipe,
    FilterAvailabilityPipe,
    AppointmentComponent
  ],
  entryComponents:[DialogconfirmComponent, DialogMessageComponent, DialogNewPageComponent],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule, 
    MatIconModule,
    MaterialModule,
    HttpClientModule,
    QuillModule,FormsModule,ReactiveFormsModule,
    MccColorPickerModule.forRoot({
      empty_color: 'transparent',
      used_colors: ['#000000', '#FFF555']
    })
  ],
  providers: [EditorService, ElementService, Globals, DialogService],
  bootstrap: [AppComponent]
})
export class AppModule { }
