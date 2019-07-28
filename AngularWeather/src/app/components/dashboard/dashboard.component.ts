import { Component, OnInit} from '@angular/core';
import { WeatherService } from 'src/app/services/weather.service';
import { Dashboard } from 'src/app/Models/DashboardModel';
import {FormControl, FormGroup, FormBuilder, FormArray} from '@angular/forms';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  

  formDashboard: FormGroup;
  public summaries: any[] = [];
  public datatemp2: any[] = [];
  public datetemp2: any[] = [];
  public date: any[] = [];
  constructor(private weatherService: WeatherService, private fb: FormBuilder){

    
    this.weatherService.getSummari()
    .subscribe((resp: any) => {
      this.summaries = resp;
    });
    this.dateOk();
  }

  dateOk(){
    this.weatherService.dailyForecast()
    .subscribe( res => {
    let temp_date = res['data'].map(res => res.datetime);
    this.date = temp_date;
    });
  }

  DataTable(){
    this.weatherService.dailyForecast()
    .subscribe( res => {
      let temp_date = res['data'].map(res => res.datetime);
      let tempData = res['data'].map(res => res.temp);

      let weatherDates = []
      temp_date.forEach(res => {
        let jsdate = new Date(res)
        weatherDates.push(jsdate.toLocaleDateString('es', {year: 'numeric', month: 'short', day: 'numeric'}))
      })

      let i = 0;
      if(this.weatherService.date != ""){
        weatherDates.forEach(res => {
          if(res == this.weatherService.date){
            weatherDates=[];
            weatherDates.push(res);
            let val = tempData[i];
            tempData=[];
            tempData.push(val);
          }
          i++;
        });
      }

      let tempF = []
      if(this.weatherService.scale == "1"){
        tempData.forEach(res => {
          tempF.push(parseInt(res) * 9.0 / 5.0 + 32);
        }) 
        
        tempData = [];

        tempF.forEach(res => {
          tempData.push(res)
        })
      }

      

      this.datatemp2 = tempData;
      this.datetemp2 = weatherDates;
    });

  }

  
    ngOnInit(){
    this.formDashboard = this.fb.group({
      city: [''],
      date: [''],
      scale: [''],
      url: ['']
    });
    
  }
  

  onCity(formValue: any) {

    const dashboard = new Dashboard();
    dashboard.city  = formValue.city;
    
    this.weatherService.updtcity(dashboard);  
  }

  onScale(formValue: any) {

    const dashboard = new Dashboard();
    dashboard.city  = formValue.city;
    dashboard.scale = formValue.scale;
    
    this.weatherService.updtscale(dashboard);  
  }

  onDate(formValue: any) {
    const dashboard = new Dashboard();
    dashboard.date  = new Date(formValue.date.year, formValue.date.month-1, formValue.date.day);
    
    this.weatherService.updtdate(dashboard);   
  }

}
