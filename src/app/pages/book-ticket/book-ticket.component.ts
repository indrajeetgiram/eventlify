import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-book-ticket',
  templateUrl: './book-ticket.component.html',
  styleUrls: ['./book-ticket.component.css'],
})
export class BookTicketComponent implements OnInit {
  ticketForm!: FormGroup;
  submittedData: any[] = [];
  apiUrl = 'https://freeapi.miniprojectideas.com/api/EventBooking/BookEvent';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.ticketForm = this.fb.group({
      UserId: [0],
      NoOfTickets: [0],
      EventBookingMembers: this.fb.array([]),
    });


    this.activatedRoute.queryParams.subscribe((params) => {
      if (params['eventId']) {
        this.ticketForm.addControl('EventId', this.fb.control(params['eventId']));
        this.loadBookingData();
      }
    });
  }


  loadBookingData() {
    const eventId = this.ticketForm.get('EventId')?.value;
    this.http.get<any>(`${this.apiUrl}?eventId=${eventId}`).subscribe(
      (response) => {
        if (response.result) {
          this.ticketForm.patchValue(response.data);
          const members = this.ticketForm.get('EventBookingMembers') as FormArray;
          response.data.EventBookingMembers.forEach((member: any) => {
            members.push(this.createMemberForm(member));
          });
        }
      },
      (error) => {
        console.error('Error loading booking data:', error);
      }
    );
  }


  createMemberForm(member: any = {}) {
    return this.fb.group({
      BookingMemberId: [member.BookingMemberId || 0],
      Name: [member.Name || ''],
      Age: [member.Age || 0],
      IdentityCard: [member.IdentityCard || ''],
      CardNo: [member.CardNo || ''],
      ContactNo: [member.ContactNo || ''],
    });
  }


  addMember() {
    const members = this.ticketForm.get('EventBookingMembers') as FormArray;
    members.push(this.createMemberForm());
  }


  removeMember(index: number) {
    const members = this.ticketForm.get('EventBookingMembers') as FormArray;
    members.removeAt(index);
  }

  submitForm() {
    const formValue = { ...this.ticketForm.value };
    this.submittedData.push(formValue);
    this.ticketForm.reset();
    (this.ticketForm.get('EventBookingMembers') as FormArray).clear();
  }

  get members() {
    return this.ticketForm.get('EventBookingMembers') as FormArray;
  }

  deleteRecord(index: number) {
    this.submittedData.splice(index, 1);
  }
}
