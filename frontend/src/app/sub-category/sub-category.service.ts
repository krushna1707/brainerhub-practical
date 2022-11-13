import { Injectable } from '@angular/core';
import { HttpServices } from '../http.service';

@Injectable({
  providedIn: 'root'
})
export class SubCategoryService {

  constructor(private httpService: HttpServices,) { 

  }

  categoryList(){
    return this.httpService.get('category/list');
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
