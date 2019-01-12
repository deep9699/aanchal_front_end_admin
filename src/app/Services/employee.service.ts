import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { employee } from '../classes/employee_class';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private url='http://localhost:3000/employee/';
  private emp_url='http://localhost:3000/employee1/';
<<<<<<< HEAD
=======

  private employee_del='http://localhost:3000/employee_del/';
>>>>>>> cbf283c1503d67ca603928e660e2f30ea6125e33
  private email_url='http://localhost:3000/email/';
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
<<<<<<< HEAD
=======

  //normal services
>>>>>>> cbf283c1503d67ca603928e660e2f30ea6125e33
  getAllEmp()
  {
    return this._http.get(this.emp_url);
  }
<<<<<<< HEAD
=======
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

>>>>>>> cbf283c1503d67ca603928e660e2f30ea6125e33
}
