import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css'],
})
export class EventsComponent implements OnInit {
  @ViewChild('closeAddEventModal') closeSaveModal: ElementRef;
  errors: string[];
  events: [];
  event = {
    event_name: '',
    event_category: '',
    event_place: '',
    event_address: '',
    event_initial_date: '',
    event_final_date: '',
    event_type: '',
  };

  categories = {
    CONFERENCE: 'Conferencia',
    CONGRESS: 'Congreso',
    SEMINAR: 'Seminario',
    COURSE: 'Curso',
  };

  types = {
    PRESENCIAL: 'Presencial',
    VIRTUAL: 'Virtual',
  };

  constructor(private api: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.initEvent();
    this.getEvents();
  }

  initEvent() {
    for (const key in this.event) {
      this.event[key] = '';
    }
  }

  getEvents() {
    this.api.getEvents().subscribe(
      (response: any) => {
        console.log(response);
        this.events = response;
      },
      (err) => {
        console.log(err);
        if (err.status === 401) {
          this.router.navigate(['/iniciar-sesion']);
        }
      }
    );
  }

  saveEvent() {
    this.errors = [];
    this.api.saveEvent(this.event).subscribe(
      (response: any) => {
        console.log(response);
        this.closeSaveModal.nativeElement.click();
        this.initEvent();
        this.getEvents();
      },
      (err) => {
        console.log(err);
        if (err.status === 401) {
          this.router.navigate(['/iniciar-sesion']);
        }
        this.errors = err.error;
      }
    );
  }
}
