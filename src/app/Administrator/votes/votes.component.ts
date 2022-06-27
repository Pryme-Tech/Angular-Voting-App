import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-votes',
  templateUrl: './votes.component.html',
  styleUrls: ['./votes.component.scss']
})
export class VotesComponent implements OnInit {

  port = 'http://localhost:4000/'//http://localhost:4000'

  categories:any = []

  votes:any = []

  user_id = localStorage.getItem("user_id")

  votingname = localStorage.getItem("votingname")

  constructor(private http: HttpClient) {

    if(!(this.user_id && this.votingname)){
      window.location.replace('/admin/auth')
    }

 this.http.get(`${this.port}vote/${this.user_id}/${this.votingname}`).subscribe(
        res=>{

          let result = JSON.parse(JSON.stringify(res))

          result.forEach((data:any,index:any)=>{
            console.log(data)
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

          console.log(res)

          let result = JSON.parse(JSON.stringify(res))

          result.forEach((data:any,index:any)=>{
            this.categories.push({
              "count" : index,
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
