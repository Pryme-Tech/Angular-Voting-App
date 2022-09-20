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

  process = false

  successMessage:any
  errorMessage:any

  submitted = false

  mustmatch(password:string,confirmpassword:string){

    // registration password and confirm password matching function

    return(fg:FormGroup)=>{
      const control = fg.controls[password]
      const match = fg.controls[confirmpassword]

      if(match.errors && !match.errors['mustmatch']){
        return
      }

      if(control.value !== match.value) {
        match.setErrors({mustmatch:true})
      }

      else{
        match.setErrors(null)
      }
      
    }
  }

  registerForms = this.fb.group({

    email : ['',[Validators.required,Validators.email]],
    username : ['',Validators.required],
    password : ['',Validators.required],
    confirmPassword : ['',Validators.required]

  },
    {
      validators: [this.mustmatch('password','confirmPassword')]
      }
)

  get registerV(){
    return this.registerForms.controls
  }

  registerFormsOnSubmit(){

    this.submitted = true

    if(this.registerForms.invalid) return

      this.process = true

    console.log(this.registerForms.getRawValue())

  // HTTP transport of registration form inputs
this.http.post(`${this.port}users/register`,this.registerForms.getRawValue()).subscribe(
  res=>{
    // console.log(res)

    let result = JSON.parse(JSON.stringify(res))

    this.successMessage = result.msg

    this.process = false

    localStorage.setItem('token',result.token)

    setTimeout(()=>{
      this.successMessage=''
      this.route.navigate(['/elections'])
    },3000)

  },
  err=>{

    if(!err.error.msg){
      this.errorMessage = "Error sending request. Try again later!"
      this.process = false

       setTimeout(()=>{
      this.errorMessage=''
    },3000)
       
      return
    }


    this.errorMessage = err.error.msg

    this.process = false

    setTimeout(()=>{
      this.errorMessage=''
    },3000)

  })

  }

  loginForms = this.fb.group({
    email : ['',[Validators.required,Validators.email]],
    password : ['',Validators.required]
  })

  get loginV(){
    return this.loginForms.controls
  }

  loginFormsOnSubmit(){

    this.submitted = true

    if(this.loginForms.invalid) return

      this.process = true

     this.http.post(`${this.port}users/login`,this.loginForms.getRawValue()).subscribe(
  res=>{
    // console.log(res)

    let result = JSON.parse(JSON.stringify(res))

    localStorage.setItem('token',result.token)

    this.successMessage = result.msg

    this.process = false

    setTimeout(()=>{
      this.successMessage=''
      this.route.navigate(['/elections'])
    },2000)

  },
  err=>{

    if(!err.error.msg){
      this.errorMessage = "Error sending request. Try again later!"
      this.process = false

       setTimeout(()=>{
      this.errorMessage=''
    },3000)

      return
    }

    this.errorMessage = err.error.msg

    this.process = false

    setTimeout(()=>{
      this.errorMessage=''
    },3000)

  })

  }

  constructor( private fb : FormBuilder, private http : HttpClient, private route : Router ){
  }

   ngOnInit(){

    let register = document.getElementById('register') as HTMLElement

    let login = document.getElementById('login') as HTMLElement

    location.pathname == '/register'  && register.classList.remove('hidden')

    location.pathname == '/register'  && register.classList.add('d-flex')

    location.pathname == '/login'  &&  login.classList.remove('hidden')

    location.pathname == '/login'  && login.classList.add('d-flex')

  }

  }