import { Component, OnInit } from '@angular/core';

import { FormControl , FormGroup , FormBuilder, Validators } from '@angular/forms';

import {HttpClient} from '@angular/common/http';

import routes from '../../../assets/routes/routes.json';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/app/users.service';

@Component({
  selector: 'app-authenticatevoter',
  templateUrl: './authenticatevoter.component.html',
  styleUrls: ['./authenticatevoter.component.scss']
})
export class AuthenticatevoterComponent implements OnInit {

  port = routes.host

  accessvoting = localStorage.getItem('accessvoting')

  voters = new FormGroup({
    votersId : new FormControl('',Validators.required),
    electionId : new FormControl(localStorage.getItem('electionsA'))
})

submitted = false

successMessage:any = ''
errorMessage:any = ''

get votersControl(){
  return this.voters.controls
}

submitVoters(){

  // console.log(this.voters.getRawValue())

  this.submitted = true

  if(this.voters.invalid) return

  this.http.post(`${this.port}voters/access`,this.voters.getRawValue()).subscribe(
    res=>{
      let result = JSON.parse(JSON.stringify(res))
      this.successMessage = result.msg

      setTimeout(()=>{
        this.successMessage = ""
      },2000)
    },
    err=>{
      this.errorMessage = err.error.msg
      setTimeout(()=>{
        this.errorMessage = ""
      },2000)
    }
  )

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
  a:any

  constructor( private http: HttpClient , private route: ActivatedRoute, private user : UsersService ) {
    let a = this.route.snapshot.paramMap.get('token')

    this.user.election(a).subscribe(
      res=>{
        console.log(res)
        let result = JSON.parse(JSON.stringify(res))
        this.a = result
      },
      err=>{
console.log(err)
      }
    )

   }

  ngOnInit(): void {
  }

}
