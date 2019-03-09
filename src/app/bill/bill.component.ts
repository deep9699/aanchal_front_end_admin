import { Component, OnInit,ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { bill } from '../classes/bill_class';
import { BillService } from '../Services/bill.service';
import { PageEvent, MatPaginator } from "@angular/material";
import { MatSort } from "@angular/material/sort";
import { SelectionModel } from "@angular/cdk/collections";


@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css']
})
export class BillComponent implements OnInit {
  page_length = 100;
  pageSize = 10;
  bill_selection = new SelectionModel(true, []);
  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;
  pageEvent: PageEvent;


  bill_arr:bill[];
  dataSource=new MatTableDataSource();
  constructor(private _ac:ActivatedRoute,private _abc:BillService,private route:Router) { }
  displayedColumns: string[] = ['Bill_date','Total_amount','Fk_c_email_id','Action'];
  ngOnInit() {

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this._abc.GetAllBill().subscribe(
      (data:bill[])=>{
        console.log(data);
        this.bill_arr=data;
        this.dataSource = new MatTableDataSource(this.bill_arr);

      }
    );
  }
  Bill_details(item:bill)
  {
    console.log(item.Bill_id);  
     this.route.navigate(['menu/bill_details',item.Bill_id]);
  }


}
