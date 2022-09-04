import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import routes from '../../../assets/routes/routes.json';
import { UsersService } from 'src/app/users.service';

@Component({
  selector: 'app-votes',
  templateUrl: './votes.component.html',
  styleUrls: ['./votes.component.scss']
})
export class VotesComponent implements OnInit {

  port = routes.host

  isElectionLaunched = false

  categories:any = []

  votes:any = []

  electionName:any

  user_id = localStorage.getItem("user_id")

  votingname = localStorage.getItem("votingname")

  constructor(private http: HttpClient, private users: UsersService) {

     users.userDetails().subscribe(
      res=>{
        let result = JSON.parse(JSON.stringify(res))

        // this.voters.controls['userId'].setValue(result.id);

        this.http.get(`${this.port}votings/checkLink/${localStorage.getItem('electionsA')}`).subscribe(
          res=>{
            console.log(res)
            let results = JSON.parse(JSON.stringify(res))
            this.electionName = results.electionName
            this.isElectionLaunched = results.status
          },
          err=>{
            this.electionName = err.error.electionName
            this.isElectionLaunched = err.error.status
          }
          )        

      },
      err=>{
        location.replace('http://localhost:4200/login')
      })


 this.http.get(`${this.port}vote/${this.user_id}/${this.votingname}`).subscribe(
        res=>{

          console.log(res)

          let result = JSON.parse(JSON.stringify(res))

          result.forEach((data:any,index:any)=>{
            // console.log(data)
            this.votes.push(data)
          })

          console.log(this.votes)

        },
        err=>{
          console.log(err)
        }
        )

 this.http.get(`${this.port}categories/${this.user_id}/${this.votingname}`).subscribe(
        res=>{

          // console.log(res)

          let result = JSON.parse(JSON.stringify(res))

          result.forEach((data:any,index:any)=>{
            this.categories.push({
              "index" : index,
              "count" : data.count,
              "category" : data.categoryname
            })
          })

          // console.log(this.votes)

        },
        err=>{
          console.log(err)
        }
        )

  //console.log(this.categories)
  //console.log(this.votes)

}

  ngOnInit(): void {
  }

}
