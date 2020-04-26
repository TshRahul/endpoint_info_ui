import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EndpointInfoComponent } from './endpoint-info/endpoint-info.component';
import {MaterialModule} from './material_module'
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AddEndpointComponent } from './components/add-endpoint/add-endpoint.component';
import { ReactiveFormsModule  } from '@angular/forms';
import { UseEndpointDialogComponent } from './components/use-endpoint-dialog/use-endpoint-dialog.component';
import { ReleaseEndpointDialogComponent } from './components/release-endpoint-dialog/release-endpoint-dialog.component';
import { EndpointDataComponent } from './components/endpoint-data/endpoint-data.component';
import { MarkEndpointBadComponent } from './components/mark-endpoint-bad/mark-endpoint-bad.component';
import { FormsModule } from '@angular/forms';
import { MarkEndpointGoodComponent } from './components/mark-endpoint-good/mark-endpoint-good.component';


@NgModule({
  declarations: [
    AppComponent,
    EndpointInfoComponent,
    AddEndpointComponent,
    UseEndpointDialogComponent,
    ReleaseEndpointDialogComponent,
    EndpointDataComponent,
    MarkEndpointBadComponent,
    MarkEndpointGoodComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [AddEndpointComponent, UseEndpointDialogComponent, ReleaseEndpointDialogComponent, 
    MarkEndpointBadComponent, MarkEndpointGoodComponent],
})
export class AppModule { }
