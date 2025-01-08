import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { AllEventsComponent } from './pages/all-events/all-events.component';
import { MyBookingsComponent } from './pages/my-bookings/my-bookings.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SignupComponent } from './pages/sign-up/sign-up.component';
import { EventDetailsComponent } from './pages/event-details/event-details.component';
import { BookTicketComponent } from './pages/book-ticket/book-ticket.component';
import { UserDashboardComponent } from './pages/user-dashboard/user-dashboard.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    AllEventsComponent,
    MyBookingsComponent,
    SignupComponent,
    EventDetailsComponent,
    BookTicketComponent,
    UserDashboardComponent,
    DashboardComponent,


  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
