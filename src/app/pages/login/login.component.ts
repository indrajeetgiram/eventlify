import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef } from '@angular/core';  // Import ChangeDetectorRef

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginobj: Login = new Login();

  constructor(private http: HttpClient, private router: Router, private cdRef: ChangeDetectorRef) { }  // Inject ChangeDetectorRef

  onLogin() {
    if (!this.loginobj.Role) {
      alert('Please select a role.');
      return;
    }

    this.http
      .post('https://freeapi.miniprojectideas.com/api/EventBooking/Login', this.loginobj)
      .subscribe((res: any) => {
        if (res.result) {
          // Store user info and update login status
          localStorage.setItem('custId', this.loginobj.ContactNo);
          localStorage.setItem('isLoggedIn', 'true');
          alert('Login Successful');

          // Trigger change detection after login
          this.cdRef.detectChanges();  // Manually trigger change detection

          // Redirect based on role
          if (this.loginobj.Role === 'Organiser') {
            this.router.navigateByUrl('dashboard');
          } else if (this.loginobj.Role === 'Customer') {
            this.router.navigateByUrl('bookTicket');
          }
        } else {
          alert(res.message);
        }
      });
  }
}

export class Login {
  Password!: string;
  ContactNo!: string;
  Role!: string;

  constructor() {
    this.Password = '';
    this.ContactNo = '';
    this.Role = '';
  }
}
