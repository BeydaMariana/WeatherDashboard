import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http'

import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PrincipalComponent } from './components/principal/principal.component';
import { DatepickerComponent } from './components/datepicker/datepicker.component';
import {WeatherService} from './services/weather.service';
import { PrincipalService } from './services/principal.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbModal, NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    DatepickerComponent,
    PrincipalComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [PrincipalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
