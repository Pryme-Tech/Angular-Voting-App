import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './page/register/register.component';
import { FirstComponent } from './first/first.component';
import { SecondComponent } from './second/second.component';
import { ThirdComponent } from './third/third.component';
import { ReactiveFormsModule } from '@angular/forms';

import { RouterModule, Routes } from '@angular/router';
import { VoteComponent } from './page/vote/vote.component';
import { VotingComponent } from './page/voting/voting.component';
import { AdminComponent } from './Administrator/admin/admin.component';
import { Page404Component } from './page404/page404.component';
import { CandidatesComponent } from './Administrator/candidates/candidates.component';
import { VotesComponent } from './Administrator/votes/votes.component';


const routes: Routes = [
  { path: 'form', component: FirstComponent },
  { path: 'home', component: SecondComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'vote', component: VoteComponent},
  { path: 'votepage', component: VotingComponent},

  { path: 'admin', component: AdminComponent,
  children:[
  {path: "candidates", component: CandidatesComponent },
  {path: "votes", component: VotesComponent},
  {path: '', redirectTo: "candidates", pathMatch: 'full'}
  ]},

  {path: '', redirectTo: "home", pathMatch: 'full'},
  {path: '**', component: Page404Component}
];

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    FirstComponent,
    SecondComponent,
    ThirdComponent,
    VoteComponent,
    VotingComponent,
    AdminComponent,
    Page404Component,
    CandidatesComponent,
    VotesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
      ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }