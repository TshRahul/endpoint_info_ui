import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EndpointInfoComponent } from './endpoint-info/endpoint-info.component';
import {MaterialModule} from './material_module'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AddEndpointComponent } from './components/add-endpoint/add-endpoint.component';
import { ReactiveFormsModule  } from '@angular/forms';
import { UseEndpointDialogComponent } from './components/use-endpoint-dialog/use-endpoint-dialog.component';
import { ReleaseEndpointDialogComponent } from './components/release-endpoint-dialog/release-endpoint-dialog.component';
import { EndpointDataComponent } from './components/endpoint-data/endpoint-data.component';
import { MarkEndpointBadComponent } from './components/mark-endpoint-bad/mark-endpoint-bad.component';
import { FormsModule } from '@angular/forms';
import { MarkEndpointGoodComponent } from './components/mark-endpoint-good/mark-endpoint-good.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CookieService } from 'ngx-cookie-service';
import { AuthInterceptor } from './classes/AuthInterceptor';
import { StorageServiceModule } from 'ngx-webstorage-service';
import { LocalStorageService } from './services/local-storage.service';
import { SnakeBarComponent } from './components/snake-bar/snake-bar.component';
import { HashLocationStrategy, LocationStrategy  } from '@angular/common';
import { DeleteEndpointComponent } from './components/delete-endpoint/delete-endpoint.component';


@NgModule({
  declarations: [
    AppComponent,
    EndpointInfoComponent,
    AddEndpointComponent,
    UseEndpointDialogComponent,
    ReleaseEndpointDialogComponent,
    EndpointDataComponent,
    MarkEndpointBadComponent,
    MarkEndpointGoodComponent,
    RegisterComponent,
    LoginComponent,
    SnakeBarComponent,
    DeleteEndpointComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    StorageServiceModule
  ],
  providers: [{
    provide : HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi   : true
  }, {provide : LocationStrategy , useClass: HashLocationStrategy}],
  bootstrap: [AppComponent],
  entryComponents: [AddEndpointComponent, UseEndpointDialogComponent, ReleaseEndpointDialogComponent, 
    MarkEndpointBadComponent, MarkEndpointGoodComponent, CookieService, LocalStorageService],
})
export class AppModule { }
