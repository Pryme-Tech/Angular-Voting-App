import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  constructor() { 

  }

  ngOnInit(): void {
  }

  ngAfterViewInit(){
    let register = document.getElementById('register') as HTMLElement;

    let sigin = document.getElementById('signin') as HTMLElement;

    let changeToSignIn = document.getElementById('changeToSignIn') as HTMLElement;

    let changeToRegister = document.getElementById('changeToRegister') as HTMLElement;

    
     changeToSignIn.addEventListener('click',async()=>{
      if(register.classList.contains('hidden')){
        register.classList.add('animate__fadeInRight')
        register.classList.remove('hidden')
        sigin.classList.add('hidden')
        //sigin.classList.remove('flex,animate__animated,animate__swing')
      }
      else{
        //await register.classList.remove('flex,animate__animated,animate__swing');
        await register.classList.add('hidden');
        
        await sigin.classList.remove('hidden');
        //await sigin.classList.add('flex,animate__animated,animate__swing');

      }
     })

     changeToRegister.addEventListener('click',async()=>{
      if(register.classList.contains('hidden')){
        register.classList.add('animate__fadeInRight')
        register.classList.remove('hidden')
        sigin.classList.add('hidden')
        //sigin.classList.remove('flex,animate__animated,animate__swing')
      }
      else{
        //await register.classList.remove('flex,animate__animated,animate__swing');
        await register.classList.add('hidden');
        
        await sigin.classList.remove('hidden');
        //await sigin.classList.add('flex,animate__animated,animate__swing');

      }
     })
    //document.querySelector('body').style.backgroundColor='red';
  }

}
