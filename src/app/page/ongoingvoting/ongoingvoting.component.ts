import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-ongoingvoting',
  templateUrl: './ongoingvoting.component.html',
  styleUrls: ['./ongoingvoting.component.scss']
})
export class OngoingvotingComponent implements OnInit {

  port = "http://localhost:4000/"

  ongoingVoting:any = []

  errMsg = ''

  accessVotings(voting:any,user_id:any){
    localStorage.setItem("accessvoting",voting)
    localStorage.setItem("accessuser",user_id)
    // alert(user_id)
    // alert(voting)
    window.location.replace('/votepage')
  }

  constructor(private http:HttpClient) { 
    this.http.get(`${this.port}votings`).subscribe(
      res=>{
        let response = JSON.parse(JSON.stringify(res))

        response.forEach((data:any)=>{
          this.ongoingVoting.push({
            "voting":data.votingname,
            "user_id":data.username
          })
        })

      },
      err=>{
        console.log(err.error)
        this.errMsg = err.error
      })
  }

  ngOnInit(): void {
  }

}
