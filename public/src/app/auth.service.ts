import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    // private _registerUrl('')

  constructor(private http: HttpClient) { }

  registerUser(user){
      return this.http.post<any>('/register', user);
  }
  loginUser(user){
      return this.http.post<any>('/login', user);
  }
  loggedIn(){
      console.log('at Logged in');
      return !!localStorage.getItem('token');
  }

  getToken(){
      console.log("Here at get token", localStorage.getItem('token'));
      return localStorage.getItem('token');
  }
}
