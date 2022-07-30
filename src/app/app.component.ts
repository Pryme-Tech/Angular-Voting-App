import { Component, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { FormBuilder,Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

 constructor(){


 }

 ngAfterViewInit(){


let h = document.getElementById('preloader') as HTMLElement

setTimeout(()=>{
  h.classList.add("hidden")
},2000)

 }
  
}
