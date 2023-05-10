import { Component } from '@angular/core';
import { LoginService } from './login.service';
import { Login } from 'src/app/models/login';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  credentials: Login;
  isSubmitted = false;

  constructor(private _loginService: LoginService, private _router: Router) {
    this.credentials = { email: "", password: ""};
  }


  onSubmit(){
    this._loginService.login(this.credentials).subscribe(res => {
      const token = (<any>res).token;
      localStorage.setItem('token', token);
      this._router.navigate(['dashboard']);
    })
  }

}
