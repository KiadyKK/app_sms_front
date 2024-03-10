import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user/user.model';
import { environment } from 'src/environments/environment.development';

const apiURL = environment.apiUrl + 'user';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  addUser(data: any): Observable<any> {
    return this.http.post(apiURL + '/new', data, httpOptions);
  }

  getAll(nom: string): Observable<any> {
    return this.http.get(apiURL + `?nom=${nom}`, httpOptions);
  }

  remove(id: number): Observable<any> {
    return this.http.delete(apiURL + `/${id}`, httpOptions);
  }
}
