import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router';
import { rootRouterConfig } from './app.routes';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { HomeComponent } from './home/home.component';
import {PersonRestService} from "./services/person.rest.service";
import {HeaderComponent} from "./header/header.component";
import {ManagePersonComponent} from "./admin/person/manage-person.component";
import {CommonRestService} from "./services/common.rest.service";
import {OzAsyncValidators} from "./forms/OzAsyncValidators";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    ManagePersonComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(rootRouterConfig, { useHash: true })
  ],
  providers: [
    PersonRestService,
    CommonRestService,
    OzAsyncValidators
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {

}
