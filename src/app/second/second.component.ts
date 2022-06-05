import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-second',
  templateUrl: './second.component.html',
  styleUrls: ['./second.component.scss']
})
export class SecondComponent implements OnInit {

  constructor() { 

  }

  ngOnInit(): void {
  }

  ngAfterViewInit(){
    //document.querySelector('body').style.backgroundColor='red';
  }

}
