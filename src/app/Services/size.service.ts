import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { size } from '../classes/size_class';

@Injectable({
  providedIn: 'root'
})
export class SizeService {

  private url='http://localhost:3000/size/';
  private delete_size='http://localhost:3000/size_delete/';
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
