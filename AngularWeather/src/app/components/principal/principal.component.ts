import { Component, OnInit, Input } from '@angular/core';
import { Dashboard, Data } from '../../Models/DashboardModel';
import { PrincipalService } from '../../services/principal.service';
import {FormControl, FormGroup, FormBuilder, FormArray} from '@angular/forms';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  datos: Dashboard[];

  dashboard: Dashboard;

  formDashboard: FormGroup;

  data: Data[];
  

  constructor(private principalService: PrincipalService,
    private fb: FormBuilder) {
      
    this.principalService.getSummari().pipe(
      tap((response: any) => {
        (response as Dashboard[]).forEach( ciudad => {
        });
      })
    ).subscribe(
      response => {
        this.datos = response as Dashboard[];
      });
   }

   


  ngOnInit() {


      this.formDashboard = this.fb.group({
        city: ['4013704'],
        date: [''],
        scale: ['M'],
        url: ['']
      });
      
    this.dataTabla();
    
    this.principalService.onLoadWeather(this.formDashboard.value.city, this.formDashboard.value.scale);

  }

  dataTabla(){
    this.principalService.dailyForecast(this.formDashboard.value.city, this.formDashboard.value.scale)
    .subscribe( (response) => {
      let res=response['data'];
      this.data = res as Data[];
      });
  }


  filtrarCiudad(city: string): void{
    this.formDashboard.value.city=city;
    this.principalService.onLoadWeather(this.formDashboard.value.city, this.formDashboard.value.scale);
    this.dataTabla();
  }

  filtrarScale(scale: string): void{
    this.formDashboard.value.scale=scale;
    this.principalService.onLoadWeather(this.formDashboard.value.city, this.formDashboard.value.scale);
    this.dataTabla(); 
  }

  
}
