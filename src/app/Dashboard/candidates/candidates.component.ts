import { Component, OnInit, AfterViewInit, AfterContentChecked, ChangeDetectionStrategy, ChangeDetectorRef, ElementRef, ViewChild } from '@angular/core' ;

import { FormControl , FormGroup , FormBuilder, Validators } from '@angular/forms';

import routes from '../../../assets/routes/routes.json';

//import * as $ from 'jquery';

import {HttpClient} from '@angular/common/http';
import { UsersService } from 'src/app/users.service';

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.scss']
})
export class CandidatesComponent implements OnInit {

  @ViewChild("see", { static: true }) msg!: ElementRef;

  process = false
  process1 = false

  isElectionLaunched = false
  link:any
  start:any
  end:any

  electionName:any

  checkElectionIsLaunched(){
    this.http.get(`${this.port}elections/checkLink/${localStorage.getItem('electionsA')}`).subscribe(
      res=>{
        // console.log(res)
        let result = JSON.parse(JSON.stringify(res))

        this.isElectionLaunched = result.status
        this.link = result.link
        this.start = result.start
        this.end = result.end

        this.electionName = result.electionName
      },
      err=>{
        this.electionName = err.error.electionName
        this.isElectionLaunched = err.error.status
      }
      )
  }



  port = routes.host

  successMessage:any
  errorMessage:any

 userId:any

 electionLink = new FormGroup({
  electionId : new FormControl( localStorage.getItem('electionsA') ),
  start : new FormControl('',Validators.required),
  end : new FormControl('',Validators.required),  
  expiresOn : new FormControl(''),
  host : new FormControl(location.host)
 })

 get electionLinkV(){
  return this.electionLink.controls
 }

 getElectionLink(){

  this.submitted = true

  if(this.electionLink.invalid) return

  this.electionLink.controls['expiresOn'].setValue(Math.abs(Date.parse(this.electionLink.getRawValue().end) - Date.parse(this.electionLink.getRawValue().start)))

  this.http.post(`${this.port}elections/getElectionLink`,this.electionLink.getRawValue()).subscribe(
    res=>{

      let result = JSON.parse(JSON.stringify(res))

      this.successMessage = result.msg

      this.isElectionLaunched = result.status
        this.link = result.link
        this.start = result.start
        this.end = result.end

        this.electionName = result.electionName

    },
    err=>{
      console.log(err)
    }
    )
  
  // console.log(this.electionLink.getRawValue())
 }

 toggleAddCandidate(data:any){

  this.addCandidate.controls['category'].setValue(data);

  let addcandidate = document.getElementById("addcandidate") as HTMLElement

  addcandidate.classList.remove("hidden")

 }

 
 addCategory = this.fb.group({
          categoryName: ['',Validators.required],
          electionId: [''],
          userId: ['']
        }
          )

 submitted = false

 get addCategoryControls(){
  return this.addCategory.controls
 }


 addCategorySubmit(){

  this.submitted = true

  if(this.addCategory.invalid) return

    this.process = true

  let addcategoryform = document.getElementById('addcategory') as HTMLElement

        addcategoryform.classList.add('hidden')

  console.log(this.addCategory.getRawValue())

  this.http.post(`${this.port}categories/add`,this.addCategory.getRawValue()).subscribe(
    res=>{

      let result = JSON.parse(JSON.stringify(res))

      this.successMessage = result.msg
      this.process = false

      setTimeout(()=>{
        this.successMessage = ''

        if(this.categories = []){

        this.aaa(this.userId)
      }

      },3000)

    },
    err=>{

      this.errorMessage = err.error.msg

      this.process = false

      setTimeout(()=>{
        this.errorMessage = ''

      },3000)

    })
  

  setTimeout(()=>{
    this.errorMessage = ''
    // location.reload()
  },1500)

 }

 addCandidate=new FormGroup(
  {
    category: new FormControl('',Validators.required),
    candidateName: new FormControl('',Validators.required),
    avatar: new FormControl('',Validators.required),
    electionId : new FormControl(localStorage.getItem('electionsA'),Validators.required),
    userId : new FormControl('',Validators.required)
  }
  )

  src:any=""

  imagePreview(files:any){
    if(files.length===0) 
      return;
    let reader= new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload=(_event)=>{
      // console.log(reader.result)
      this.src=reader.result;
      this.addCandidate.controls['avatar'].setValue(reader.result);
    }

  }

 submitCandidate(){


  this.submitted = true

  if(this.addCandidate.invalid) return

  // console.log(this.addCandidate.getRawValue())
  // alert('helooo')

  this.http.post(`${this.port}candidates/add`,this.addCandidate.getRawValue()).subscribe(
    res=>{
      // console.log(res)
      let result = JSON.parse(JSON.stringify(res))

      this.successMessage=result.message

      setTimeout(()=>{

        this.successMessage=''
        //toggleAddCandidate()
        window.location.reload()
       },2000)

    },
    err=>{
      // console.log(err)
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

 get submitCandidateControls(){
  return this.addCandidate.controls
 }

 aaa(userId:any){

  this.process1 = true

  this.http.get(`${this.port}categories/${userId}/${localStorage.getItem('electionsA')}`).subscribe(
          res=>{

            // console.log(res)
  
            let result = JSON.parse(JSON.stringify(res))
  
            result.forEach((data:any,index:any)=>{
              //console.log(data.category)
              this.categories.push({
                "index" : index,
                "count" : data.count,
                "category" : data.categoryName,
                // "category_id" : data.category_id
              })
            })

            this.process1 = false
  
            // console.log(this.categories)
  
          },
          err=>{
            console.log(err)
  
          }
          )

          this.http.get(`${this.port}candidates/${userId}/${localStorage.getItem('electionsA')}`).subscribe(
            res=>{
              // console.log(res)

              let result= JSON.parse(JSON.stringify(res))
    
              result.forEach((data:any,index:any)=>{
    
                this.candidates.push({
                  "category" : data.category,
                  "candidatename" : data.candidateName,
                  "photo" : data.avatar
                })
              })

              this.process1 = false
    
              // console.log(this.candidates)
    
            },
            err=>{
              console.log(err)
            }
            )

 }

  constructor( private http: HttpClient, private ElementRef:ElementRef, private users: UsersService, private fb: FormBuilder ) {

    // alert(location.host)

    this.checkElectionIsLaunched()

    users.userDetails().subscribe(
      res=>{
        let result = JSON.parse(JSON.stringify(res))

        this.userId = result.id

        this.addCandidate.controls['userId'].setValue(result.id);

        this.addCategory.controls['electionId'].setValue(localStorage.getItem('electionsA'))

        this.addCategory.controls['userId'].setValue(result.id)

        this.aaa(result.id)

         

      },
      err=>{
        location.replace('http://localhost:4200/login')
      })

   }

   categories:any=[]

  candidates:any=[]

  ngOnInit(): void {//declare var $: any;
  this.msg.nativeElement.innerHTML='hello'
  this.msg.nativeElement.style.backgroundColor='red';

  } 

  ngAfterContentChecked(){

    //candidates element

    let showAddCandidate=document.querySelectorAll('showAddCandidate');

     showAddCandidate.forEach((btn)=>{

      btn.addEventListener("click",()=>{
        alert('hello');
      })

    }) 

  }





ngAfterViewInit(){

    var hideAddCategory=document.getElementById('hideAddCategory') as HTMLElement;

    var hideAddCandidate=document.getElementById('hideAddCandidate') as HTMLElement;

    let addcategory = document.getElementById("addcategory") as HTMLElement

    let addcandidate = document.getElementById("addcandidate") as HTMLElement

    var add_category_rm=document.querySelectorAll('.add_category_rm');

    //var add_candidate_rm=document.querySelectorAll('.add_candidate_rm');

    var showAddCategory=document.getElementById('showAddCategory') as HTMLElement;

    let submitCategory=document.getElementById("submitCategory") as HTMLElement;

    hideAddCategory.addEventListener('click',()=>{

      addcategory.classList.add("hidden")

    })

    hideAddCandidate.addEventListener('click',()=>{

      addcandidate.classList.add("hidden")

    })

    showAddCategory.addEventListener('click',()=>{

      addcategory.classList.remove("hidden")

    })
    

}

}

function readAsDataURL(file: Element | null): FileReader{
  throw new Error('function not implemented.');
}