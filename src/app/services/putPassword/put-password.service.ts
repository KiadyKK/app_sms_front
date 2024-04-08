import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { PutPassword } from '../../models/putPassword/putPassword';
import { Observable } from 'rxjs';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};
@Injectable({
  providedIn: 'root'
})
export class PutPasswordService {
  constructor(private http: HttpClient) { }
  private apiUrl = environment.apiUrl + '/user/putMdp';
  putPassword(data: PutPassword): Observable<any> {
    return this.http.put(this.apiUrl, data, httpOptions)
  }
}
