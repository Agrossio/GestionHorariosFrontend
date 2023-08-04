import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-simple-input',
  templateUrl: './simple-input.component.html',
  styleUrls: ['./simple-input.component.css']
})
export class SimpleInputComponent {
  
  @Input() placeholder: string ="";
  @Input() inputType: string ="";
  @Input() formControlName: string="";


  
}
