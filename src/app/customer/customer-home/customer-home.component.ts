import { Component, OnInit,ViewChild } from '@angular/core';
import { cust } from '../../classes/customer_class';
//import { CustomerService } from "../../Services/customer.service";
import {PageEvent,MatPaginator} from '@angular/material';

import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

import { Router } from '@angular/router';
import { CustomerService } from '../../Services/customer.service';

@Component({
  selector: 'app-customer-home',
  templateUrl: './customer-home.component.html',
  styleUrls: ['./customer-home.component.css']
})
export class CustomerHomeComponent implements OnInit {
  customer_arr:cust[]=[];
  customer_delarr:cust[]=[];
  i:number=0;
  length = 100;
  pageSize = 10;
  //selection = new SelectionModel(true, []);

Customer_dataSource=new MatTableDataSource();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  pageEvent: PageEvent;
  displayedColumns: string[] = ['Action1','Name', 'Mobile_no','Action'];

  constructor(private customer_ser:CustomerService,private _router:Router) { }

  ngOnInit() {

    this.Customer_dataSource.paginator=this.paginator;

    this.Customer_dataSource.sort = this.sort;
    this.customer_ser.getAllCustomer().subscribe(
      (data:cust[])=>{
        this.customer_arr=data ;
        console.log(this.customer_arr);
        this.Customer_dataSource.data=this.customer_arr;
      }
    );
  }
  delete_customer(item:cust)
  {
    console.log(item);
      this.customer_ser.deleteCustomer(item).subscribe(
        (data:any)=>{
          this.customer_arr.splice(this.customer_arr.indexOf(item),1);
            console.log(data);
            this.ngOnInit();
        }
      );

}
}
