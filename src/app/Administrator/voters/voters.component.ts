import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';

import routes from '../../../assets/routes/routes.json';

@Component({
  selector: 'app-voters',
  templateUrl: './voters.component.html',
  styleUrls: ['./voters.component.scss']
})
export class VotersComponent implements OnInit {

  port = routes.host

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
