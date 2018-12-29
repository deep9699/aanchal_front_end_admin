import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { stock } from '../classes/stock_class';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  private url:string='http://localhost:3000/stock/';
  constructor(private _http:HttpClient) { }

  addStock(item:stock){
    console.log("xyz");
    let body=JSON.stringify(item);
    let head1=new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.url,body,{headers:head1});
  }
  getSupplierId(id)
  {
    return this._http.get(this.url+id);
  }
}
