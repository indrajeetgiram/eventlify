import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-events',
  templateUrl: './all-events.component.html',
  styleUrls: ['./all-events.component.css'], // Fixed typo here (styleUrl -> styleUrls)
})
export class AllEventsComponent implements OnInit {
  events: any[] = []; // Array to store the event data
  sliderImages: string[] = [
    'assets/images/slider1.jpg',
    'assets/images/slider2.jpg',
    'assets/images/slider3.jpg',
    'assets/images/slider4.jpg', // Add as many images as needed
  ];
  currentSlide: number = 0;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.fetchEvents();
  }

  // Fetch events from the API
  fetchEvents() {
    this.http
      .get('https://freeapi.miniprojectideas.com/api/EventBooking/GetAllEvents')
      .subscribe(
        (response: any) => {
          if (response && response.data && response.data.length) {
            this.events = response.data;
          } else {
            console.error('No events found or invalid response structure');
          }
        },
        (error) => {
          console.error('Error fetching events:', error);
        }
      );
  }

  // Navigate to the event details page
  router = inject(Router);
  goEventDetailpage(id: any) {
    this.router.navigateByUrl('/event-details/' + id);
  }

  // Slider: Go to the previous slide
  prevSlide() {
    this.currentSlide =
      this.currentSlide === 0 ? this.sliderImages.length - 1 : this.currentSlide - 1;
  }

  // Slider: Go to the next slide
  nextSlide() {
    this.currentSlide =
      this.currentSlide === this.sliderImages.length - 1 ? 0 : this.currentSlide + 1;
  }
}
