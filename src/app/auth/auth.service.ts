import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user.model';
import {  BehaviorSubject,  } from 'rxjs';
import { tap} from 'rxjs/operators';

export interface AuthDataResponse {
  idToken : string,
  email : string,
  refreshToken : string,
  expiresIn : string,
  localId : string,
  registered?: boolean
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user = new BehaviorSubject<User>(null);

  authToken:string = null;
  constructor(private http:HttpClient) {

  }
  signup(email:string, password:string) {
    return this.http.post<AuthDataResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDJUVaTqSqt0f5ivXWcsQXhJHUO3vgORHk', {
      email:email,
      password: password,
      returnSecureToken : true
    }).pipe(tap(resData => {
      this.handleAuth(resData.email, resData.localId, resData.idToken, resData.expiresIn);
    }));
  }


  login(email:string, password:string) {
  
    return this.http.post<AuthDataResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDJUVaTqSqt0f5ivXWcsQXhJHUO3vgORHk', {
      email:email,
      password: password,
      returnSecureToken : true
    }).pipe(tap(resData => {
      this.handleAuth(resData.email, resData.localId, resData.idToken, resData.expiresIn);
    }));
  }


  private handleAuth(email:string, id:string, idToken:string, expDate:string) {
    const expirationDate = new Date(new Date().getTime() + +expDate*1000);
    const user = new User(email, id, idToken, expirationDate);
    this.authToken = idToken;
    this.user.next(user);
  }
}