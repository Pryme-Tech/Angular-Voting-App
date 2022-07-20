import { Component, OnInit, AfterViewInit } from '@angular/core';
import {FormBuilder,FormControl,FormGroup, Validators} from '@angular/forms';
import { HttpClient,HttpHeaders } from '@angular/common/http';

import routes from '../../../assets/routes/routes.json';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  port = routes.host

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

// registration form inputs
registerForms:any

// check if forms are submitted
submitted = false

// get registration form input controls i.e validators included
get registerFormsControls(){
  return this.registerForms.controls
}

//login form input fieds
loginForms = new FormGroup({
username: new FormControl('',Validators.required),
password: new FormControl('',Validators.required)
})

// get registration form input controls i.e validators included
get loginFormsControls(){
  return this.loginForms.controls
}

// login and register error and success messages
errMsg = ''
sucMsg :any = ''

// Acount verification data
verify:any = []

// http headers sent
private httpoptions={
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    })
  }

// Function to  send registration form inputs
registerFormsOnSubmit(){

  // set submitted to true
  this.submitted = true

  // return sending of registration form if form is invalid
  if(this.registerForms.invalid) return

  // N/A
let user_id = this.registerForms.getRawValue().username

// HTTP transport of registration form inputs
this.http.post(`${this.port}users/register`,this.registerForms.getRawValue()).subscribe(
  res=>{
    // console.log(res)

    let result = JSON.parse(JSON.stringify(res))

    this.verify.push({
      email : result.email,
      username : result.username,
      msg : result.msg,
      resend : "resend email"
    })

  },
  err=>{
    // console.log(err)
    this.errMsg = err.error

    setTimeout(()=>{
      this.errMsg=''
    },2000)

  })
}

// Function to  send login form inputs
loginFormsOnSubmit(){
  
  // set submitted to true
  this.submitted = true

  // return sending of login form if form is invalid
  if(this.loginForms.invalid) return

  // HTTP transport of registration form inputs
this.http.post(`${this.port}users/login`,this.loginForms.getRawValue()).subscribe(
  res=>{

    // console.log(res)

    const auth = JSON.parse(JSON.stringify(res))

    !auth.Verified && this.verify.push({
        email : auth.email,
        username : auth.username,
        msg : auth.msg,
        resend : "resend email"
      })

      this.sucMsg = auth.Verified && auth.status === true && "Login Successful" && setTimeout(()=>{
        this.sucMsg=''
        localStorage.setItem('user_id',auth.username)
        window.location.replace('/admin')
      },2000)
     
  },
  err=>{
    // console.log(err)
    this.errMsg = err.error.statusMsg || err.error

    setTimeout(()=>{
      this.errMsg=''
    },2000)
    
  })
}

resend(email:any,username:any){

  this.verify[0].resend="........."

  // console.log(username,' ',email)

  setTimeout(()=>{
  this.http.get(`${this.port}users/verify/resend/${email}/${username}`).subscribe(
    res=>{
      // console.log(res)
      let result = JSON.parse(JSON.stringify(res))
      this.verify[0].resend = result.msg
    }
  )

},2000)

}

verifiedAccount:any

verifiedAccountError = false

hosted = routes.front

  constructor(private http:HttpClient, private fb: FormBuilder, private route: ActivatedRoute, private router: Router) { 

    // alert(this.route.snapshot.paramMap.get('login'))

    let verify = document.getElementById('verify') as HTMLElement;

    if(location.href.startsWith(`${this.hosted}admin/auth/verifyuser`)){

    let token = this.route.snapshot.paramMap.get('token')

    this.http.get(`${this.port}users/verifyuser/${token}`).subscribe(
      res=>{
        // console.log(res)
        let result = JSON.parse(JSON.stringify(res))
        // this.verifiedAccount = result.msg
        this.verifiedAccount = [{
          user : result.user
        }]
      },
      err=>{
        console.log(err)
  
        this.verifiedAccountError = true

      }
    )

    }

    this.registerForms = this.fb.group({
      email : ['',[Validators.required,Validators.email]],
      username : ['',Validators.required],
      password : ['',Validators.required],
      confirmpassword : ['',Validators.required]
    },
    {
      validators: [this.mustmatch('password','confirmpassword')]
      }
    )

    if(localStorage.getItem("user_id")){
      location.replace('/admin/votings')
    }
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(){
    let register = document.getElementById('register') as HTMLElement;

    let signin = document.getElementById('signin') as HTMLElement;

    let changeToSignIn = document.getElementById('changeToSignIn') as HTMLElement;

    let changeToRegister = document.getElementById('changeToRegister') as HTMLElement;

    if(location.href===`${this.hosted}admin/auth/login`){
      register.classList.add('hidden')
      register.classList.remove('flex')
      signin.classList.remove('hidden')
      signin.classList.add('flex')
    }

    if(location.href===`${this.hosted}admin/auth/register`){
      register.classList.remove('hidden')
      register.classList.add('flex')
      signin.classList.add('hidden')
      signin.classList.remove('flex')
    }

    if(location.href===`${this.hosted}admin/auth`){
      this.router.navigate(['/admin/auth/login'])
    }
    
     changeToSignIn.addEventListener('click',async()=>{
     this.router.navigate(['/admin/auth/login'])
     })

     changeToRegister.addEventListener('click',async()=>{
      this.router.navigate(['/admin/auth/register'])
     })
  //   //document.querySelector('body').style.backgroundColor='red';
  }

}
