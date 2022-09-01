import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { FormControl , FormGroup , FormBuilder } from '@angular/forms';
import { UsersService } from '../../users.service';

import routes from '../../../assets/routes/routes.json';
import { Router } from '@angular/router';

@Component({
  selector: 'app-elections',
  templateUrl: './elections.component.html',
  styleUrls: ['./elections.component.scss']
})
export class ElectionsComponent implements OnInit {

  port = routes.host

  // port = "http://localhost:4000/"

  welcome = ''

  errorMessage = ''
  successMessage = ''

  noVotingAdded:any = ''
  votings:any = []

  user_id = ''

  newVoting:any

  newVotingOnSubmit(){
    console.log(this.newVoting.getRawValue())

    this.http.post(`${this.port}votings/add`,this.newVoting.getRawValue()).subscribe(
      res=>{
        // // console.log(res)
        let result = JSON.parse(JSON.stringify(res))
        this.successMessage = result.msg

        setTimeout(()=>{
          this.successMessage = ''
          window.location.reload()
        },2000)

      },
      err=>{

        this.errorMessage = err.error.msg

        setTimeout(()=>{
          this.errorMessage = ''
        },2000)
        
      //   if(err.statusText === "Unknown Error"){
      //     this.errorMessage = "Error Connecting"
      //   }
      //   else{
      //   this.errorMessage = err.error
      // }

      // setTimeout(()=>{
      //   this.errorMessage = ''
      //   // window.location.reload()
      // },2000)

      })
  }

  redirectToCandidates(election:any){

    localStorage.setItem("electionsA",election)

    window.location.assign('/candidates')

    //alert(votingname)
    
  }

  constructor(private http:HttpClient , private users: UsersService, private route : Router ) {

    users.userDetails().subscribe(
      res=>{
        // console.log(res)
        let result = JSON.parse(JSON.stringify(res))
        this.welcome = `Welcome ${result.username}`

        this.user_id = result.id

        this.newVoting = new FormGroup({
          electionName : new FormControl(''),
          userId : new FormControl(result.id),
          imageurl : new FormControl('')
        })

        http.get(`${this.port}votings/${result.id}`).subscribe(
          res=>{
            
            let imageurl=''
            let result = JSON.parse(JSON.stringify(res))
    
            if(result.length < 1 ){
              this.noVotingAdded="No Elections Created"
    
            }
    
            else{
              
            result.forEach((i:any)=>{
              // if(i.imageurl === null){
              //   imageurl = this.port+"img/votings/dsf.jpeg"
              // }
              // else if(i.imageurl === null){
              //   imageurl = this.port+"img/votings/dsf.jpeg"
              // }
              // else{
              //   imageurl = this.port+i.imageurl
              // }
              this.votings.push({
                "votingname" : i.electionName,
                "imageurl" : i.imageurl
              })
            })
    
          }
    
          // this.welcome = `Welcome ${this.user_id?.toUpperCase()}`
    
          },
          err=>{
            console.log(err)
          })


      },
      err=>{
        location.replace('http://localhost:4200/login')
      }
    )

    
   }

   previewSrc:any=''

   imagePreview(files:any){
    if(files.length===0) 
      return;
    let reader= new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload=(_event)=>{
      // console.log(reader.result)
      this.previewSrc=reader.result
      // this.src=reader.result;
      this.newVoting.controls['imageurl'].setValue(reader.result);
    }

  }


   ngAfterViewInit(){

        const btn = document.querySelector(".mobile-menu-button") as HTMLElement;
        // const btnClose = document.getElementById("mobile_menu_cmobile-menu-buttonlose_button") as HTMLElement;
        const menu = document.querySelector(".mobile-menu-hidden") as HTMLElement;

        const mobile_menu = document.querySelector("#mobile-menu") as HTMLElement;

        btn.addEventListener("click",()=>{
            menu.classList.toggle("mobile-menu-hidden");
        })

        // btnClose.addEventListener("click",()=>{
        //   alert('helooo')
        //     menu.classList.toggle("mobile-menu-hidden");
        // })

        mobile_menu.addEventListener("click",()=>{
            menu.classList.toggle("mobile-menu-hidden");
        })

        // d-flex flex-column

   }

  ngOnInit(): void {
  }

}
