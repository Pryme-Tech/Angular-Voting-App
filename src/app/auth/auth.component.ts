import { Component, OnInit, AfterViewInit } from '@angular/core';
import {FormBuilder,FormControl,FormGroup, Validators} from '@angular/forms';
import { HttpClient,HttpHeaders } from '@angular/common/http';

import routes from '../../assets/routes/routes.json';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  port = routes.host

  submitted = false

  registerForms = this.fb.group({

    email : ['',[Validators.required,Validators.email]],
    username : ['',Validators.required],
    password : ['',Validators.required],
    confirmPassword : ['',Validators.required]

  })

  get registerV(){
    return this.registerForms.controls
  }

  registerFormsOnSubmit(){

    this.submitted = true

    if(this.registerForms.invalid) return

    console.log(this.registerForms.getRawValue())

  // HTTP transport of registration form inputs
this.http.post(`${this.port}users/register`,this.registerForms.getRawValue()).subscribe(
  res=>{
    console.log(res)

  },
  err=>{
    console.log(err)
    // this.errMsg = err.error

    // setTimeout(()=>{
    //   this.errMsg=''
    // },2000)

  })

  }

  constructor( private fb : FormBuilder, private http : HttpClient ){
  }

   ngOnInit(){

    let register = document.getElementById('register') as HTMLElement

    let login = document.getElementById('login') as HTMLElement

    location.pathname == '/register'  && register.classList.remove('hidden')

    location.pathname == '/login'  && login.classList.remove('hidden')

  }

  }