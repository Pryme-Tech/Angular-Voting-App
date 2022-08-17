import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { FormControl , FormGroup , FormBuilder } from '@angular/forms';

import routes from '../../../assets/routes/routes.json';

@Component({
  selector: 'app-votings',
  templateUrl: './votings.component.html',
  styleUrls: ['./votings.component.scss']
})
export class VotingsComponent implements OnInit {

  port = routes.host

  // port = "http://localhost:4000/"

  welcome = ''

  errorMessage = ''
  successMessage = ''

  noVotingAdded:any = ''
  votings:any = []

  user_id = localStorage.getItem("user_id")

  newVoting = new FormGroup({
    newVotingInput : new FormControl(''),
    user : new FormControl(this.user_id),
    imageurl : new FormControl('')
  })

  newVotingOnSubmit(){
    // console.log(this.newVoting.getRawValue())

    this.http.post(`${this.port}votings/add`,this.newVoting.getRawValue()).subscribe(
      res=>{
        console.log(res)
        this.successMessage = JSON.stringify(JSON.parse(JSON.stringify(res)))
        setTimeout(()=>{
          this.successMessage = ''
          window.location.reload()
        },2000)
      },
      err=>{
        
        if(err.statusText === "Unknown Error"){
          this.errorMessage = "Error Connecting"
        }
        else{
        this.errorMessage = err.error
      }

      setTimeout(()=>{
        this.errorMessage = ''
        // window.location.reload()
      },2000)

      })
  }

  redirectToCandidates(votingname:any){

    localStorage.setItem("votingname",votingname)

    window.location.replace('/admin/candidates')

    //alert(votingname)
    
  }

  constructor(private http:HttpClient) {

    if(!(localStorage.getItem('user_id'))){
      window.location.replace('/admin/auth')
    }

    http.get(`${this.port}votings/${this.user_id}`).subscribe(
      res=>{
        let imageurl=''
        let result = JSON.parse(JSON.stringify(res))

        console.log(result)

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
            "votingname" : i.votingname,
            "imageurl" : i.imageurl
          })
        })

      }

      this.welcome = `Welcome ${this.user_id?.toUpperCase()}`

      },
      err=>{
        console.log(err)
      })
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
