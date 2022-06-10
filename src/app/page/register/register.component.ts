import { Component, OnInit, AfterViewInit } from '@angular/core';

import {FormGroup, FormControl} from '@angular/forms';

import { HttpClient,HttpHeaders } from '@angular/common/http';

import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  port = 'https://castvote.herokuapp.com/' //'http://localhost:4000/'

  register=new FormGroup({
    name: new FormControl(''),
    indexNumber: new FormControl('')
  })

  json={
    first: "seen",
    sec: "saaw"
  }

  user:any

  private httpoptions={
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    })
  }

  status=false

  up(data:any){
    data.value=data.value.toUpperCase();
  }


  onSubmit(){

    var form=this.register.getRawValue();

    //this.form.indexNumber=this.form.

  //  form=form.toUpperCase()
    //console.log(this.register.getRawValue());

   

    this.http.post(`${this.port}checkvoter/register`,form).subscribe(
  res=>{
    var response=JSON.stringify(res);
    var values=JSON.parse(response);
    if(values.status){
      this.status=true

      var x:any=4;

    setInterval(()=>{
      x--;
      var v=document.getElementById("countdown") as HTMLElement; 
      v.innerText=x;
      if(x===0){
        window.location.reload();
      }
    },1000)

    }
    else{
      this.status=false
    }
    //console.log(values);
  },
  err=>{
    console.log(err)
  })

  }

  constructor( private http: HttpClient , private router: Router ) {

    var checkuser=localStorage.getItem("user")
  
     if(!checkuser){
      //this.router.navigate(['/vote'])
     }
     else{
      this.user=checkuser
      console.log(localStorage.getItem("user"))
     }
   }

   ngAfterViewInit(){
   /* var a=0
    setInterval(()=>{
      a++;
      console.log(a)

      if(a===2){
        localStorage.removeItem("user");
        window.location.reload()
      }
    },60000)

    if(this.status){

      var x:any=10;

    setInterval(()=>{
      x--;
      var v=document.getElementById("countdown") as HTMLElement; 
      v.innerText=x;
    },1000)
  }*/

   }

  ngOnInit(): void {
  }

}
