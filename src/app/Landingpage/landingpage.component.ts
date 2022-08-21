import { Component } from '@angular/core';

@Component({
  templateUrl: 'landingpage.component.html',
  styleUrls: ['landingpage.component.scss']
})

export class landingpageComponent{

  constructor(){

 }

 ngAfterViewInit(){
  let a = document.querySelector('div#main') as HTMLElement

  let header = document.querySelector('header') as HTMLElement

    window.addEventListener('scroll',()=>{
      // alert(window.scrollY)
      if(window.scrollY > 99){
        header.classList.add('second')
      }

      else{
        // header.style.backgroundColor = 'transparent'
        header.classList.remove('second')
      }

    })

 }

}