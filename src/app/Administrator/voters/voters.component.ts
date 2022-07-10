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

  votersInfo:any = []

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
        // console.log(res)
        let result = JSON.parse(JSON.stringify(res))

        this.successMessage = result.msg

        this.votingId = result.index_no

        this.votersInfo.push({
          index : this.votersInfo.length,
          votersId : result.index_no,
          votersName : result.votersname
        })

      },
      err=>{

      })
  }

  searchVoters(sort:any){
    this.http.get(` ${this.port}voters/${this.votingName}/${sort}`).subscribe(
      res=>{

        let result = JSON.parse(JSON.stringify(res))

        result.forEach((voters:any,index:any)=>{

          this.votersInfo.push({
            index : index,
            votersId : voters.index_no,
            votersName : voters.votersname
          })

          // console.log(this.votersInfo)

        })

      },
      err=>{
        console.log(err)
      }
    )

  }

  constructor(private http: HttpClient) {

    this.searchVoters('all')

   }

  ngOnInit(): void {
  }

}
