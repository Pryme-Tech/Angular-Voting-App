import { Component, AfterViewInit, OnInit } from '@angular/core';

import { FormControl , FormGroup , FormBuilder } from '@angular/forms';

import {HttpClient} from '@angular/common/http';

import {Router} from '@angular/router';

@Component({
  selector: 'app-voting',
  templateUrl: './voting.component.html',
  styleUrls: ['./voting.component.scss']
})
export class VotingComponent implements OnInit {

  port = 'https://castvote.herokuapp.com/'//'http://localhost:4000/'

 votes = this.fb.group({
  indexNumber : ['']
 })

 flashSuccessMessage=''
 flashErrorMessage=''

 username:any=''
 indexnumber:any=''

 see=0

 show(){
  var a=JSON.parse(JSON.stringify(this.votes.getRawValue()));

  console.log(a)

  this.http.post(`${this.port}candidates/vote`,this.votes.getRawValue()).subscribe(
    res=>{
      console.log(res)
      let message=JSON.parse(JSON.stringify(res))
      if(message.includes('successful')){
        this.flashSuccessMessage=message
      }
      else{
        this.flashErrorMessage=message
      }
      localStorage.removeItem('username')
      localStorage.removeItem('indexnumber')

      var x:any=3;

    setInterval(()=>{
      x--;
      var v=document.getElementById("countdown") as HTMLElement; 
      v.innerText=x;
      if(x===0){
        window.location.reload();
      }
    },1000)


    },
    err=>{
      console.log(err)
    })

  for(var key in a){
    console.log(a[key])
  }

 }


 categories:any[]=[]
 

candidates:any=[]

status=0


  constructor( private fb: FormBuilder, private http: HttpClient, private router: Router ) { 

    if(localStorage.getItem('username') && localStorage.getItem('indexnumber')){
      this.username=localStorage.getItem('username');
      this.indexnumber=localStorage.getItem('indexnumber');
      this.votes.controls['indexNumber'].setValue(localStorage.getItem('indexnumber'));
    }

    else{
      this.router.navigate(['/vote'])
    }

/*
    this.candidates.push({
              "count" : "index",
              "category" : "data.category",
              "id" : "5335",
              "name" : "data.name",
              "photo" : "data.photo"
            })

            */

    this.http.get(`${this.port}categories`).subscribe(
        res=>{
          //console.log(res);
          var response= JSON.parse(JSON.stringify(res))

          response.forEach((data:any,index:any)=>{
            //console.log(data.category)
           this.categories.push({
            "count" : index,
            "category" : data.category,
            "category_id" : data.category_id
          })

           //this.categories.forEach((category)=>{

              this.votes.addControl(data.category,this.fb.control(''));

           // })

           //this.categories.forEach((category)=>{

              //this.votes.addControl(data.category,this.fb.control(''));

            //})
         })

          this.status=1

        },
        err=>{
          console.log(err)
        }
        )

    this.http.get(`${this.port}candidates`).subscribe(
        res=>{
          console.log(res);
          var response= JSON.parse(JSON.stringify(res))

          response.forEach((data:any,index:any)=>{
            //console.log(data)

            if(data.photo===""){
            var avatar=`${this.port}images/candidates/default.png`
          }

          else{
            avatar=`${this.port}${data.photo}`;
          }

            this.candidates.push({
              "count" : index,
              "category" : data.category,
              "id" : "5335",
              "name" : data.name,
              "photo" : avatar
            })
          })

        },
        err=>{
          console.log(err)
        }
        )




  }

  ngAfterViewInit(){

     const prevBtns = document.querySelectorAll(".btn-prev");
    const nextBtns = document.querySelectorAll(".btn-next");
    const progress = document.getElementById("progress") as HTMLElement;
    const formSteps = document.querySelectorAll(".form-step");
    const progressSteps = document.querySelectorAll(".progress-step");

/*
    setTimeout(()=>{
      localStorage.removeItem('username')
      localStorage.removeItem('indexnumber')
      window.location.reload()
    },10000)
    */

/*
    setTimeout(()=>{
      console.log(this.status);
      formSteps[0].classList.add("form-step-active");
    },10000)

    */

    //formSteps[0].classList.add("form-step-active");

    

    //progressSteps[0].classList.add("progress-step-active");

    let formStepsNum = 0;

    progressSteps.forEach((btn,i) => {
      btn.addEventListener("click", () => {

        formStepsNum=i;
        updateFormSteps();
        updateProgressbar();

      });
    });
    

    nextBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        formStepsNum++;
        updateFormSteps();
        updateProgressbar();
        
      });
    });

    prevBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        
        formStepsNum--;
        updateFormSteps();
        updateProgressbar();
      });
    });

    function updateFormSteps() {
      formSteps.forEach((formStep) => {
        formStep.classList.contains("form-step-active") && formStep.classList.remove("form-step-active");
      });
    
      formSteps[formStepsNum].classList.add("form-step-active");
    }

    function updateProgressbar() {
      progressSteps.forEach((progressStep, idx) => {
        if (idx < formStepsNum + 1) {
          progressStep.classList.add("progress-step-active");
        } else {
          progressStep.classList.remove("progress-step-active");
        }
      });
    
      const progressActive = document.querySelectorAll(".progress-step-active");
    
      progress.style.width =((progressActive.length - 1) / (progressSteps.length - 1)) * 100 + "%";
    }

  }

  ngOnInit(): void {

    if(this.status===1){
      console.log('hello')
      //formSteps[0].classList.add("form-step-active");
    }


  }

}