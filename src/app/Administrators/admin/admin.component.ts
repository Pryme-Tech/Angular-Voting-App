import { Component, OnInit, AfterViewInit, AfterContentChecked,  ElementRef, ViewChild } from '@angular/core' ;

import { FormControl , FormGroup , FormBuilder } from '@angular/forms';

//import * as $ from 'jquery';

import {HttpClient} from '@angular/common/http';

import routes from '../../../assets/routes/routes.json';

//declare var $: any;

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent{

  user_id = localStorage.getItem('user_id')

  votingname = localStorage.getItem('votingname')

  constructor(){

    if(this.user_id){

    setTimeout(()=>{
      alert('Session terminated!!! Please login')
      localStorage.clear()
      location.reload()
    },2000000)

  }

    // if(this.user_id && (location.href)){
    //   console.log(location.href)
    //   //location.replace('/admin/votings')
    //   //break
    // }
    // alert(typeof(location.href))
  }

  d = ''
  c = ''

  hosted = routes.front

  ngAfterViewInit(){

    let menu = document.getElementById('menu') as HTMLElement

    let navLinks = document.querySelectorAll('#menu h3')

    let nav = document.getElementById('nav') as HTMLElement

    let toggleSidebarButton = document.getElementById('toggleSidebarButton') as HTMLElement

    let toggleSidebarCloseButton = document.getElementById('toggleSidebarCloseButton') as HTMLElement

    let menuItem = document.querySelectorAll('.menu-item')

    menuItem.forEach((btn)=>{
      btn.addEventListener('click',()=>{
         menu.classList.toggle('hidden')
      })
    })

    navLinks.forEach((b)=>{

      b.addEventListener('click',()=>{

        menu.classList.toggle('hidden')

      })

    })

    toggleSidebarButton.addEventListener('click',()=>{

      // if(toggleSidebarButton.classList.contains('fa-bars')){
      //   toggleSidebarButton.classList.remove('fa-bars')
      //   toggleSidebarButton.classList.add('fa-xmark')
      //   toggleSidebarButton.style.color='red'
      // }
      // else{
      //   toggleSidebarButton.classList.remove('fa-xmark')
      //   toggleSidebarButton.classList.add('fa-bars')
      //   toggleSidebarButton.style.color='black'
      // }

      menu.classList.toggle('hidden')

      // toggleSidebarButton.classList.toggle('fa-solid fa-xmark')

    })

    toggleSidebarCloseButton.addEventListener('click',()=>{

      menu.classList.toggle('hidden')

    })

    if(location.href===`${this.hosted}admin/votings` || location.href.startsWith(`${this.hosted}admin/auth`) || location.href===`https://castvote.netlify.app/admin/votings` || location.href===`https://castvote.netlify.app/admin/auth` ){
      nav.style.display='none'
    }

  }

}

