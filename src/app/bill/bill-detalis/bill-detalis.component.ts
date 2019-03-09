import { Component, OnInit } from '@angular/core';
import { BillService } from '../../Services/bill.service';
import { Router,ActivatedRoute } from "@angular/router";


export class Invoicedetails {
  constructor(public no: number, public item: string,public color:string,public size:string,public unitcost:number,public qty:number,public total:number) {}
}
@Component({
  selector: 'app-bill-detalis',
  templateUrl: './bill-detalis.component.html',
  styleUrls: ['./bill-detalis.component.css']
})
export class BillDetalisComponent implements OnInit {

  
  bill_details_arr:Invoicedetails[]=[];
  no:number=0;
  item:string;
  color:string;
  size:string;
  unitcost:number;
  qty:number;
  total:number;
  subtotal:number;
  CGST:number;
  SGST:number;
  Grand_total:number;
  bill_id:number;
  bill_date:Date;
  name:string;
  address:string;
  email_id:string;
  mobile_no:string;
  i:number;
  constructor(private bill_ser:BillService,private act_route:ActivatedRoute,) { }

  ngOnInit() {
    
    this.bill_id=this.act_route.snapshot.params["bill_id"]

    console.log(this.bill_id);
    this.bill_ser.getbilldetailsByid(this.bill_id).subscribe(
      (data:any)=>{
       console.log(data);
       this.name=data[0].Name;
       this.bill_date=data[0].Bill_date;
       this.address=data[0].Address;
       this.mobile_no=data[0].Mobile_no;
       this.subtotal=data[0].Amount*data[0].Quantity;
        for(this.i=0;this.i<data.length;this.i++)
        {
          this.no=this.no+1;
          this.item=data[this.i].Product_name;
          this.color=data[this.i].Color_name;
          this.size=data[this.i].Size_name;
          this.unitcost=data[this.i].Product_price;
          this.qty=data[this.i].Quantity;
          this.total=data[this.i].Amount*data[this.i].Quantity;;
        this.bill_details_arr.push(new Invoicedetails(this.no,this.item,this.color,this.size,this.unitcost,this.qty,this.total));
        }
        this.CGST=(this.subtotal*2.5)/100;
        this.SGST=(this.subtotal*2.5)/100;
        this.Grand_total=this.subtotal+this.CGST+this.SGST;
          
          
        }
    );
  }

}

