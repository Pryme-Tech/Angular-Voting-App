import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './voters/register/register.component';
import { AuthComponent } from './auth/auth.component';
import { ReactiveFormsModule } from '@angular/forms';

import { RouterModule, Routes } from '@angular/router';
import { VoteComponent } from './voters/vote/vote.component';
import { VotingComponent } from './voters/voting/voting.component';
import { AdminComponent } from './Dashboard/admin/admin.component';
import { Page404Component } from './page404/page404.component';
import { CandidatesComponent } from './Dashboard/candidates/candidates.component';
import { VotesComponent } from './Dashboard/votes/votes.component';
import { ElectionsComponent } from './Dashboard/elections/elections.component';
import { OngoingvotingComponent } from './voters/ongoingvoting/ongoingvoting.component';
import { AuthenticatevoterComponent } from './voters/authenticatevoter/authenticatevoter.component';
import { VotersComponent } from './Dashboard/voters/voters.component';
import { SuccessComponent } from './voters/success/success.component';
import { ErrorComponent } from './voters/error/error.component';
import { landingpageComponent } from './Landingpage/landingpage.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomepageComponent } from './homepage/homepage.component';
import { NgxDropzoneModule } from 'ngx-dropzone';



const routes: Routes = [
  { path: 'home', component: HomepageComponent},
  // { path: 'register', component: RegisterComponent},
  { path: 'access-election/:token', component: AuthenticatevoterComponent},
  { path: 'vote/:token', component: VotingComponent},
  { path: 'votepage', component: VotingComponent},
  { path: 'events', component: OngoingvotingComponent},
  { path: 'auth', component: AuthenticatevoterComponent },
  { path: 'success', component: SuccessComponent },
  { path: 'error', component: ErrorComponent },
  { path: 'register', component: AuthComponent},
  { path: 'login', component: AuthComponent},

  { path: 'vote', component: VotingComponent },
  { path: 'voters', component: VotersComponent },
  { path: 'results', component: VotesComponent },

  { path: 'candidates', component: CandidatesComponent },

  { path: 'elections', component: ElectionsComponent },

  // { path: 'admin', component: AdminComponent,
  // children:[
  // {path: "votings", component: VotingsComponent},
  // // { path: 'auth', component: LandingComponent},
  // // { path: 'auth/verifyuser/:token', component: LandingComponent },
  // // {path: 'auth/login', component: LandingComponent},
  // // {path: 'auth/register', component: LandingComponent},
  // // {path: 'auth/forgetPassword', component: LandingComponent},
  // // {path: 'auth/forgetPassword/r/:token', component: LandingComponent},
  // {path: "candidates", component: CandidatesComponent },
  // {path: "votes", component: VotesComponent},
  // { path: "voters", component: VotersComponent },
  //  {path: '', redirectTo: "votings", pathMatch: 'full'}
  // ]},

  // {path: 'home', component: landingpageComponent },
  {path: '', component: HomepageComponent },
  {path: '**', component: Page404Component}
];

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    AuthComponent,
    VoteComponent,
    VotingComponent,
    AdminComponent,
    Page404Component,
    CandidatesComponent,
    VotesComponent,
    ElectionsComponent,
    OngoingvotingComponent,
    AuthenticatevoterComponent,
    VotersComponent,
    SuccessComponent,
    ErrorComponent,
    // PricingComponent,
    landingpageComponent,
    HomepageComponent
  ],
  imports: [
  // FusionChartsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    NgxDropzoneModule,
    RouterModule.forRoot(routes)
      ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }