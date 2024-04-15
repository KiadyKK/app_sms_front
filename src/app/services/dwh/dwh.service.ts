import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

const apiURL = environment.apiUrl + 'kpi';

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

  getAll(date: string): Observable<any> {
    return this.http.get(apiURL + `?date=${date}`, httpOptions);
  }

  getAllDwh(date: string): Observable<any> {
    return this.http.get(apiURL + `/dwh?date=${date}`, httpOptions);
  }

  sendSms(date: string): Observable<any> {
    return this.http.get(apiURL + `/send?date=${date}`, httpOptions);
  }

  getAllZone(): Observable<any> {
    return this.http.get(apiURL + '/zone', httpOptions);
  }

  getHistoric(date: string): Observable<any> {
    return this.http.get(apiURL + `/historic?date=${date}`, httpOptions);
  }
}
