import { Component, OnInit, AfterViewInit, AfterContentChecked, ChangeDetectionStrategy, ChangeDetectorRef, ElementRef, ViewChild } from '@angular/core' ;

import { FormControl , FormGroup , FormBuilder, Validators } from '@angular/forms';

import routes from '../../../assets/routes/routes.json';

//import * as $ from 'jquery';

import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.scss']
})
export class CandidatesComponent implements OnInit {

  @ViewChild("see", { static: true }) msg!: ElementRef;

  port = routes.host

  successMessage:any
  errorMessage:any

 flashMessage=''

 user_id = localStorage.getItem("user_id")
 votingname = localStorage.getItem("votingname")

 toggleAddCandidate(data:any){

  this.addCandidate.controls['category'].setValue(data);

  let addcandidate = document.getElementById("addcandidate") as HTMLElement

  addcandidate.classList.remove("hidden")

  // if(data==="close"){
  //   form.classList.remove('add_candidate');

  // form.classList.add('add_candidate_rm');

  // return;
  // }
  // //alert(data);

  // form.classList.remove('add_candidate_rm');

  // form.classList.add('add_candidate');

  // this.addCandidate.controls['category'].setValue(data);

  // if(name && photo){
  //   this.addCandidate.controls['name'].setValue(name);
  //   this.addCandidate.controls['photo'].setValue(photo);
  // }

 }

  toggleUpdateCandidate(form:any,data?:any,name?:any,photo?:any){

     if(data==="close"){
    form.classList.remove('add_candidate');

  form.classList.add('add_candidate_rm');

  return;
  }
  //alert(data);

  form.classList.remove('add_candidate_rm');

  form.classList.add('add_candidate');

  this.updateCandidate.controls['category'].setValue(data);

  if(name && photo){
    this.updateCandidate.controls['name'].setValue(name);
    this.updateCandidate.controls['photo'].setValue(photo);
  }

 }

 deleteCandidate(data:any,category:any){
  //alert(data);
  //alert(category);
  this.http.get(`${this.port}candidates/del/${data}/${category}`).subscribe(
    res=>{
      console.log(res)
      var response=JSON.stringify(res)
      this.flashMessage="Candidate Deleted Successfully"//response.replace(/"/g,'')
      setTimeout(()=>{
      this.flashMessage='' //window.location.reload()
       },900)
    },
    err=>{
      console.log(err)
    }
    )
 }

 submitCategoryMessage=""
 submitCandidateMessage=""

 addCategory=new FormGroup({
  categoryname : new FormControl('',Validators.required),
  votingname : new FormControl(this.votingname),
  user_id : new FormControl(this.user_id)
 })

 submitted = false

 get addCategoryControls(){
  return this.addCategory.controls
 }

 addCategorySubmit(){

  this.submitted = true

  if(this.addCategory.invalid) return

  if(!(localStorage.getItem('user_id') && localStorage.getItem('votingname'))){
    // window.location.replace('/admin/auth')
    this.errorMessage = "Unauthrized access...Please login"

    return

  }  

  else{

  this.http.post(`${this.port}categories/add`,this.addCategory.getRawValue()).subscribe(
    res=>{

      this.successMessage = res 

      setTimeout(()=>{
        this.successMessage = ''
        location.reload()
      },1500)

    },
    err=>{

      this.errorMessage = err.error

    })
  }

  setTimeout(()=>{
    this.errorMessage = ''
    // location.reload()
  },1500)

 }

 addCandidate=new FormGroup(
  {
    category: new FormControl('',Validators.required),
    candidatename: new FormControl('',Validators.required),
    avatar: new FormControl('',Validators.required),
    votingname : new FormControl(this.votingname,Validators.required),
    user_id : new FormControl(this.user_id,Validators.required)
  }
  );

  updateCandidate=new FormGroup(
  {
    category: new FormControl(''),
    name: new FormControl(''),
    photo: new FormControl('')
  }
  );

  src:any=""

  imagePreview(files:any){
    if(files.length===0) 
      return;
    let reader= new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload=(_event)=>{
      console.log(reader.result)
      this.src=reader.result;
      this.addCandidate.controls['avatar'].setValue(reader.result);
    }

  }

 submitCandidate(){
  // console.log(this.addCandidate.getRawValue())

  this.submitted = true

  if(this.addCandidate.invalid) return

  this.http.post(`${this.port}candidates/add`,this.addCandidate.getRawValue()).subscribe(
    res=>{
      // console.log(res)
      this.successMessage="New Candidate Added Successfully"
      //this.message.HTML='hello'
      setTimeout(()=>{

        this.successMessage=''
        //toggleAddCandidate()
        window.location.reload()
       },1000)
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

  submitUpdateCandidate(){
  console.log(this.addCandidate.getRawValue())

  this.http.post(`${this.port}candidates/update/candidate`,this.updateCandidate.getRawValue()).subscribe(
    res=>{
      console.log(res)
      this.flashMessage="Candidate Successfully Updated"
      //this.message.HTML='hello'
      setTimeout(()=>{

        this.flashMessage=''
        window.location.reload();
        //toggleAddCandidate()
       },900)
    },
    err=>{
      console.log(err)
    })

  
 }

  constructor( private http: HttpClient, private ElementRef:ElementRef ) {

    if(!(this.user_id && this.votingname)){
      window.location.replace('/admin/auth')
    }

    // this.http.get('http://localhost:4000/votings/myname').subscribe(
    //   res=>{
    //     console.log(res)
    //   })

    this.http.get(`${this.port}categories/${this.user_id}/${this.votingname}`).subscribe(
        res=>{

          var response= JSON.parse(JSON.stringify(res))

          response.forEach((data:any,index:any)=>{
            //console.log(data.category)
            this.categories.push({
              "count" : data.count,
              "category" : data.categoryname,
              // "category_id" : data.category_id
            })
          })

          console.log(this.categories)

        },
        err=>{
          console.log(err)
          if(err.statusText === "Unknown Error"){
          this.errorMessage = "Error Connecting"
        }
        else{
        // this.errorMessage = err.error
      }

      setTimeout(()=>{
        this.errorMessage = ''
        // window.location.reload()
      },10000)

        }
        )

    this.http.get(`${this.port}candidates/${this.user_id}/${this.votingname}`).subscribe(
        res=>{
          var response= JSON.parse(JSON.stringify(res))

          response.forEach((data:any,index:any)=>{

            this.candidates.push({
              "category" : data.category,
              "candidatename" : data.candidatename,
              "photo" : data.avatar
            })
          })

          console.log(this.candidates)

        },
        err=>{
          console.log(err)
        }
        )

   }

   categories:any=[]

  candidates:any=[]

  ngOnInit(): void {//declare var $: any;
  this.msg.nativeElement.innerHTML='hello'
  this.msg.nativeElement.style.backgroundColor='red';

  this.user_id = localStorage.getItem("user_id")
  this.votingname = localStorage.getItem("votingname")

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

    //var hideAddCandidate=document.getElementById('hideAddCandidate') as HTMLElement;

    // var add_category=document.querySelectorAll('.add_category');

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

/*
    hideAddCandidate.addEventListener('click',()=>{

      add_candidate_rm.forEach((btn:any)=>{
        btn.classList.remove('add_candidate');
        btn.classList.add('add_category_rm')
    });

    })
    */

    showAddCategory.addEventListener('click',()=>{

      addcategory.classList.remove("hidden")

    })

    // submitCategory.addEventListener('click',()=>{

    //   let submitCategoryMessage=document.getElementById('submitCategoryMessage') as HTMLElement;
      
    //   let categoryform=document.getElementById('categoryform') as HTMLElement;

    //   console.log(this.addCategory.value);

    //    this.http.get(`${this.port}categories/add/${this.addCategory.value}`).subscribe(
    //     res=>{
          
    //       var response=JSON.stringify(res)
    //       var data=JSON.parse(response)
    //       console.log(data.data);
    //       this.submitCategoryMessage="Category Successfully Created";
    //       submitCategoryMessage.style.display='block';
    //       categoryform.style.display='none';

    //       setInterval(()=>{
    //         add_category_rm.forEach((btn:any)=>{
    //     btn.classList.remove('add_category');
    //     btn.classList.add('add_category_rm')
    // });
    // window.location.reload()
    //       },1000)
    //     },
    //     err=>{
    //       console.log(err)
    //       this.submitCategoryMessage="Error Inserting Data Please Try Again";
    //       submitCategoryMessage.style.display='block';
    //       submitCategoryMessage.classList.remove('bg-success');
    //       submitCategoryMessage.classList.add('bg-danger');
          
    //       categoryform.style.display='none';

    //       setInterval(()=>{
    //         /*add_category_rm.forEach((btn:any)=>{
    //     btn.classList.remove('add_category');
    //     btn.classList.add('add_category_rm')
    // });*/
    // window.location.reload()
    //       },1000)
    //     }
    //     )

    // })

    

}

}

function readAsDataURL(file: Element | null): FileReader{
  throw new Error('function not implemented.');
}