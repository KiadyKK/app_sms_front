import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

const apiURL = environment.apiUrl + 'rdz';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class RdzService {
  constructor(private http: HttpClient) {}

  addRdz(data: any): Observable<any> {
    return this.http.post(apiURL, data, httpOptions);
  }

  getAll(nom: string): Observable<any> {
    return this.http.get(apiURL + `?nom=${nom}`, httpOptions);
  }

  remove(id: number): Observable<any> {
    return this.http.delete(apiURL + `/${id}`, httpOptions);
  }
}
