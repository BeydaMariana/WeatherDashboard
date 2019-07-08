import { Component, OnInit } from '@angular/core';
import { WeatherService } from './services/weather.service';
import {Chart} from 'chart.js';
import { analyzeAndValidateNgModules } from '@angular/compiler';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor (private _weather: WeatherService){

  }
  ngOnInit(){
    this._weather.onLoadWeather();
  }

  
}
