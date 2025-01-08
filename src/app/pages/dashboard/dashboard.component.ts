import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  events: any[] = [];
  newEvent: any = {};
  selectedEvent: any = null; // Track event being edited

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.initializeNewEvent();
    this.getAllEvents();
  }

  initializeNewEvent(): void {
    this.newEvent = {
      EventId: 0,
      EventName: '',
      Description: '',
      Location: '',
      StartDate: '',
      StartTime: '',
      EndDate: '',
      EndTime: '',
      ImageUrl: '',
      Capacity: '',
      Price: 0,
      OrganizerId: 0,
      IsIdentityMandatory: true,
      IsCoupleEntryMandatory: true
    };
  }

  getAllEvents(): void {
    this.http.get('https://freeapi.miniprojectideas.com/api/EventBooking/GetAllEvents')
      .subscribe(
        (response: any) => {
          if (response.result) {
            this.events = response.data || [];
          }
        },
        error => {
          console.error('Error fetching events:', error);
        }
      );
  }

  createEvent(): void {
    if (this.validateEvent(this.newEvent)) {
      this.http.post('https://freeapi.miniprojectideas.com/api/EventBooking/CreateEvent', this.newEvent)
        .subscribe(
          (response: any) => {
            if (response.result) {
              alert('Event created successfully!');
              this.getAllEvents();
              this.initializeNewEvent();
            } else {
              alert('Failed to create event');
            }
          },
          error => {
            console.error('Error creating event:', error);
            alert('An error occurred while creating the event');
          }
        );
    } else {
      alert('Please fill in all fields.');
    }
  }

  // Validate event before submission, including the new fields
  validateEvent(event: any): boolean {
    const requiredFields = ['EventName', 'Description', 'Location', 'StartDate', 'EndDate', 'StartTime', 'EndTime', 'ImageUrl', 'Capacity', 'Price'];
    for (const field of requiredFields) {
      if (!event[field] || event[field].trim() === '') {
        return false;
      }
    }
    return true;
  }

  // Edit an event (opens for editing)
  editEvent(event: any): void {
    this.selectedEvent = { ...event }; // Copy event data for editing
  }

  // Save edited event
  saveEvent(event: any): void {
    this.http.post('https://freeapi.miniprojectideas.com/api/EventBooking/UpdateEvent', event)
      .subscribe(
        (response: any) => {
          if (response.result) {
            alert('Event updated successfully!');
            this.getAllEvents();
            this.selectedEvent = null; // Close the edit form
          } else {
            alert('Failed to update event');
          }
        },
        error => {
          console.error('Error updating event:', error);
          alert('An error occurred while updating the event');
        }
      );
  }

  // Delete an event
  deleteEvent(eventId: number): void {
    if (confirm('Are you sure you want to delete this event?')) {
      this.http.get(`https://freeapi.miniprojectideas.com/api/EventBooking/DeleteEventById?id=${eventId}`)
        .subscribe(
          (response: any) => {
            if (response.result) {
              alert('Event deleted successfully!');
              this.getAllEvents();
            } else {
              alert('Failed to delete event');
            }
          },
          error => {
            console.error('Error deleting event:', error);
            alert('An error occurred while deleting the event');
          }
        );
    }
  }
}
