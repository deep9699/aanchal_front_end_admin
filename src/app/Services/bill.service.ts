import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { bill } from '../classes/Bill_class'

@Injectable({
  providedIn: 'root'
})
export class BillService {
  private bill_url='http://localhost:3000/bill/';
  constructor(private _http:HttpClient) { }
  GetAllBill()
  {
    console.log(this.bill_url);
      return this._http.get(this.bill_url);
  }
}
