import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

const apiURL = environment.apiUrl + 'dwh';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class DwhService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get(apiURL, httpOptions);
  }
}
