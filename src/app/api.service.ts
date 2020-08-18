import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private SERVER_URL = 'http://localhost:8080/api';

  private httpOptions: any;
  private authHttpOptions: any;

  constructor(private httpClient: HttpClient) {
    this.authHttpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
  }

  public login(data) {
    return this.httpClient.post(
      this.SERVER_URL + '/api-auth/',
      JSON.stringify(data),
      this.authHttpOptions
    );
  }

  public register(data) {
    return this.httpClient.post(
      this.SERVER_URL + '/create-user/',
      JSON.stringify(data),
      this.authHttpOptions
    );
  }

  public getEvents() {
    let token = sessionStorage.getItem('token');
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Token ' + token,
      }),
    };
    return this.httpClient.get(this.SERVER_URL + '/events/', this.httpOptions);
  }
}
