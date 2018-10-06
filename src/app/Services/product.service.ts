import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { product } from '../classes/product_class'


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private url='http://localhost:3000/product/';
  private delete_pro='http://localhost:3000/product_delete/';
  constructor(private _http:HttpClient) { }
  getAllProduct(){
    return this._http.get(this.url);
  }
  getProductById(id){
    return this._http.get(this.url+id);
  }
  addProduct(item:FormData){

    return this._http.post(this.url,item);

  }
  updateProdut(item)
  {
    let _abc=new HttpHeaders().set('Content-Type','application/json');
    let body=JSON.stringify(item);
    return this._http.put(this.url,body,{headers:_abc});
  }
  deleteProduct(item)
  {
    return this._http.delete(this.url+item.Product_id);
  }
  deleteAll(item:product[])
  {
    let _abc=new HttpHeaders().set('Content-Type','application/json');
    let body=JSON.stringify(item);
    return this._http.post(this.delete_pro,body,{headers:_abc});
  }


}
