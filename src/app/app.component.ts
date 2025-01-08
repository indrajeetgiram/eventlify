import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  isLoggedIn: boolean = false;

  ngOnInit() {
    // Check if the user is logged in using localStorage
    this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  }

  logout() {
    // Remove user info and set isLoggedIn to false in localStorage
    localStorage.removeItem('custId');
    localStorage.setItem('isLoggedIn', 'false');
    this.isLoggedIn = false;
  }
}
