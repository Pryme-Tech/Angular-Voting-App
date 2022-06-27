import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './page/register/register.component';
import { FirstComponent } from './first/first.component';
import { LandingComponent } from './Administrator/landing/landing.component';
import { ReactiveFormsModule } from '@angular/forms';

import { RouterModule, Routes } from '@angular/router';
import { VoteComponent } from './page/vote/vote.component';
import { VotingComponent } from './page/voting/voting.component';
import { AdminComponent } from './Administrator/admin/admin.component';
import { Page404Component } from './page404/page404.component';
import { CandidatesComponent } from './Administrator/candidates/candidates.component';
import { VotesComponent } from './Administrator/votes/votes.component';
import { VotingsComponent } from './Administrator/votings/votings.component';
import { OngoingvotingComponent } from './page/ongoingvoting/ongoingvoting.component';


const routes: Routes = [
  { path: 'form', component: FirstComponent },
  //{ path: 'home', component: LandingComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'vote', component: VoteComponent},
  { path: 'votepage', component: VotingComponent},
  { path: 'home', component: OngoingvotingComponent},

  { path: 'admin', component: AdminComponent,
  children:[
  {path: "votings", component: VotingsComponent},
  { path: 'auth', component: LandingComponent},
  {path: "candidates", component: CandidatesComponent },
  {path: "votes", component: VotesComponent},
   {path: '', redirectTo: "votings", pathMatch: 'full'}
  ]},

  {path: '', redirectTo: "home", pathMatch: 'full'},
  {path: '**', component: Page404Component}
];

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    FirstComponent,
    LandingComponent,
    VoteComponent,
    VotingComponent,
    AdminComponent,
    Page404Component,
    CandidatesComponent,
    VotesComponent,
    VotingsComponent,
    OngoingvotingComponent
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