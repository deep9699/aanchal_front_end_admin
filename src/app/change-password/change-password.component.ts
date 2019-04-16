import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../Services/employee.service';
import { Router } from '@angular/router';



export class changepassclass
{
  constructor(
    public Email_id:string,
    public Password:string
  ){}
}

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  email_id:string;
  check_code:number;
  code:number;
  new_password:string;
  repeat_password:string;

  constructor(private emp_ser:EmployeeService,private _router:Router) { }

  ngOnInit() {
    this.check_code=parseInt(localStorage.getItem('code'));
    this.email_id=localStorage.getItem('Email_id');
    console.log(this.check_code);
  }

  onclickchangepassword()
  {
    if(this.check_code==this.code)
    {
      if(this.new_password==this.repeat_password)
      {
        this.emp_ser.changePassword(new changepassclass(this.email_id,this.new_password)).subscribe(
          (data:any)=>
          {
            console.log(data);
            alert("Password Changes");
            this._router.navigate(['']);
          }
        );
      }
      else
      {
        alert("Password & Confirm Password Must be Same");  
      }
    }
    else
    {
      alert("Invalid Code");
    }
  }

}
