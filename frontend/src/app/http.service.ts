import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HttpServices {

  baseUrl: string = environment.baseUrl;
  constructor(private http: HttpClient) { }

  get(url: string, body?: any): Observable<any> {
    return this.http.get<Observable<any>>(this.baseUrl + url, body);
  }

  post(url: string, body?: any): Observable<any> {
    return this.http.post<Observable<any>>(this.baseUrl + url, body);
  }

  update(url: string, body?: any): Observable<any> {
    return this.http.put<Observable<any>>(this.baseUrl + url, body);
  }

  delete(url: string, body?: any): Observable<any> {
    return this.http.delete<Observable<any>>(this.baseUrl + url, { body: body });
  }
}