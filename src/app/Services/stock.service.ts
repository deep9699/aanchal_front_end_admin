import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { stock } from '../classes/stock_class';
import { url } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  private url:string=url.endPoints+'stock/';
  private stock_id:string=url.endPoints+'stock_id/';
  private stock_size:string=url.endPoints+'stock_size/'
  private stock_url:string=url.endPoints+'stock_details/';
  private sizeBycolor_url:string=url.endPoints+'sizebycolor/'
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

  getStockBySize(id:number)
  {
    return this._http.get(this.stock_size+id);
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
