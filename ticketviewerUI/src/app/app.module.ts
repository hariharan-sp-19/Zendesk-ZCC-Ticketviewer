import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenubarModule } from 'primeng/menubar';
import { TabViewModule } from 'primeng/tabview';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { DividerModule } from 'primeng/divider';
import { CommonModule } from "@angular/common";
import { DatePipe } from '@angular/common';
import { TooltipModule } from 'primeng/tooltip';
import { ImageModule } from 'primeng/image';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MenubarModule,
    TabViewModule,
    InputTextModule,
    ButtonModule,
    PanelModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    TableModule,
    MultiSelectModule,
    DropdownModule,
    ConfirmDialogModule,
    ToastModule,
    DialogModule,
    ScrollPanelModule,
    DividerModule,
    CommonModule,
    TooltipModule,
    ImageModule
  ],
  providers: [
    ConfirmationService,
    MessageService,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
