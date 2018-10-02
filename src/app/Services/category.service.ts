import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private url='http://localhost:3000/category/';
  constructor(private _http:HttpClient) { }
  getAllCategory(){
    return this._http.get(this.url);
  }


}
