import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css'],
})
export class EventDetailsComponent {
  eventId: any = {};
  eventDetails: EventDetails | null = null;
  relatedEvents: EventDetails[] = []; // Store related events

  constructor(private activateRoute: ActivatedRoute, private http: HttpClient) {
    this.activateRoute.params.subscribe((res) => {
      this.eventId = res;
      this.getEventDetails();
    });
  }

  // Fetch main event details
  getEventDetails() {
    this.http
      .get(
        `https://freeapi.miniprojectideas.com/api/EventBooking/GetEventById?id=${this.eventId.id}`
      )
      .subscribe(
        (res: any) => {
          if (res.result === true) {
            this.eventDetails = res.data;

          } else {
            alert('Failed to fetch event details');
          }
        },
        (error) => {
          console.error('Error fetching event details:', error);
          alert('An error occurred while fetching event details');
        }
      );
  }

  // Fetch related events by the same organizer
  getRelatedEvents(id: any) {
    this.http.get("https://freeapi.miniprojectideas.com/api/EventBooking/GetEventsByOrganizer?organizerId=" + id).subscribe(
      (res: any) => {
        if (res.result === true) {
          this.relatedEvents = res.data; // Store the related events
        } else {
          alert('Failed to fetch related events');
        }
      },
      (error) => {
        console.error('Error fetching related events:', error);
        alert('An error occurred while fetching related events');
      }
    );
  }
}

export interface EventDetails {
  eventId: number;
  eventName: string;
  startDate: string;
  startTime: string;
  endDate: string;
  organizerId: string;
  userId: number;
  price: number;
  location: string;
  imageUrl: string;
}
