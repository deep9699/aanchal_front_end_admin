import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../Services/employee.service';
import { employee } from '../../classes/employee_class';
import { Router } from "@angular/router";



@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  Email_id: string;
  Password: string;
  Name: string;
  Mobile_no: string;
  Address: string;
  DOB: Date;
  Salary: number;
  Joining_date: Date = new Date("12/12/1998");
  Employee_type: number;
  arr_emp: employee[];
  arr: employee[];
  type: number[] = [
    1, 2, 3
  ];
  i: number;

  constructor(private _router: Router, private _emp: EmployeeService) { }
  ngOnInit() {
    this._emp.getAllEmp().subscribe(
      (data: any) => {
        console.log(data);
        this.arr_emp = data;
      }
    );
  }
  onclickAdd() {
    console.log(this.Email_id);
    console.log(this.arr_emp)
    this._emp.addEmployee(new employee(this.Email_id, this.Password, this.Name, this.Mobile_no, this.Address, this.DOB, this.Salary, this.Joining_date, this.Employee_type)).subscribe(
      (data: any) => {
        if (data.errno == 1062) {
          alert("Email id is already exist");
          this.Email_id = '';
        }
        else {
          if(this.Salary<0)
          {
            alert("Salary is invalid")
            this.Salary=0;
          }
          else
          {
            console.log(data);
            this.arr = data;
          }
          
        }
        //console.log(this.arr);
        //this._router.navigate(['menu/employee_home']);  
      }
    );
  }

}
