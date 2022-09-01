import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  token = localStorage.getItem('token')

  a:any

  userDetails(){
    return this.http.get(`http://localhost:4000/users/verifyUserToken/${this.token}`)
  }

  constructor( private http: HttpClient ) { }
}
