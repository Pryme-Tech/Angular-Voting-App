import { Component, OnInit, AfterViewInit, AfterContentChecked,  ElementRef, ViewChild } from '@angular/core' ;

import { FormControl , FormGroup , FormBuilder } from '@angular/forms';

//import * as $ from 'jquery';

import {HttpClient} from '@angular/common/http';

//declare var $: any;

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent{

  user_id = localStorage.getItem('user_id')

  constructor(){

    // if(this.user_id && (location.href)){
    //   console.log(location.href)
    //   //location.replace('/admin/votings')
    //   //break
    // }
    // alert(typeof(location.href))
  }

  d = ''

  ngAfterViewInit(){

    let aside = document.getElementById('aside') as HTMLElement

    if(location.href ==='http://localhost:4200/admin/auth' || location.href ==='http://localhost:4200/admin/votings'){
          
      setTimeout(()=>{
        this.d = 'h'
      },1000)
      aside.classList.add('hidden')
      //alert(aside.classList)
    }

    else{
      aside.classList.remove('hidden')
      this.d=''
    }

    // if(location.href ==='http://localhost:4200/admin/auth'){
    //   //alert('hello')
    //   //aside.classList.remove('main-sidebar','elevation-5','justify-content-center','d-flex','flex-column','position-fixed')
    //   //aside.style.display='none !important'
    //   this.d = 'h'
    //   aside.classList.add('hidden')
    //   // alert(aside.classList)
    // }

    // else{
    //   aside.classList.remove('hidden')
    //   this.d=''
    // }

  }

}

