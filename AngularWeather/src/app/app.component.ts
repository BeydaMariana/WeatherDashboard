import { Component, OnInit } from '@angular/core';
import { WeatherService } from './services/weather.service';
import { PrincipalService } from './services/principal.service';
import { Dashboard } from 'src/app/Models/DashboardModel';
import {Chart} from 'chart.js';
import { analyzeAndValidateNgModules } from '@angular/compiler';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor (private _principal: PrincipalService,
    private _weather: WeatherService){

  }
  ngOnInit(){
  }

  
}
