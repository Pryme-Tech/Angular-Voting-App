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

  ngAfterViewInit(){

    let menu = document.getElementById('menu') as HTMLElement

    let nav = document.getElementById('nav') as HTMLElement

    let toggleSidebarButton = document.getElementById('toggleSidebarButton') as HTMLElement

    let menuItem = document.querySelectorAll('.menu-item')

    menuItem.forEach((btn)=>{
      btn.addEventListener('click',()=>{
         menu.classList.toggle('hidden')
      })
    })

    toggleSidebarButton.addEventListener('click',()=>{

      menu.classList.toggle('hidden')

    })

  }

}

