import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginobj: Login;

  constructor(private http: HttpClient, private router: Router) {
    this.loginobj = new Login();
  }

  onLogin() {
    this.http
      .post(
        'https://freeapi.miniprojectideas.com/api/EventBooking/Login',
        this.loginobj
      )
      .subscribe((res: any) => {
        if (res.result) {
          alert('Login Successful');
          this.router.navigateByUrl('dashboard');
        } else {
          alert(res.message);
        }
      });
  }
}

export class Login {
  Password!: string;
  ContactNo!: string;

  constructor() {
    this.Password = '';
    this.ContactNo = '';
  }
}
