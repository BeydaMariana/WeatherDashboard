import {Component, OnInit, Input} from '@angular/core';
import {NgbDate, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import {FormGroup} from '@angular/forms';



@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html'  
})
export class DatepickerComponent {


  @Input() parentForm: FormGroup;
  @Input() formControlname: string;
  @Input() formLabel: string;


 
  
}
