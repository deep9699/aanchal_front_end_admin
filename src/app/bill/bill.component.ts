import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { bill } from '../classes/bill_class';
import { BillService } from '../Services/bill.service';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css']
})
export class BillComponent implements OnInit {

  bill_arr:bill[];
  dataSource=new MatTableDataSource();
  constructor(private _ac:ActivatedRoute,private _abc:BillService,private route:Router) { }
  displayedColumns: string[] = ['Bill_date','Total_amount','Fk_c_email_id'];
  ngOnInit() {

    this._abc.GetAllBill().subscribe(
      (data:bill[])=>{
        console.log(data);
        this.bill_arr=data;
        this.dataSource=this.dataSource = new MatTableDataSource(this.bill_arr);

      }
    );
  }


}
