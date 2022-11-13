import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpServices } from './http.service';
@Injectable({
    providedIn: 'root',
})
export class AuthService {

  constructor(private httpService: HttpServices) { }

  login(user: {username: string, password: string}){
    return this.httpService.post('auth/login', user);
  }

  loggedIn(){
    return !!localStorage.getItem('token');
  }

  getToken(){
    return localStorage.getItem('token');
  }

}