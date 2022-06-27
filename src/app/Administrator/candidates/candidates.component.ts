import { Component, OnInit, AfterViewInit, AfterContentChecked,  ElementRef, ViewChild } from '@angular/core' ;

import { FormControl , FormGroup , FormBuilder } from '@angular/forms';

//import * as $ from 'jquery';

import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.scss']
})
export class CandidatesComponent implements OnInit {

  @ViewChild("see", { static: true }) msg!: ElementRef;

  port = 'http://localhost:4000/'//'http://localhost:4000/'

 flashMessage=''

 user_id = localStorage.getItem("user_id")
 votingname = localStorage.getItem("votingname")

 toggleAddCandidate(form:any,data?:any,name?:any,photo?:any){

  if(data==="close"){
    form.classList.remove('add_candidate');

  form.classList.add('add_candidate_rm');

  return;
  }
  //alert(data);

  form.classList.remove('add_candidate_rm');

  form.classList.add('add_candidate');

  this.addCandidate.controls['category'].setValue(data);

  if(name && photo){
    this.addCandidate.controls['name'].setValue(name);
    this.addCandidate.controls['photo'].setValue(photo);
  }

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
  categoryname : new FormControl(''),
  votingname : new FormControl(this.votingname),
  user_id : new FormControl(this.user_id)
 })

 addCategorySubmit(){
  console.log(this.addCategory.getRawValue())

  this.http.post(`${this.port}categories/add`,this.addCategory.getRawValue()).subscribe(
    res=>{
      console.log(res)
    },
    err=>{
      console.log(err)
    })
 }

 addCandidate=new FormGroup(
  {
    category: new FormControl(''),
    candidatename: new FormControl(''),
    // photo: new FormControl(''),
    votingname : new FormControl(this.votingname),
    user_id : new FormControl(this.user_id)
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
      this.src=reader.result;
      this.addCandidate.controls['photo'].setValue(reader.result);
    }

  }

 submitCandidate(){
  console.log(this.addCandidate.getRawValue())

  this.http.post(`${this.port}candidates/add`,this.addCandidate.getRawValue()).subscribe(
    res=>{
      console.log(res)
      this.flashMessage="New Candidate Added Successfully"
      //this.message.HTML='hello'
      setTimeout(()=>{

        this.flashMessage=''
        //toggleAddCandidate()
       },900)
    },
    err=>{
      console.log(err)
    })

  
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
              "count" : index,
              "category" : data.categoryname,
              // "category_id" : data.category_id
            })
          })

          console.log(this.categories)

        },
        err=>{
          console.log(err)
        }
        )

    this.http.get(`${this.port}candidates/${this.user_id}/${this.votingname}`).subscribe(
        res=>{
          var response= JSON.parse(JSON.stringify(res))

          response.forEach((data:any,index:any)=>{

            this.candidates.push({
              "category" : data.category,
              "candidatename" : data.candidatename
              // "photo" : avatar
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

    //var hideAddCandidate=document.getElementById('hideAddCandidate') as HTMLElement;

    var add_category=document.querySelectorAll('.add_category');

    var add_category_rm=document.querySelectorAll('.add_category_rm');

    //var add_candidate_rm=document.querySelectorAll('.add_candidate_rm');

    var showAddCategory=document.getElementById('showAddCategory') as HTMLElement;

    let submitCategory=document.getElementById("submitCategory") as HTMLElement;

    hideAddCategory.addEventListener('click',()=>{

      add_category_rm.forEach((btn:any)=>{
        btn.classList.remove('add_category');
        btn.classList.add('add_category_rm')
    });

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

      add_category_rm.forEach((btn:any)=>{
        btn.classList.add('add_category');
        btn.classList.remove('add_category_rm')
    });

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