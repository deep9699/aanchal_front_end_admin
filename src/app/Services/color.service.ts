import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { size } from '../classes/size_class';
import { color } from '../classes/color_class';
import { url } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
url1=url.endPoints+'color/';
  private url=url.endPoints+'color/';
  private delete_color=url.endPoints+'color_delete/';
  constructor(private _http:HttpClient) { }
  getAllColor(){
    return this._http.get(this.url);
  }
  getColorById(id)
  {
    return this._http.get(this.url+id);
  }
  addColor(item)
  {
    let _abc=new HttpHeaders().set('Content-Type','application/json');
    let body=JSON.stringify(item);
    return this._http.post(this.url,body,{headers:_abc});
  }
  deleteColor(item)
  {
    return this._http.delete(this.url+item.Color_id);
  }
  deleteAll(item:color[])
  {
    let _abc=new HttpHeaders().set('Content-Type','application/json');
    let body=JSON.stringify(item);
    return this._http.post(this.delete_color,body,{headers:_abc});
  }
  updatecolor(item:color)
  {
    let _abc=new HttpHeaders().set('Content-Type','application/json');
    let body=JSON.stringify(item);
    return this._http.put(this.url,body,{headers:_abc});
  }



}
