import { Component, OnInit, ViewChild } from "@angular/core";
import { employee } from 'src/app/classes/employee_class';
import { PageEvent, MatPaginator } from "@angular/material";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material/sort";
import { SelectionModel } from "@angular/cdk/collections";
import { Router } from "@angular/router";
import { EmployeeService } from "../../Services/employee.service";
import { DeprecatedI18NPipesModule } from "@angular/common";


@Component({
  selector: 'employee-home',
  templateUrl: './employee-home.component.html',
  styleUrls: ['./employee-home.component.css']
})
export class EmployeeHomeComponent implements OnInit {
  emp_tbl_arr: employee[] = [];
  employee_delarr: employee[] = [];
  j: number;
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
  arr:number[]=[];
  displayedColumns: string[] = [
    "Action1",
    "Name",
    "Email_id",
    "Mobile_no",
    "Salary",
    "Joining_date",
    "Action"
  ];

  constructor(private emp_ser:EmployeeService,private _router:Router) { }

  ngOnInit() {

    this.employee_dataSource.paginator = this.paginator;

    this.employee_dataSource.sort = this.sort;
    this.emp_ser.getAllEmp().subscribe(
      (data: any[]) => {
        console.log(data);
          this.emp_tbl_arr=data;
          this.employee_dataSource.data=this.emp_tbl_arr;
      });
  }
  Add_employee() {
    this._router.navigate(["menu/add_employee"]);
  }

  onEmployee_Delete(item: employee) {
    console.log(item.Email_id);
    this.emp_ser.deleteEmployee(item.Email_id).subscribe(
      (data:any)=>{
        console.log(data);
        this.ngOnInit();
      }
    );

  }
  onCheakboxchacked(item: employee) {
    if (this.employee_delarr.find(x => x == item)) {
      this.employee_delarr.splice(this.employee_delarr.indexOf(item), 1);
    } else {
      this.employee_delarr.push(item);
    }
    console.log(this.employee_delarr);
  }

  onEmploee_Update(item) {
    this._router.navigate(["/menu/update_employee", item.Email_id]);
  }
  applyFilter(filterValue: string) {
    this.employee_dataSource.filter = filterValue.trim().toLowerCase();
  }
  Selected_delete() {
    this.emp_ser.deleteAll(this.employee_delarr).subscribe((data: any) => {
      console.log(data);
      for (this.i = 0; this.i < this.employee_delarr.length; this.i++) {
        if (this.emp_tbl_arr.find(x => x == this.employee_delarr[this.i])) {
          this.emp_tbl_arr.splice(this.emp_tbl_arr.indexOf(this.employee_delarr[this.i]), 1);
        }
      }
      this.employee_dataSource.data = this.emp_tbl_arr;
    });
  }

  Salary()
  {
    this._router.navigate(["/menu/salary"]);
  }


}
