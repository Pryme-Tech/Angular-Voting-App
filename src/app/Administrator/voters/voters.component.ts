import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';

import {FormBuilder,FormControl,FormGroup} from '@angular/forms';

import routes from '../../../assets/routes/routes.json';

@Component({
  selector: 'app-voters',
  templateUrl: './voters.component.html',
  styleUrls: ['./voters.component.scss']
})
export class VotersComponent implements OnInit {

  port = routes.host

  votingName = localStorage.getItem('votingname')

  successMessage = ''
  votingId = ''

  voters = new FormGroup({
    "votersname" : new FormControl(''),
    "votingname" : new FormControl(this.votingName)
  })

  votersOnsubmit(){

    // console.log(this.voters.getRawValue())
    this.http.post(`${this.port}voters/register`,this.voters.getRawValue()).subscribe(
      res=>{
        console.log(res)
        let result = JSON.parse(JSON.stringify(res))

        this.successMessage = result.msg

        this.votingId = result.index_no

      },
      err=>{

      })
  }

  constructor(private http: HttpClient) {

    this.http.get(` ${this.port}voters/Dominion SRC Elections `).subscribe(
      res=>{
        console.log(res)
      },
      err=>{
        console.log(err)
      }
    )

   }

  ngOnInit(): void {
  }

}
