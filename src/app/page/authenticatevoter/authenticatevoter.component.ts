import { Component, OnInit } from '@angular/core';

import { FormControl , FormGroup , FormBuilder, Validators } from '@angular/forms';

import {HttpClient} from '@angular/common/http';

import routes from '../../../assets/routes/routes.json';

@Component({
  selector: 'app-authenticatevoter',
  templateUrl: './authenticatevoter.component.html',
  styleUrls: ['./authenticatevoter.component.scss']
})
export class AuthenticatevoterComponent implements OnInit {

  port = routes.host

  accessvoting = localStorage.getItem('accessvoting')

  voters = new FormGroup({
    index_no : new FormControl('',Validators.required),
    votingname : new FormControl(this.accessvoting)
})

submitted = false

successMessage:any = ''
errorMessage:any = ''

get votersControl(){
  return this.voters.controls
}

nextVote(){

// console.log(this.voters.getRawValue())

this.submitted = true

if(this.voters.invalid) return

this.http.post(`${this.port}voters/access`,this.voters.getRawValue()).subscribe(
  res=>{
    // console.log(res)
    let result = JSON.parse(JSON.stringify(res))
    this.successMessage = result.msg
    localStorage.setItem("voterId",result.voterId)
    localStorage.setItem("voter",result.voter)
    localStorage.setItem("accessuser",result.user)

    setTimeout(()=>{
      this.successMessage = ''
      location.assign('/votepage')
    },1500)

  },
  err=>{
    console.log(err.error)

    this.errorMessage = err.error

  }
)


  }

  constructor( private http: HttpClient ) { }

  ngOnInit(): void {
  }

}
