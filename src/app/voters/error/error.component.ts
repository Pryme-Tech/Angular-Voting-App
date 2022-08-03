import { Component } from '@angular/core';

@Component({
  templateUrl: 'error.component.html'
})

export class ErrorComponent{

	accessvoting = localStorage.getItem('accessvoting')

  countdown = 5

  constructor(){

  setInterval(()=>{
    this.countdown--
    if(this.countdown===0){
      location.assign('/')
    }
  },1000)


 }

}