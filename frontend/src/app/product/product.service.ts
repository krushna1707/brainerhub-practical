import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpServices } from '../http.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpService: HttpServices) { }
  
  get(url: string): Observable<any>{
    return this.httpService.get(url)
  }

  add(url: string, formData: any): Observable<any>{
    return this.httpService.post(url, formData)
  }

  update(url: string, formData: any): Observable<any>{
    return this.httpService.update(url, formData)
  }

  delete(url: string): Observable<any> {
    return this.httpService.delete(url)
  }
  
}
