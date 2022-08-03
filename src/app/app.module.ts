import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './voters/register/register.component';
import { LandingComponent } from './Administrators/auth/landing.component';
import { ReactiveFormsModule } from '@angular/forms';

import { RouterModule, Routes } from '@angular/router';
import { VoteComponent } from './voters/vote/vote.component';
import { VotingComponent } from './voters/voting/voting.component';
import { AdminComponent } from './Administrators/admin/admin.component';
import { Page404Component } from './page404/page404.component';
import { CandidatesComponent } from './Administrators/candidates/candidates.component';
import { VotesComponent } from './Administrators/votes/votes.component';
import { VotingsComponent } from './Administrators/votings/votings.component';
import { OngoingvotingComponent } from './voters/ongoingvoting/ongoingvoting.component';
import { AuthenticatevoterComponent } from './voters/authenticatevoter/authenticatevoter.component';
import { VotersComponent } from './Administrators/voters/voters.component';
import { SuccessComponent } from './voters/success/success.component';
import { ErrorComponent } from './voters/error/error.component';


const routes: Routes = [
  //{ path: 'home', component: LandingComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'vote', component: VoteComponent},
  { path: 'votepage', component: VotingComponent},
  { path: 'events', component: OngoingvotingComponent},
  { path: 'auth', component: AuthenticatevoterComponent },
  { path: 'success', component: SuccessComponent },
  { path: 'error', component: ErrorComponent },

  { path: 'admin', component: AdminComponent,
  children:[
  {path: "votings", component: VotingsComponent},
  { path: 'auth', component: LandingComponent},
  { path: 'auth/verifyuser/:token', component: LandingComponent },
  {path: 'auth/login', component: LandingComponent},
  {path: 'auth/register', component: LandingComponent},
  {path: 'auth/forgetPassword', component: LandingComponent},
  {path: 'auth/forgetPassword/r/:token', component: LandingComponent},
  {path: "candidates", component: CandidatesComponent },
  {path: "votes", component: VotesComponent},
  { path: "voters", component: VotersComponent },
   {path: '', redirectTo: "votings", pathMatch: 'full'}
  ]},

  {path: '', redirectTo: "events", pathMatch: 'full'},
  {path: '**', component: Page404Component}
];

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LandingComponent,
    VoteComponent,
    VotingComponent,
    AdminComponent,
    Page404Component,
    CandidatesComponent,
    VotesComponent,
    VotingsComponent,
    OngoingvotingComponent,
    AuthenticatevoterComponent,
    VotersComponent,
    SuccessComponent,
    ErrorComponent
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