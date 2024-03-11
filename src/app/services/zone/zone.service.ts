import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user/user.model';
import { environment } from 'src/environments/environment.development';

const apiURL = environment.apiUrl + 'zone';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class ZoneService {
  constructor(private http: HttpClient) {}

  getAll(name: string): Observable<any> {
    return this.http.get(apiURL + `?name=${name}`, httpOptions);
  }

  // remove(id: number): Observable<any> {
  //   return this.http.delete(apiURL + `/${id}`, httpOptions);
  // }
}
