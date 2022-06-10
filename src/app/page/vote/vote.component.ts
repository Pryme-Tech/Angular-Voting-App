import { Component, OnInit } from '@angular/core';

import { FormControl,FormGroup,Validators } from '@angular/forms';

import {HttpClient} from '@angular/common/http';

import {Router} from '@angular/router';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.scss']
})
export class VoteComponent implements OnInit {

  port = 'https://castvote.herokuapp.com/' //'http://localhost:4000/'

  form=new FormGroup({
    indexNumber: new FormControl('')
    //lastName: new FormControl(''),
  });


  onSubmit(){
    var form=this.form.getRawValue().indexNumber;
    //console.log(form);

    form=form.replace(/\//g,"%2f")

    form=form.toUpperCase()

    this.http.get(`${this.port}checkvoter/validate/${form}`).subscribe(
  res=>{
    var response=JSON.stringify(res);
    var values=JSON.parse(response);
    if(values.status){
      //console.log(values.name)
      localStorage.setItem('username', values.data[0].fullname);

      localStorage.setItem('indexnumber', values.data[0].index_number);
      //console.log(values)
     this.router.navigate(['/votepage'])
    }
    else{
      this.status=false
    }
    console.log(values.data[0].index_number);
  },
  err=>{
    console.log(err)
  })

  }

  status:any

  subSubmit(){
    var data=this.form.getRawValue().indexNumber;

   // data=data.toUpperCase;

    data=data.replace(/\//g,"%2f")

    data=data.toUpperCase()

    if(data===""){
      this.status=''
      return;
    }

    this.http.get(`${this.port}checkvoter/${data}`).subscribe(
  res=>{
    var response=JSON.stringify(res);
    var values=JSON.parse(response);
    if(values.status){
      this.status=true
    }
    else{
      this.status=false
    }
    //console.log(values);
  },
  err=>{
    console.log(err)
  })
  }

  constructor(private http: HttpClient, private router: Router) { console.log(this.form.getRawValue().indexNumber) }

  ngOnInit(): void {
  }

}
