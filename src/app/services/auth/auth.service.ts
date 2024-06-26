import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from 'src/app/models/login/login.model';
import { environment } from 'src/environments/environment.development';

const apiURL = environment.apiUrl + 'user/';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    skip: 'true',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(data: Login): Observable<any> {
    return this.http.post(apiURL + 'login', data, httpOptions);
  }
}
