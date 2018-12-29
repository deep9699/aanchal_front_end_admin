import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  private url='http://localhost:3000/color/';
  constructor(private _http:HttpClient) { }
  getAllColor(){
    return this._http.get(this.url);
  }
  getColorById(id)
  {
    return this._http.get(this.url+id);
  }

}
