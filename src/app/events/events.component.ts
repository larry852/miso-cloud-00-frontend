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
  @ViewChild('closeEditEventModal') closeEditModal: ElementRef;
  @ViewChild('closeDeleteEventModal') closeDeleteModal: ElementRef;
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
    this.errors = null;
    this.getEvents();
  }

  getEvents() {
    this.api.getEvents().subscribe(
      (response: any) => {
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
    this.errors = null;
    this.api.saveEvent(this.event).subscribe(
      (response: any) => {
        this.getEvents();
        this.closeSaveModal.nativeElement.click();
        this.initEvent();
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

  loadEvent(event) {
    this.errors = null;
    delete event.thumbnail;
    this.event = event;
  }

  updateEvent() {
    this.errors = null;
    this.api.updateEvent(this.event).subscribe(
      (response: any) => {
        this.getEvents();
        this.closeEditModal.nativeElement.click();
        this.initEvent();
      },
      (err) => {
        console.log(err);
        if (err.status === 401) {
          this.router.navigate(['/iniciar-sesion']);
        }
        this.errors = err.error;
        this.getEvents();
      }
    );
  }

  deleteEvent() {
    this.errors = null;
    this.api.deleteEvent(this.event).subscribe(
      (response: any) => {
        this.getEvents();
        this.closeDeleteModal.nativeElement.click();
        this.initEvent();
      },
      (err) => {
        console.log(err);
        if (err.status === 401) {
          this.router.navigate(['/iniciar-sesion']);
        }
      }
    );
  }

  logout() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    this.router.navigate(['/iniciar-sesion']);
  }
}
