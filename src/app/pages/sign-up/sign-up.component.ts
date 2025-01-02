import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignupComponent {
  signupObj = {
    UserId: 0,
    name: '',
    email: '',
    password: '',
    ContactNo: '',
    Role: '',
  };

  constructor(private http: HttpClient, private router: Router) {
    this.signupObj = new Signup();
  }

  onSignup() {
    this.http
      .post(
        'https://freeapi.miniprojectideas.com/api/EventBooking/CreateUser',
        this.signupObj
      )
      .subscribe((res: any) => {
        if (res.result) {
          alert('Signup Successful');
          this.router.navigateByUrl('login');
        } else {
          alert(res.message);
        }
      });
  }
}

export class Signup {
  UserId!: number;
  name!: string;
  email!: string;
  password!: string;
  ContactNo!: string;
  Role!: string;

  constructor() {
    this.UserId = 0;
    this.name = '';
    this.email = '';
    this.password = '';
    this.ContactNo = '';
    this.Role = '';
  }
}
