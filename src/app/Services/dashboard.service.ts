import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private olcust_url="http://localhost:3000/olcust/";
  private totemp_url="http://localhost:3000/totalemp/";
  private totsup_url="http://localhost:3000/totalsup";
  private weekchart_url="http://localhost:3000/weekchart/";
  private stocktbl_url="http://localhost:3000/dashstock/"
  constructor(private _http:HttpClient) { }

  getOnlineCustomer(){
    return this._http.get(this.olcust_url);
  }

  getTotalEmployee(){
    return this._http.get(this.totemp_url);
  }

  getTotalSupplier(){
    return this._http.get(this.totsup_url);
  }

  getWeekchartDetails(){
    return this._http.get(this.weekchart_url);
  }

  getStockDetails(){
    return this._http.get(this.stocktbl_url);
  }

}
