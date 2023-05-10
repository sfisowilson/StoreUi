import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from 'src/app/models/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private _router: Router, private _http: HttpClient) { }

  login(credentials : Login) {
    return this._http.post("https://localhost:7086/api/auth/login", credentials);
  }
}
