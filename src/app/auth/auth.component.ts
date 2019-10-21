import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthDataResponse } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {


  isLogginMode = true;
  isLoading = false;
  onSwitchMode() {
    this.isLogginMode = !this.isLogginMode;
  }


  constructor(private authService: AuthService, private router:Router) { }

  ngOnInit() {
  }

  onSubmit(form:NgForm) {
    this.isLoading = true;
    const email = form.value.email;
    const password = form.value.password;
    let authObs : Observable<AuthDataResponse>;
    if(this.isLogginMode) {
         authObs =  this.authService.login(email,password);
    } else {
     authObs =  this.authService.signup(email, password);
      } 

      authObs.subscribe( authResponse =>  {
        this.router.navigate(['/recipes']);
        this.isLoading = false;
        console.log(authResponse)}, error => {
          console.log(error);
          this.isLoading = false;
        });

      form.reset();
    }



  

}
