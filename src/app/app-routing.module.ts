import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SignupComponent } from './pages/sign-up/sign-up.component';
import { AllEventsComponent } from './pages/all-events/all-events.component';
import { MyBookingsComponent } from './pages/my-bookings/my-bookings.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { EventDetailsComponent } from './pages/event-details/event-details.component';
import { BookTicketComponent } from './pages/book-ticket/book-ticket.component';
import { UserDashboardComponent } from './pages/user-dashboard/user-dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'mybookings', component: MyBookingsComponent },
  { path: 'allevents', component: AllEventsComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'user', component: UserDashboardComponent },
  { path: 'event-details/:id', component: EventDetailsComponent },
  { path: 'bookTicket/:eventId', component: BookTicketComponent },
  { path: 'bookTicket', component: BookTicketComponent },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
