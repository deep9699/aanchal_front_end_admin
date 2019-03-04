import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Order } from './classes/order_class';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private _http:HttpClient) { }

  private order_url:string='http://localhost:3000/order/';

  getOrderById(id:number)
  {
    return this._http.get(this.order_url+id);
  }
  getAllOrder()
  {
    return this._http.get(this.order_url);
  }
  AddOrder(item:Order)
  {
    let body=JSON.stringify(item);
    let head1=new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.order_url,body,{headers:head1});
  }
  RemoveOrder(id:number)
  {
    return this._http.delete(this.order_url+id);
  }
}
