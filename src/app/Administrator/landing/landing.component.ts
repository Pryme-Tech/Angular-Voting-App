import { Component, OnInit, AfterViewInit } from '@angular/core';
import {FormBuilder,FormControl,FormGroup} from '@angular/forms';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

registerForms = new FormGroup({
username: new FormControl(''),
password: new FormControl('')
})

loginForms = new FormGroup({
username: new FormControl(''),
password: new FormControl('')
})

errMsg = ''
sucMsg :any = ''

private httpoptions={
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    })
  }

registerFormsOnSubmit(){
let user_id = this.registerForms.getRawValue().username

this.http.post('http://localhost:4000/users/register',this.registerForms.getRawValue()).subscribe(
  res=>{
    console.log(res)
    //register.classList.add('hidden');
    this.sucMsg = res
    localStorage.setItem("user_id",user_id)
    setTimeout(()=>{
      this.sucMsg=''
      location.reload()
    },2000)
  },
  err=>{
    console.log(err)
    this.errMsg = err.error
    setTimeout(()=>{
      this.errMsg=''
    },2000)
  })
}

loginFormsOnSubmit(){
console.log(this.loginForms.getRawValue());

this.http.post('http://localhost:4000/users/login',this.loginForms.getRawValue()).subscribe(
  res=>{
    console.log(res)
    let auth = JSON.parse(JSON.stringify(res))
    // console.log(auth.auth)

     if(auth.status === 1 ){
      localStorage.setItem('user_id',auth.user)
       window.location.replace('/admin')
     }
     
  },
  err=>{
    console.log(err.error)
    this.errMsg = err.error
    setTimeout(()=>{
      this.errMsg=''
    },2000)
  })
}

  constructor(private http:HttpClient) { 
    if(localStorage.getItem("user_id")){
      location.replace('/admin/votings')
    }
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
