import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css'],
})
export class EventsComponent implements OnInit {
  constructor(private api: ApiService, private router: Router) {}

  events: [];

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

  ngOnInit(): void {
    this.getEvents();
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
}
