import { Injectable } from '@angular/core';
import { HttpServices } from '../http.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpService: HttpServices,) { 

  }

  add(url: string, data: object){
    return this.httpService.post(url, data);
  }

  update(url: string, data: object){
    return this.httpService.update(url, data);
  }

  delete(url: string){
    return this.httpService.delete(url);
  }
}
