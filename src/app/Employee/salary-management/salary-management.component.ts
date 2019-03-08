import { Component, OnInit,ViewChild } from '@angular/core';
import { PageEvent, MatPaginator } from "@angular/material";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material/sort";
import { SelectionModel } from "@angular/cdk/collections";
import { Router } from "@angular/router";
import { EmployeeService } from "../../Services/employee.service";
import { employee } from '../../classes/employee_class';

export class salarydate
{
  constructor(public Email_id:string,public Last_Salary_date:Date){}
}
export class updatewithdrawl
{
  constructor(public id:number,public Withdrawal_amount:number){}
}

@Component({
  selector: 'app-salary-management',
  templateUrl: './salary-management.component.html',
  styleUrls: ['./salary-management.component.css']
})
export class SalaryManagementComponent implements OnInit {
  emp_tbl_arr: employee[] = [];
  j: number=0;
  i: number = 0;

  page_length = 100;
  pageSize = 10;
  employee_selection = new SelectionModel(true, []);

  employee_dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;
  pageEvent: PageEvent;
  expandedElement;
  withdrawamt:number;
  emailid:string;
  num:string='0000';
  salary_date:Date;
  emi:any[]=[];
  emi_amount:number;
  originalWithdrawl:number;
  arr:number[]=[];
  displayedColumns: string[] = [
    "Name",
    "Email_id",
    "Mobile_no",
    "Salary",
    "Joining_date",
    "Withdrawl_amount",

  ];
  date:Date=new Date();
date1:Date=new Date(Date.now());

getmonth:number=this.date1.getMonth()+1;
month:any;
num3:number=this.date1.getDate();

flag:boolean=false;
 no:number=1;
  constructor(private emp_ser:EmployeeService,private _router:Router) { }

  ngOnInit() {

    this.employee_dataSource.paginator = this.paginator;
    console.log(this.date1);
    this.employee_dataSource.sort = this.sort;
    this.emp_ser.getAllEmp().subscribe(
      (data: employee[]) => {
        console.log(data);
          this.emp_tbl_arr=data;
          this.employee_dataSource.data=this.emp_tbl_arr;
          for(this.i=0;this.i<data.length;this.i++)
          {
            this.emp_ser.getWithdrawlDetailsByEmployeeid(data[this.i].Email_id).subscribe(
              (data:any)=>{
                console.log(data);
                if(data.length==0)
                {
                    this.emi.push('-------');
                }
                else
                {
                  this.emi.push(data[0].EMI_amount);
                }
              }
            )
          }

          this.salary_date=new Date(data[0].Last_Salary_date);
          this.month=this.salary_date.getMonth()+1;

           if(this.month==this.getmonth)
           {
             this.flag=false;

           }
           else
           {
             this.flag=true;
           }
          console.log(this.salary_date);
      });
      console.log(this.emi);
  }

  applyFilter(filterValue: string) {
    this.employee_dataSource.filter = filterValue.trim().toLowerCase();
  }
  Pay_salary(){

          console.log(this.emp_tbl_arr.length);
          for(this.i=0;this.i<this.emp_tbl_arr.length;this.i++)
          {
            this.emailid=this.emp_tbl_arr[this.i].Email_id;
            console.log(this.emailid);
            this.emp_ser.updatedate(new salarydate(this.emp_tbl_arr[this.i].Email_id,this.date1)).subscribe(
              (data:any)=>
              {
                  console.log(data);


              }
            );
          }

          for(this.j=0;this.j<this.emp_tbl_arr.length;this.j++)
          {

            this.emp_ser.getWithdrawlDetailsByEmployeeid(this.emp_tbl_arr[this.j].Email_id).subscribe(
              (data:any)=>
              {
                if(data.length==0)
                {

                }
                else
                {
                  console.log(data);
                  this.originalWithdrawl=data[0].Withdrawal_amount;
                 this.emi_amount=data[0].EMI_amount;
                   console.log(this.originalWithdrawl);
                   console.log(this.emi_amount);
                  this.withdrawamt=this.originalWithdrawl-this.emi_amount;
                   console.log(this.withdrawamt);
                   if(this.withdrawamt<=0)
                   {
                     this.emp_ser.deleterecord(data[0].Withdrawal_id).subscribe(
                     (data:any)=>{
                       console.log(data);
                     }
                     );
                   }
                   else
                   {

                    this.emp_ser.updateWithdrawl(new updatewithdrawl(data[0].Withdrawal_id,this.withdrawamt)).subscribe(
                      (data:any)=>
                        {
                          console.log(data);
                        }
                      );

                   }
                            }
             }
          );
          }
  }


}
