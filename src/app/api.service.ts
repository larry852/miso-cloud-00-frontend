import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private SERVER_URL = 'http://localhost:8080/api';

  private httpOptions: any;

  constructor(private httpClient: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
  }

  public login(data) {
    return this.httpClient.post(
      this.SERVER_URL + '/api-auth/',
      JSON.stringify(data),
      this.httpOptions
    );
  }
}
