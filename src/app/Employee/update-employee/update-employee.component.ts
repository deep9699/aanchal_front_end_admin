import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from "@angular/router";
import { EmployeeService } from 'src/app/Services/employee.service';
import { employee } from "../../classes/employee_class";
@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit {
  Email_id:string;
  Password:string;
  Name:string;
  Mobile_no:string;
  Address:string;
  DOB:Date;
  Salary:number;
  Joining_date:Date=new Date("12/12/1998");
  Employee_type:number;
  arr_emp:employee[];
  email_id:string;

  constructor(private _router:Router,private emp_ser:EmployeeService,private act_router:ActivatedRoute) { }

  ngOnInit() {
    
    this.emp_ser.getAllEmp().subscribe(
      (data:any)=>{
       // console.log(data);
        this.arr_emp=data;       
      }
    );

    this.email_id = this.act_router.snapshot.params["email_id"];
    console.log(this.email_id);
    this.emp_ser.getEmployeedetailsById(this.email_id).subscribe(
      (data:employee[])=>{
        console.log(data);
        this.Email_id=data[0].Email_id;
        this.Password=data[0].Password;
        this.Name=data[0].Name;
        this.Mobile_no=data[0].Mobile_no;
        this.Address=data[0].Address;
        this.DOB=data[0].DOB;
        this.Salary=data[0].Salary;
        this.Joining_date=data[0].Joining_date;
        this.Employee_type=data[0].Employee_type;
      }
    );
  }

  keyPressText(event: any)
  {
    const pattern = /[A-Z\a-z\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    // console.log(inputChar, e.charCode);
       if (!pattern.test(inputChar) || this.Name.length>=20) {
       // invalid character, prevent input
           event.preventDefault();
      }
  }

  keyPressNumber(event: any) {
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    // console.log(inputChar, e.charCode);
       if (!pattern.test(inputChar) || this.Mobile_no.length>=10) {
       // invalid character, prevent input
           event.preventDefault();
      }
 }
  onclickCancle()
  {
    this._router.navigate(['menu/employee_home']);
  }
  onclicksave_changes()
  {
    this.emp_ser.updateEmployee(new employee(this.Email_id,this.Password,this.Name,this.Mobile_no,this.Address,this.DOB,this.Salary,this.Joining_date,this.Employee_type),this.Email_id).subscribe(
      (data:any)=>{
        console.log(data);
        this._router.navigate(['menu/employee_home']);  
      }
    );
  }
}
