import {Component, EventEmitter, Output} from '@angular/core';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-datepiker',
  templateUrl: './datepiker.component.html',
  styleUrls: ['./datepiker.component.scss']
})

export class DatepikerComponent {

  @Output() newDateFromInput = new EventEmitter<NgbDateStruct>();
  @Output() newDateToInput = new EventEmitter<NgbDateStruct>();

  modelFrom: NgbDateStruct;
  modelTo: NgbDateStruct;

  constructor() { 
 
  }

  
  public inputDate(): void {
    this.newDateFromInput.emit(this.modelFrom)
    this.newDateToInput.emit(this.modelTo)
  }
    
  
}