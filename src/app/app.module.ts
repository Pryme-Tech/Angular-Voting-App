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
import { AdminComponent } from './page/admin/admin.component';


const routes: Routes = [
  { path: 'form', component: FirstComponent },
  { path: 'test', component: SecondComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'vote', component: VoteComponent},
  { path: 'votepage', component: VotingComponent},
  { path: 'admin', component: AdminComponent}
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
    AdminComponent
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