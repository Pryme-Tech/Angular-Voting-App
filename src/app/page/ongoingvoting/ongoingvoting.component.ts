import { Component, OnInit,AfterViewInit } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';

import routes from '../../../assets/routes/routes.json';

@Component({
  selector: 'app-ongoingvoting',
  templateUrl: './ongoingvoting.component.html',
  styleUrls: ['./ongoingvoting.component.scss']
})
export class OngoingvotingComponent implements OnInit {

  port = routes.host

  // port(){
  //   let p =''

  //   this.http.get('/assets/routes/routes.json').subscribe(
  //     res=>{
  //       let result = JSON.parse(JSON.stringify(res))
  //       p='dfzs'
  //       //return "result.host";
  //       //this.port = "https://castvote.herokuapp.com/"
  //       //console.log(result.host)
  //     })

  // }

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
      console.log(res)
        let response = JSON.parse(JSON.stringify(res))

        response.forEach((data:any)=>{
          this.ongoingVoting.push({
            "voting":data.votingname,
            "user_id":data.username,
            "img" : this.port+"img/simple.jpg"
          })
        })

      },
      err=>{
        console.log(err)

        if(err.statusText === "Unknown Error"){
          this.errMsg = "No Connection"
        }
        else{
        this.errMsg = err.error
      }

        

      })
  }

  ngAfterViewInit(){

  //   let events = document.querySelectorAll('.events')

  // setTimeout(()=>{
  //   events.forEach((event:any)=>{
  //     event.style.display='none'
  //   })
  // },3000)
   

  }

  ngOnInit(): void {
  }

}
