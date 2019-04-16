import { Injectable } from '@angular/core';
import { CanActivate,ActivatedRouteSnapshot,RouterStateSnapshot,Router} from '@angular/router';
import { EmployeeService } from '../app/Services/employee.service';
@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {
  email:string="";

  constructor(private _data:EmployeeService,private _route:Router) { }
  canActivate(route:ActivatedRouteSnapshot,state:RouterStateSnapshot): boolean  {
    this.email=localStorage.getItem('email_id');
    if(this.email!="")
    {
      console.log('yes');
      return true;

    }
    else
    {
      alert('Login is required');
      this._route.navigate([''])
    }

  }
}
