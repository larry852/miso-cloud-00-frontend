import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  user: any;
  error: string;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.user = {
      username: '',
      password: '',
    };
  }

  login() {
    this.error = '';
    this.api
      .login({
        username: this.user.username,
        password: this.user.password,
      })
      .subscribe(
        (response: any) => {
          console.log(response);
          sessionStorage.setItem('token', response.token);
          sessionStorage.setItem('user', JSON.stringify(response.user));
        },
        (err) => {
          console.log(err.error);
          for (const key in err.error) {
            this.error += err.error[key];
          }
        }
      );
  }
}
