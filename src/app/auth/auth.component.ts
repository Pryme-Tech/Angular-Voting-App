import { Component, OnInit, AfterViewInit } from '@angular/core';
import {FormBuilder,FormControl,FormGroup, Validators} from '@angular/forms';
import { HttpClient,HttpHeaders } from '@angular/common/http';

import { ActivatedRoute, Router } from '@angular/router';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  process = false
  // checks if form is being processed

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
    fullname : ['',Validators.required],
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
    // setting submitted to true when method is called

    if(this.registerForms.invalid) return
    // returns empty when registration forms fails validation

      this.process = true

  // HTTP transport of registration form inputs
  this.http.post(`${environment.apiKey}users/register`,this.registerForms.getRawValue()).subscribe(
  res=>{
    // console.log(res)

    let result = JSON.parse(JSON.stringify(res))

    this.successMessage = result.msg

    this.process = false

    localStorage.setItem('userT',result.token)

    setTimeout(()=>{
      this.successMessage=''
      // this.route.navigate(['/elections'])
    },3000)

  },
  err=>{

    if(!err.error.msg){
      this.errorMessage = "Error sending request. Try again later!"
      this.process = false
    }

    else{
      this.errorMessage = err.error.msg
    }

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

     this.http.post(`${environment.apiKey}users/login`,this.loginForms.getRawValue()).subscribe(
  res=>{

    let result = JSON.parse(JSON.stringify(res))

    localStorage.setItem('userT',result.token)

    this.successMessage = result.msg

    this.process = false

    setTimeout(()=>{
      this.successMessage=''
      this.route.navigate(['/elections'])
    },3000)

  },
  err=>{

    this.errorMessage = err.error.msg ? err.error.msg :  "Error sending request. Try again later!"

    this.process = false

    setTimeout(()=>{
      this.errorMessage=''
    },3000)

  })

  }

  constructor( private fb : FormBuilder, private http : HttpClient, private route : Router ){
  }

   ngOnInit(){

    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    window.addEventListener('resize', () => {
      vh = window.innerHeight * 0.01;
      // console.log(vh)
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    });
    // console.log(vh)

    // The above script is just to fix the viewheight because 100vh causes problems on mobile devices

    let register = document.getElementById('register') as HTMLElement

    let login = document.getElementById('login') as HTMLElement

    location.pathname == '/register'  && register.classList.remove('hidden')

    location.pathname == '/register'  && register.classList.add('d-flex')

    location.pathname == '/login'  &&  login.classList.remove('hidden')

    location.pathname == '/login'  && login.classList.add('d-flex')

  }

  }