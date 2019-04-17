import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { employee } from '../classes/employee_class';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { url } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private url=url.endPoints+'employee/';
  private emp_url=url.endPoints+'employee1/';

  private employee_del=url.endPoints+'employee_del/';
  private email_url=url.endPoints+'email/';

  private withdrawal_url=url.endPoints+'withdrawal/';
  private withdrawal_empid=url.endPoints+'withdrawalbyemailid/';
  private salary=url.endPoints+'salary_date/';
  constructor(private _http:HttpClient) { }
  log_in_emp(item)
  {
    let _abc=new HttpHeaders().set('Content-Type','application/json');
    let body=JSON.stringify(item);
    console.log(body);
    return this._http.post(this.url,body,{headers:_abc});
  }
  getEmpById(id)
  {
    return this._http.get(this.url+id);
  }
  changePassword(item:any)
  {
    let _abc=new HttpHeaders().set('Content-Type','application/json');
    let body=JSON.stringify(item);
    return this._http.put(this.url,body,{headers:_abc});

  }
  sentMail(item)
  {
    let _abc=new HttpHeaders().set('Content-Type','application/json');
    let body=JSON.stringify(item);
    console.log(body);
    return this._http.post(this.email_url,body,{headers:_abc});
  }

  //normal service
  //normal services
  getAllEmp()
  {
    return this._http.get(this.emp_url);
  }
  getEmployeedetailsById(Email_id:string)
  {
    return this._http.get(this.emp_url+Email_id);
  }
  addEmployee(item){
    console.log(item);
    let _header=new HttpHeaders().set('Content-Type','application/json');
    let body=JSON.stringify(item);
    console.log(body);
    return this._http.post(this.emp_url,body,{headers:_header});
  }
  updateEmployee(item:employee,Email_id)
  {
    let _header=new HttpHeaders().set('Content-Type','application/json');
    let body=JSON.stringify(item);
    console.log(body);
    return this._http.put(this.emp_url+Email_id,body,{headers:_header});
  }

  deleteEmployee(Email_id:string)
  {
    return this._http.delete(this.emp_url+Email_id);
  }
  deleteAll(item:employee[])
  {
    let _abc=new HttpHeaders().set('Content-Type','application/json');
    let body=JSON.stringify(item);
    return this._http.post(this.employee_del,body,{headers:_abc});
  }
  addwithdrawlAmount(item)
  {
    let _abc=new HttpHeaders().set('Content-Type','application/json');
    let body=JSON.stringify(item);
    return this._http.post(this.withdrawal_url,body,{headers:_abc});
  }
  getWithdrawlDetailsByEmployeeid(id)
  {
    return this._http.get(this.withdrawal_empid+id);
  }
  updatedate(item)
  {
    let _abc=new HttpHeaders().set('Content-Type','application/json');
    let body=JSON.stringify(item);
    return this._http.put(this.salary,body,{headers:_abc});
  }
  updateWithdrawl(item)
  {
    let _abc=new HttpHeaders().set('Content-Type','application/json');
    let body=JSON.stringify(item);
    return this._http.put(this.withdrawal_url,body,{headers:_abc});
  }
  deleterecord(id)
  {
    return this._http.delete(this.withdrawal_url+id);
  }


}
