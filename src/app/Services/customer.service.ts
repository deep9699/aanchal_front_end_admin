import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { cust } from "../classes/customer_class";
import { url } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private url=url.endPoints+'customer/';
  private customer_Id_url=url.endPoints+'last_id/';
  constructor(private _http:HttpClient) { }

  addCustomer(item:cust){
    let _abc=new HttpHeaders().set('Content-Type','application/json');
    let body=JSON.stringify(item);
    return this._http.post(this.url,body,{headers:_abc});
}
  getAllCustomer(){
    return this._http.get(this.url);
  }

  deleteCustomer(item:cust){

    //console.log(item.Supplier_id);
    return this._http.delete(this.url+item.Customer_id);
  }
  getCustomerById(id:number){
    return this._http.get(this.url+id);
  }
  getLastId()
  {
      return this._http.get(this.customer_Id_url);
  }
  getIdByMobileNo(Mobile_no:string)
  {
    return this._http.get(this.customer_Id_url+Mobile_no);
  }

}


