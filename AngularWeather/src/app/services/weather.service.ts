import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Dashboard } from '../Models/DashboardModel';
import {Chart} from 'chart.js';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { empty } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  chart: [];
  scale: string="0";
  date: string="";
  date_max: string;
  date_min: string;
  public datatemp: any[] = [];
  public datetemp: any[] = [];

  constructor(private http: HttpClient) {     

  }
  public urlcity: string = "lat=27.4833&lon=-109.9333&days=15";
  baseUrl: string = "https://api.weatherbit.io/v2.0/forecast/daily?key=0c6c94f36921468e8d58e95901ef9d6b&";
  dailyForecast(){
    return this.http.get(this.baseUrl+""+ this.urlcity)
    .pipe(map(result => result));
  }


  getSummari(){
    return this.http.get('http://localhost:58571/api/Dashboard/GetSummaries');
  }


  updtcity(city: Dashboard){
    const data = new Dashboard();
    data.city = city.city;

    this.http.post('http://localhost:58571/api/Dashboard/city', data)
    .subscribe((resp: any) => {
      let url = resp.map(resp => resp.url);
      this.urlcity = url;
      document.getElementById("chartWeather").innerHTML = '<canvas id="canvas">{{ chart }}</canvas>';
      this.onLoadWeather();
    });
  }

  updtscale(scale: Dashboard){
    const data = new Dashboard();
    data.scale = scale.scale;

    this.http.post('http://localhost:58571/api/Dashboard/scale', data)
    .subscribe((resp: any) => {
      let scl = resp.map(resp => resp.scale);
      this.scale = scl;
      document.getElementById("chartWeather").innerHTML = '<canvas id="canvas">{{ chart }}</canvas>';
      this.onLoadWeather();
      
    });
  }

  updtdate(date: Dashboard){

    this.http.post('http://localhost:58571/api/Dashboard/date', date)
    .subscribe((resp: any) => {
      let dt = resp.map(resp => resp.date);
      var jsdate = new Date(dt);
      this.date =jsdate.toLocaleDateString('es', {year: 'numeric', month: 'short', day: 'numeric'});
      document.getElementById("chartWeather").innerHTML = '<canvas id="canvas">{{ chart }}</canvas>';
      this.onLoadWeather();
    });
  }

  updtdashboard(dashboard: Dashboard) {
    
    const data = new Dashboard();
    data.city = dashboard.city;
    data.date = dashboard.date;
    data.scale = dashboard.scale;

    this.http.post('http://localhost:58571/api/Dashboard/update', data)
    .subscribe(resp => {
      resp;
    });
  }

  

  public onLoadWeather(){
    this.dailyForecast()
    .subscribe( res => {
      let temp_max = res['data'].map(res => res.max_temp)
      let temp_min = res['data'].map(res => res.min_temp)
      let temp_date = res['data'].map(res => res.datetime)
      let tempData = res['data'].map(res => res.temp)

      let tempF = []
      if(this.scale == "1"){
        tempData.forEach(res => {
          tempF.push(parseInt(res) * 9.0 / 5.0 + 32);
        }) 
        
        tempData = [];

        tempF.forEach(res => {
          tempData.push(res)
        })
      }

      this.datatemp =  tempData;

      let maxF = []
      let minF = []
      if(this.scale == "1"){
        temp_max.forEach(res => {
          maxF.push(parseInt(res) * 9.0 / 5.0 + 32);
        })           
        temp_min.forEach(res => {
          minF.push(parseInt(res) * 9.0 / 5.0 + 32);
        })   
        
        temp_max = [];
        temp_min = [];

        maxF.forEach(res => {
          temp_max.push(res)
        })
        minF.forEach(res => {
          temp_min.push(res)
        })
      }

      
      
      let weatherDates = []
      temp_date.forEach(res => {
        let jsdate = new Date(res)
        weatherDates.push(jsdate.toLocaleDateString('es', {year: 'numeric', month: 'short', day: 'numeric'}))
      })

      this.datetemp=weatherDates;
      let i = 0;
      if(this.date != ""){
        weatherDates.forEach(res => {
          if(res == this.date){
            weatherDates=[];
            weatherDates.push(res);
            let val = temp_max[i];
            temp_max=[];
            temp_max.push(val);
            val = temp_min[i];
            temp_min=[];
            temp_min.push(val);
          }
          i++;
        });
      }


      this.chart = new Chart('canvas', {
        type: 'line',
        data: {
          labels: weatherDates,
          datasets:[
            {
              data: temp_max,
              borderColor: '#3cba9f',
              fill:false
            },
            {
              data: temp_min,
              borderColor: '#ffcc00',
              fill:false
            },
          ]
        },
        options: {
          legend: {
            display: false
          },
          scales: {
            xAxes: [{
              display: true
            }],
            yAxes: [{
              display: true
            }],
          }
        }
      });
    })
  }

 


}
