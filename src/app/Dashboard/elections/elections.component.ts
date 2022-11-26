import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { FormControl , FormGroup , FormBuilder } from '@angular/forms';
import { UsersService } from '../../users.service';

import routes from '../../../assets/routes/routes.json';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-elections',
  templateUrl: './elections.component.html',
  styleUrls: ['./elections.component.scss']
})
export class ElectionsComponent implements OnInit {

  // ngx-dropzone logic used here for uploading of election image

  file: File[] = [] ;

	onSelect(event:any) {
    this.file.splice(0);
    
		this.file.push(...event.addedFiles);

    this.fileToBase64(this.file)

	}

  fileToBase64(file: File[]){

    const reader = new FileReader();

    reader.readAsDataURL(file[0]);

    reader.onload=(_event)=>{
          this.addElectionForm.controls['electionImage'].setValue(reader.result)
        }

  }

	onRemove() {
		// console.log(event);
		this.file.splice(0);
	}

  a = [1,2,3,4,5,6,7,8,9,10]

  port = routes.host

  modeText = "Light"

  toggleMode(){
    let main = document.getElementById('main') as HTMLElement
    let toggleButton = document.getElementById('toggleButton') as HTMLElement
    main.classList.toggle('bg-dark')
    toggleButton.classList.toggle('btn-dark')

    this.modeText = main.classList.contains('bg-dark') ? "Light" : "Dark"
  }
  
  addElectionForm = this.fb.group({
    electionName : [''],
    electionImage : [''],
    userToken : ['']
  })

  addElectionSubmit(){
    this.process = true
    this.addElectionForm.controls['userToken'].setValue(localStorage.getItem('userT'))
    this.http.post(`${environment.apiKey}elections/add`,this.addElectionForm.getRawValue()).subscribe(
      res=>{
        console.log(res)

        this.process = false

        let addElection = document.getElementById('addElection') as HTMLElement
        addElection.classList.remove('d-flex')
        addElection.classList.add('d-none')
        let result = JSON.parse(JSON.stringify(res))
        this.successMessage = result.msg

        this.getUserElections()

        setTimeout(() => {
          this.successMessage = ""
        }, 3000);
      },
      err=>{
        console.log(err)

        this.process = false
        this.errorMessage = err.error.msg

        setTimeout(() => {
          this.errorMessage = ""
        }, 4000);
      }
    )
    console.log(this.addElectionForm.getRawValue())
  }

  welcome = ''

  errorMessage = ''
  successMessage = ''

  process = false

  noVotingAdded:any = ''
  votings:any = []

  user_id = ''

  newVoting:any

  newVotingOnSubmit(){
    console.log(this.newVoting.getRawValue())

    this.http.post(`${this.port}elections/add`,this.newVoting.getRawValue()).subscribe(
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
        
    

      })
  }



  redirectToCandidates(election:any,launched:any){

    localStorage.setItem("electionsA",election)

    if(launched) localStorage.setItem("launched",'true')

    else localStorage.setItem("launched",'false')

    window.location.assign('/candidates')

    //alert(votingname)
    
  }

  userElections:any = []

  getUserElections(){

    this.http.get(`${environment.apiKey}elections/userElections/${localStorage.getItem('userT')}`).subscribe(
      res=>{
        console.log(res)
        let result = JSON.parse(JSON.stringify(res))
        this.userElections = result
        console.log(this.userElections)
      },
      err=>{
        console.log(err)
      }
    )

  }

  constructor(private http:HttpClient , private fb : FormBuilder, private users: UsersService, private route : Router ) {

    this.getUserElections()

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

        http.get(`${this.port}elections/${result.id}`).subscribe(
          res=>{
        
            let imageurl=''
            let result = JSON.parse(JSON.stringify(res))

            // alert(result.length)
    
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
                "electionId" : i.id,
                "votingname" : i.electionName,
                "imageurl" : i.imageurl,
                "launched" : i.link
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
        // location.replace('http://localhost:4200/login')
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

    setTimeout(() => {

      const createdElection = document.querySelectorAll('.createdElection')

      const manageElections = document.querySelectorAll('.manage')

      createdElection.forEach( (election:any) => {
        election.addEventListener( 'mouseover',()=> election.querySelector('.manage').classList.add('d-flex')  )
        election.addEventListener( 'mouseleave',()=> election.querySelector('.manage').classList.remove('d-flex')  )
     })
      
    }, 1000); 

    // manageElections.forEach( (election:any) => election.addEventListener( 'mouseover',()=> election.classList.remove('d-none') )  )

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
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    window.addEventListener('resize', () => {
      vh = window.innerHeight * 0.01;
      // console.log(vh)
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    });
  }

}
