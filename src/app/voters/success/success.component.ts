import { Component } from '@angular/core';

@Component({
  selector: 'success-root',
  templateUrl: 'success.component.html',
  styleUrls : ['success.component.scss']
})
export class SuccessComponent {

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
