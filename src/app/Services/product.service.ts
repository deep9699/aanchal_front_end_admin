import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { product } from '../classes/product_class'
import { url } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private url=url.endPoints+'product/';
  private product_route=url.endPoints+'product_router/';
  private product_supplier_route=url.endPoints+'product_supplier/';
  private product_delete=url.endPoints+'product_delete_router/';
  constructor(private _http:HttpClient) { }
  getAllProduct(){
    return this._http.get(this.url);
  }
  getLowQtyProduct()
  {
    return this._http.get(this.product_supplier_route);
  }
  getTopSellingProduct()
  {
    return this._http.get(this.product_delete);
  }
  getProductById(id){
    return this._http.get(this.url+id);
  }
  getProductByCategoryId(id){
    return this._http.get(this.product_route+id);
  }

  addProduct(item:FormData){
    return this._http.post(this.url,item);
  }
  updateProdut(item:product)
  {
    let _abc=new HttpHeaders().set('Content-Type','application/json');
    let body=JSON.stringify(item);
    console.log(body);
    return this._http.put(this.url,body,{headers:_abc});
  }
  updateProduct_image(item:FormData)
  {
    return this._http.put(this.product_route,item)
  }
  deleteProduct(item)
  {
    return this._http.delete(this.url+item.Product_id);
  }
  deleteAll(item:product[])
  {
    let _abc=new HttpHeaders().set('Content-Type','application/json');
    let body=JSON.stringify(item);
    return this._http.post(this.product_route,body,{headers:_abc});
  }


}
