import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  user: any;
  errors: string[];

  constructor(private api: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.user = {
      username: '',
      password: '',
    };
  }

  login() {
    this.errors = [];
    this.api.login(this.user).subscribe(
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
