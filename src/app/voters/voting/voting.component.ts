import { Component, AfterViewInit, OnInit } from '@angular/core';

import { FormControl , FormGroup , FormBuilder } from '@angular/forms';

import {HttpClient} from '@angular/common/http';

import {Router} from '@angular/router';

import routes from '../../../assets/routes/routes.json';

@Component({
  selector: 'app-voting',
  templateUrl: './voting.component.html',
  styleUrls: ['./voting.component.scss']
})
export class VotingComponent implements OnInit {

  port = routes.host

  user_id = localStorage.getItem("accessuser")
  votingname = localStorage.getItem("accessvoting")
  voter = localStorage.getItem("voter")
  voterid = localStorage.getItem("voterId")

 votes = this.fb.group({
  user_id : [this.user_id],
  votingname : [this.votingname],
  voterid : [this.voterid]
 })

 flashSuccessMessage=''
 flashErrorMessage=''

 username:any=''
 indexnumber:any=''

 see=0

 vote(){

  this.http.post(`${this.port}vote`,this.votes.getRawValue()).subscribe(
    res=>{
   let result = JSON.parse(JSON.stringify(res))

   result.status == true && location.replace('/success')

   result.status == false && location.replace('/error')

      // location.replace('/see')

    //   this.flashSuccessMessage = result.msg

    //   var x:any=3;

    // setInterval(()=>{
    //   x--;
    //   var v=document.getElementById("countdown") as HTMLElement; 
    //   v.innerText=x;
    //   if(x===0){
    //     // window.location.replace('/');
    //   }
    // },1000)


    },
    err=>{
      console.log(err)
    })

  // for(var key in a){
  //   console.log(a[key])
  // }

 }


 categories:any[]=[]
 

candidates:any=[]

status=0


  constructor( private fb: FormBuilder, private http: HttpClient, private router: Router ) { 

    setTimeout(()=>{
      localStorage.clear()
      location.reload()
    },800000)

    if(localStorage.getItem('accessuser') && localStorage.getItem('accessvoting')){
    }

    else{
      // this.router.navigate(['/'])
    }

    this.http.get(`${this.port}categories/${this.user_id}/${this.votingname}`).subscribe(
        res=>{
          //console.log(res);
          var response= JSON.parse(JSON.stringify(res))

          // console.log(response)

          response.forEach((data:any,index:any)=>{
            //console.log(data.category)
           this.categories.push({
            "index" : index,
            "count" : data.count,
            "category" : data.categoryname,
              // "category_id" : data.category_id
          })
           this.votes.addControl(data.categoryname,this.fb.control(''));
           // console.log(this.votes.getRawValue())
         })

          

        },
        err=>{
          console.log(err)
        }
        )

    this.http.get(`${this.port}candidates/${this.user_id}/${this.votingname}`).subscribe(
        res=>{
          // console.log(res);
          var response= JSON.parse(JSON.stringify(res))

          response.forEach((data:any,index:any)=>{
       

            this.candidates.push({
              "count" : index,
              "category" : data.category,
              "candidatename" : data.candidatename,
              "image" : data.avatar,
              "id" : data.id
            })
          })

        },
        err=>{
          console.log(err)
        }
        )


}

  ngAfterViewInit(){

    setTimeout(()=>{
      let candidates = document.querySelectorAll('.candidatess')

      candidates.forEach((each:any)=>{
        // alert(each.innerText.length)
        if(each.innerText.length === 0){
          // alert('hello')
          each.style.display = 'none'
        }
      })
    },300)

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
