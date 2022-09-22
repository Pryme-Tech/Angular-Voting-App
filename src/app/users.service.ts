import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import routes from './../assets/routes/routes.json';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  token = localStorage.getItem('token')

  port = routes.host

  a:any

  userDetails(){
    return this.http.get(`${this.port}users/verifyUserToken/${this.token}`)
  }

  election(data:any){
    return this.http.get(`${this.port}elections/verifyElectionToken/${data}`)
  }

  constructor( private http: HttpClient ) { }
}
