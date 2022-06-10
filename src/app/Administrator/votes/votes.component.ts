import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-votes',
  templateUrl: './votes.component.html',
  styleUrls: ['./votes.component.scss']
})
export class VotesComponent implements OnInit {

  port = 'http://localhost:4000'

  categories:any = []

  votes:any = []

  constructor(private http: HttpClient) {

  this.http.get(`${this.port}/categories`).subscribe(
    res=>{
      console.log(res)

      let category = JSON.parse(JSON.stringify(res))

      for(let i in category ){
        this.categories.push({
          "category" : category[i].category,
          "category_id" : category[i].category_id
        })
      }

    },
    err=>{
      console.log(err)
    })

  this.http.get(`${this.port}/getvotes`).subscribe(
    res=>{
      console.log(res)

      let getvotes = JSON.parse(JSON.stringify(res))

      let avatar=''

      for(let i in getvotes ){
        
        if(getvotes[i].photo === ""){
          avatar = `/images/candidates/default.png`
        }
        else{
          avatar = getvotes[i].photo
        }

        this.votes.push({
          "name" : getvotes[i].name,
          "category" : getvotes[i].category,
          "category_id" : getvotes[i].category_id,
          "photo" : avatar,
          "votes" : getvotes[i].count,
          "percentage" : (getvotes[i].count/6 * 100).toFixed(2)
        })
      }

    })

  //console.log(this.categories)
  //console.log(this.votes)

}

  ngOnInit(): void {
  }

}
