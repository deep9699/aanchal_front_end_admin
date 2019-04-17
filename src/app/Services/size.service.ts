import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { size } from '../classes/size_class';
import { url } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SizeService {

  private url=url.endPoints+'size/';
  private delete_size=url.endPoints+'size_delete/';
  constructor(private _http:HttpClient) { }
  getAllSize(){
    return this._http.get(this.url);
  }
  getSizeById(id)
  {
    return this._http.get(this.url+id);
  }
  addSize(item)
  {
    let _abc=new HttpHeaders().set('Content-Type','application/json');
    let body=JSON.stringify(item);
    return this._http.post(this.url,body,{headers:_abc});
  }
  deleteSize(item)
  {
    return this._http.delete(this.url+item.Size_id);
  }
  deleteAll(item:size[])
  {
    let _abc=new HttpHeaders().set('Content-Type','application/json');
    let body=JSON.stringify(item);
    return this._http.post(this.delete_size,body,{headers:_abc});
  }
  updatesize(item:size)
  {
    let _abc=new HttpHeaders().set('Content-Type','application/json');
    let body=JSON.stringify(item);
    return this._http.put(this.url,body,{headers:_abc});
  }


}
