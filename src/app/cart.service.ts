import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { cart } from './classes/cart_class';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private _http:HttpClient) { }

  private cart_url:string='http://localhost:3000/cart/';
  getAllCart()
  {
    return this._http.get(this.cart_url);
  }
  getCartByCustomerId(id)
  {
    return this._http.get(this.cart_url+id);
  }
  removeFromCart(id)
  {
    return this._http.delete(this.cart_url+id);
  }
  InsertIntoCart(item:cart)
  {
    let body=JSON.stringify(item);
    let head1=new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.cart_url,body,{headers:head1});
  }

}
