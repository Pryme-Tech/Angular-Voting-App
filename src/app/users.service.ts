import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  token = localStorage.getItem('token')

  userDetails(){
    this.http.get(`http://localhost:4000/users/verifyUserToken/${this.token}`).subscribe(
      res=>{
        console.log(res)
      },
      err=>{

      }
      )
  }

  constructor( private http: HttpClient ) { }
}
