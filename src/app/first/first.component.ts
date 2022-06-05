import { Component, AfterViewInit, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { FormBuilder,Validators } from '@angular/forms';

@Component({
  selector: 'app-first',
  templateUrl: './first.component.html',
  styleUrls: ['./first.component.scss']
})
export class FirstComponent implements OnInit {

  
  form=this.fb.group({
    username : ['',Validators.required],
    position: ['',Validators.required],
    phone: ['',Validators.required],
    email: ['',Validators.required],
    dob: ['',Validators.required],
    id: ['',Validators.required],
    password: ['',Validators.required],
    confirmPassword: ['',Validators.required]
  })

  submit=false

  get f(){return this.form.controls;}

  onSubmit(){
    if(this.form.invalid){
      return;
    }
    alert("Registration Successfully Completed");
    console.log(this.form.getRawValue());
  }

  constructor( private fb: FormBuilder ) { }  

  ngOnInit(): void {
  }

  ngAfterViewInit(){
  //  alert("heloo");
    const prevBtns = document.querySelectorAll(".btn-prev");
    const nextBtns = document.querySelectorAll(".btn-next");
    const progress = document.getElementById("progress") as HTMLElement;
    const formSteps = document.querySelectorAll(".form-step");
    const progressSteps = document.querySelectorAll(".progress-step");

    
    let formStepsNum = 0;

    var status=true
    
    progressSteps.forEach((btn,i) => {
      btn.addEventListener("click", () => {

        var a:any=document.querySelectorAll(".form-step-active input");

        var small=document.querySelectorAll("small");
        
        for (let index = 0; index < a.length; index++) {
          
          if(a[index].value === ""){
            status=false;
             break
            }
          else{ status=true }
        }

        if(this.submit=true && status===false){

          for(var i=0; i<small.length; i++){
            small[i].style.display='inline';
          }

        }
        else if(this.submit=true && status===true){

          for(var i=0; i<small.length; i++){
            small[i].style.display='none';
          }

        formStepsNum=i;
        updateFormSteps();
        updateProgressbar();
        }

      });
    });
    
    nextBtns.forEach((btn) => {
      btn.addEventListener("click", () => {

        var a:any=document.querySelectorAll(".form-step-active input");

        var small=document.querySelectorAll("small");

        for (let index = 0; index < a.length; index++) {
          
          if(a[index].value === ""){
            status=false;
             break
            }
          else{ status=true }
        }
        
        if(this.submit=true && status===false){

          for(var i=0; i<small.length; i++){
            small[i].style.display='inline';
          }

        }
        else if(this.submit=true && status===true){

          for(var i=0; i<small.length; i++){
            small[i].style.display='none';
          }

        formStepsNum++;
        updateFormSteps();
        updateProgressbar();
        }
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

    function see(a:any){
      alert(a);
    }
    
      }
}
