import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { url } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private olcust_url=url.endPoints+"olcust/";
  private totemp_url=url.endPoints+"totalemp/";
  private totsup_url=url.endPoints+"totalsup";
  private weekchart_url=url.endPoints+"weekchart/";
  private stocktbl_url=url.endPoints+"dashstock/"
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
