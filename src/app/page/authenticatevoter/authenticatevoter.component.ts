import { Component, OnInit } from '@angular/core';

import { FormControl , FormGroup , FormBuilder } from '@angular/forms';

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
    index_no : new FormControl(''),
    votingname : new FormControl(this.accessvoting)
})

successMessage:any = ''

nextVote(){

console.log(this.voters.getRawValue())

this.http.post(`${this.port}voters/access`,this.voters.getRawValue()).subscribe(
  res=>{
    console.log(res)
    let result = JSON.parse(JSON.stringify(res))
    this.successMessage = result.msg
    localStorage.setItem("voterId",result.voterId)
    localStorage.setItem("voter",result.voter)
    localStorage.setItem("accessuser",result.user)

    setTimeout(()=>{
      this.successMessage = ''
      location.replace('/votepage')
    },1500)

  },
  err=>{
    console.log(err)
  }
)


  }

  constructor( private http: HttpClient ) { }

  ngOnInit(): void {
  }

}
