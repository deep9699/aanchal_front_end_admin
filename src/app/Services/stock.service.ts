import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { stock } from '../classes/stock_class';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  private url:string='http://localhost:3000/stock/';
  private stock_id:string='http://localhost:3000/stock_id/';
  private stock_url:string='http://localhost:3000/stock_details/';
  private sizeBycolor_url:string='http://localhost:3000/sizebycolor/'
  constructor(private _http:HttpClient) { }



  getAllStock()
  {
      return this._http.get(this.url);
  }
  addStock(item:stock){
    console.log("xyz");
    let body=JSON.stringify(item);
    let head1=new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.url,body,{headers:head1});
  }
  getStockById(id:number)
  {
    return this._http.get(this.url+id);
  }

  addExistingProduct(item:any)
  {
    let _abc=new HttpHeaders().set('Content-Type','application/json');
    let body=JSON.stringify(item);
    console.log(body);
    return this._http.put(this.url,body,{headers:_abc});
  }
  updateStock(item){
    //console.log("xyz");
    let body=JSON.stringify(item);
    let head1=new HttpHeaders().set('Content-Type','application/json');
    return this._http.put(this.url,body,{headers:head1});
  }
  stockdetails(id:number){
    return this._http.get(this.stock_id+id);
  }

  getDetailsByProductid(Product_id:number){
    return this._http.get(this.stock_url+Product_id);
  }

  getsizeBycolor(item)
  {
    let body=JSON.stringify(item);
    let head1=new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.sizeBycolor_url,body,{headers:head1});
  }
}
