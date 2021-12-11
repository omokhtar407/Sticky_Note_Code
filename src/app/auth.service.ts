
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData = new BehaviorSubject(null);
  constructor(private _HttpClient:HttpClient , private _Router:Router) {
    if(localStorage.getItem('userToken') != null){
      this.saveUserData();
    }
  }
  saveUserData(){
    let encodedUserData = JSON.stringify(localStorage.getItem('userToken'));
    this.userData.next(jwtDecode(encodedUserData));
  }

  signUp(formData:object):Observable<any>
  {
    return  this._HttpClient.post(`https://routeegypt.herokuapp.com/signup`,formData)
  }

  signIn(formData:object):Observable<any>
  {
    return  this._HttpClient.post(`https://routeegypt.herokuapp.com/signin`,formData)
  }

  logout(){
    localStorage.removeItem('userToken');
    this.userData.next(null);
    this._Router.navigate(['signin']);
  }

  isLoggedin(){
    return !!localStorage.getItem('userToken');
  }
}
