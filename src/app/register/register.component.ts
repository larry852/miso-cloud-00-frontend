import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  user: any;
  errors: string[];

  constructor(private api: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.user = {
      username: '',
      password1: '',
      first_name: '',
      last_name: '',
      email: '',
    };
  }

  register() {
    this.errors = [];
    this.api.register(this.user).subscribe(
      (response: any) => {
        sessionStorage.setItem('token', response.token);
        sessionStorage.setItem('user', JSON.stringify(response.user));
        this.router.navigate(['/eventos']);
      },
      (err) => {
        console.log(err.error);
        this.errors = err.error;
      }
    );
  }
}
