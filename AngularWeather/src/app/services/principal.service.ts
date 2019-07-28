import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import {Chart} from 'chart.js';
import { Dashboard } from 'src/app/Models/DashboardModel';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PrincipalService {

private urlEndPoint: string = "http://localhost:58571/api/Dashboard/";

chart: [];
date:string="";
datosCompletos: any[];

constructor(private http: HttpClient) { }


getSummari(): Observable<any[]>{
  return this.http.get('http://localhost:58571/api/Dashboard/GetSummaries').pipe(
    tap((response: any) => {
      (response as Dashboard[]).forEach(ciudad => {
        //console.log(ciudad.city);
      });
    })
  );
}



dailyForecast(city: string, scale: string){
  return this.http.get(this.urlEndPoint+"City/"+ city +"&"+ scale);
}

public onLoadWeather(city: string, scale: string){
  this.dailyForecast(city, scale)
  .subscribe( res => {
    let response=res['data'];
    this.datosCompletos = response;
    let temp_max = res['data'].map(res => res.max_temp)
    let temp_min = res['data'].map(res => res.min_temp)
    let temp_date = res['data'].map(res => res.datetime)
    let tempData = res['data'].map(res => res.temp)  
    
    let weatherDates = []
    temp_date.forEach(res => {
      let jsdate = new Date(res)
      weatherDates.push(jsdate.toLocaleDateString('es', {year: 'numeric', month: 'short', day: 'numeric'}))
    })

    tempData=weatherDates;
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
