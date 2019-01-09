import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SupplierService } from '../Services/supplier.service';
import { supplier } from '../classes/supplier_class';
import { StockService } from '../Services/stock.service';
import { MAT_DIALOG_DATA } from "@angular/material";
import { MatDialogRef } from "@angular/material";
import { ProductService } from '../Services/product.service';
import { product } from '../classes/product_class';
import { EmployeeService } from '../Services/employee.service';
import { email } from '../classes/email_class';
import { supplier_order } from '../classes/supplier_order_class';


@Component({
  selector: 'app-order-product',
  templateUrl: './order-product.component.html',
  styleUrls: ['./order-product.component.css']
})


export class OrderProductComponent implements OnInit {

  Product_id:number;
  Stock_id:number;
  Suppliers:supplier=new supplier();
  Color_name:string;
  Size_name:string;
  Qty:number=0;
  Price:number=0;
  Product_name:string="";
  constructor(private _act:ActivatedRoute,private emp_ser:EmployeeService,private sup_ser:SupplierService,private pro_ser:ProductService,private stock_ser:StockService ,public dialogRef: MatDialogRef<OrderProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {


  }

  ngOnInit() {
    this.Product_id=this.data.Product_id;
    this.Stock_id=this.data.Stock_id;
    this.Color_name=this.data.Color_name;
    this.Size_name=this.data.Size_name;
    console.log(this.Product_id);
    console.log(this.Stock_id);
    this.pro_ser.getProductById(this.Product_id).subscribe(
      (data:product)=>
      {
        this.Price=data[0].Product_price;
        this.Product_name=data[0].Product_name;
      }
    );
    this.stock_ser.getStockById(this.Stock_id).subscribe(
      (data:any)=>
      {
        console.log(data[0].Fk_supplier_id);
        this.sup_ser.getSupplierById(data[0].Fk_supplier_id).subscribe(
          (data:any)=>
          {
            console.log(data);
            this.Suppliers=data[0];

          }
        );
      }
    );
    }

  onClickOrderNow()
  {
    console.log(this.Qty);
    if(this.Qty>=10)
    {
      // this.emp_ser.sentMail(new email(this.Suppliers.Email_id,
      //   "REQUEST ORDER FROM AANCHAL FASHION DESIGN & BOUTIQUE","AANCHAL FAHSION DESIGN & BOUTIQUE SEND YOU ORDER OF "+this.Product_name+" PRODUCT OF "+this.Color_name+" Color  & "+this.Size_name+" Size of"+this.Qty+" pices"+" FOR "+this.Price+" RS. per pices")).subscribe(
      //   (data:any[])=>
      //   {
      //     console.log(data);
      //   }
      // );
      // localStorage.setItem("Status","REQUEST SENT");

      this.sup_ser.addSupplierOrder(new supplier_order(0,this.Stock_id,this.Qty,this.Price,"Request Sent")).subscribe(
        (data:any[])=>
        {
          console.log(data);
        }
      );

      alert("Request Sent");
      this.dialogRef.close();
    }
    else
    {
      localStorage.setItem("Status","REQUEST UNSENT");
      alert("Quantity must be equal to or more than 10");
    }

  }

  onclickCancle()
  {
    localStorage.setItem("Status","REQUEST UNSENT");
    alert("Request Cancle");
    this.dialogRef.close();
  }

  }
