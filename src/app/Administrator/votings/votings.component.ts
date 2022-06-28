import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { FormControl , FormGroup , FormBuilder } from '@angular/forms';

import routes from '../../../assets/routes/routes.json';

@Component({
  selector: 'app-votings',
  templateUrl: './votings.component.html',
  styleUrls: ['./votings.component.scss']
})
export class VotingsComponent implements OnInit {

  port = routes.host

  // port = "http://localhost:4000/"

  welcome = ''

  noVotingAdded:any = ''
  votings:any = []

  user_id = localStorage.getItem("user_id")

  newVoting = new FormGroup({
    newVotingInput : new FormControl(''),
    user : new FormControl(this.user_id)
  })

  newVotingOnSubmit(){
    console.log(this.newVoting.getRawValue())

    this.http.post(`${this.port}votings/add`,this.newVoting.getRawValue()).subscribe(
      res=>{
        console.log(res)
      },
      err=>{
        console.log(err)
      })
  }

  redirectToCandidates(votingname:any){

    localStorage.setItem("votingname",votingname)

    window.location.replace('/admin/candidates')

    //alert(votingname)
    
  }

  constructor(private http:HttpClient) {

    if(!this.user_id){
      window.location.replace('/admin/auth')
    }

    http.get(`${this.port}votings/${this.user_id}`).subscribe(
      res=>{
        let result = JSON.parse(JSON.stringify(res))

        if(result.length < 1 ){
          this.noVotingAdded="No Voting Created"

        }

        else{

        result.forEach((i:any)=>{
          this.votings.push(i)
        })

      }

      this.welcome = `Welcome ${this.user_id}`

      },
      err=>{
        console.log(err)
      })
   }

  ngOnInit(): void {
  }

}
