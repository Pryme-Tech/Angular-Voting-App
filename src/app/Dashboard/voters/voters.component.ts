import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';

import {FormBuilder,FormControl,FormGroup} from '@angular/forms';

import routes from '../../../assets/routes/routes.json';
import { UsersService } from 'src/app/users.service';

@Component({
  selector: 'app-voters',
  templateUrl: './voters.component.html',
  styleUrls: ['./voters.component.scss']
})
export class VotersComponent implements OnInit {

  port = routes.host

  electionName:any

  votingName = localStorage.getItem('votingname')

  votersInfo:any = []

  successMessage = ''
  votingId = ''

  voters = new FormGroup({
    "name" : new FormControl(''),
    "userId" : new FormControl(''),
    "electionId" : new FormControl(localStorage.getItem('electionsA'))
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

    if(sort!=='all'){
      this.votersInfo=[]
    }

    if(sort===''){
      sort = 'all'
    }

    this.http.get(`${this.port}voters/${localStorage.getItem('electionsA')}/${sort}`).subscribe(
      res=>{

        let result = JSON.parse(JSON.stringify(res))

        result.forEach((voters:any,index:any)=>{

          this.votersInfo.push({
            index : index,
            votersId : voters.votersId,
            votersName : voters.name
          })

          // console.log(this.votersInfo)

        })

      },
      err=>{
        console.log(err)
      }
    )

  }

  constructor(private http: HttpClient, private users: UsersService) {

      users.userDetails().subscribe(
      res=>{
        let result = JSON.parse(JSON.stringify(res))

        this.voters.controls['userId'].setValue(result.id);

        this.http.get(`${this.port}votings/checkLink/${localStorage.getItem('electionsA')}`).subscribe(
          res=>{
            console.log(res)
            let results = JSON.parse(JSON.stringify(res))
            this.electionName = results.electionName
          },
          err=>{
            this.electionName = err.error.electionName
          }
          )        

      },
      err=>{
        location.replace('http://localhost:4200/login')
      })



    this.searchVoters('all')

   }

  ngOnInit(): void {
  }

}
