import { Component, OnInit, ViewChild } from '@angular/core';
import { PageEvent, MatPaginator } from "@angular/material";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material/sort";
import { SelectionModel } from "@angular/cdk/collections";
import { OrderService } from '../order.service';
import { BillService } from '../Services/bill.service';
import { bill } from '../classes/bill_class';
import { bill_details } from '../classes/bill_details_class';
import { CartService } from '../cart.service';
import { StockService } from '../Services/stock.service';
import { stock } from '../classes/stock_class';

export class TableDetais
{
  constructor(
    public Order_id:number,
    public Fk_stock_id:number,
    public Fk_customer_id:number,
    public Quantity:number,
    public Status:string,
    public Color_name:string,
    public Size_name:string,
    public Product_name:string,
    public Product_price:number,

  ){}
}

export class update_status
{
  constructor(
    public supplier_order_id:number,
    public status:string
  ){}
}


export class update_qty
{
  constructor(
    public Stock_id:number,
    public Quantity:number
  ){}
}

@Component({
  selector: 'app-customer-order',
  templateUrl: './customer-order.component.html',
  styleUrls: ['./customer-order.component.css']
})
export class CustomerOrderComponent implements OnInit {

  id:number;
  i:number;
  flag:boolean=false;
  date1:Date;
  update_qty:number;
  bill_id:number;
  bill_details:bill_details[]=[];
  customer_order_table:TableDetais[]=[];
  tmp_cust_order_table:TableDetais[]=[];
  customer_order_dataSource=new MatTableDataSource();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  pageEvent: PageEvent;
  employee_selection = new SelectionModel(true, []);

  displayedColumns: string[] = ['Product_name','Color_name', 'Size_name','Quantity','Price','Status','Action'];



  constructor(private order_ser:OrderService,private bill_ser:BillService,private cart_ser:CartService,private stock_ser:StockService) { }

  ngOnInit() {


    this.customer_order_dataSource.paginator=this.paginator;
    this.customer_order_dataSource.sort=this.sort;
    this.customer_order_table=[];
    this.customer_order_dataSource.data=[];
    this.order_ser.getAllOrder().subscribe(
      (data:TableDetais[])=>
      {
        console.log(data);
        this.customer_order_table=data;
        // for(this.i=0;this.i<data.length;this.i++)
        // {
        //   this.customer_order_table.push(new TableDetais(data[0].Order_id,data[0].Fk_stock_id,data[0].Fk_customer_id,data[0].Quantity,data[0].Status,data[0].Color_name,data[0].Size_name,data[0].Product_name,data[0].Product_price));
        // }
         this.customer_order_dataSource.data=this.customer_order_table;
         console.log(this.customer_order_dataSource.data);

      }
    );
  }

  onClickShip(item)
  {

    
    console.log(item);
        this.bill_ser.addBill(new bill(0,this.date1,item.Product_price,item.Fk_customer_id)).subscribe(
      (data:any)=>
      {
        console.log(data);
        this.bill_id=data.insertId;
        this.bill_details.push(new bill_details(this.bill_id,item.Fk_customer_id,item.Fk_stock_id,item.Quantity,item.Product_price));
        this.bill_ser.addBillDetails(this.bill_details).subscribe(
          (data:any)=>
          {
            console.log(data);
            this.order_ser.RemoveOrder(item.Order_id).subscribe(
              (data:any)=>
              {
                console.log(data);
                this.stock_ser.getStockById(item.Fk_stock_id).subscribe(
                  (data1:stock[])=>
                  {
                    this.update_qty=data1[0].Quantity-item.Quantity;
                    this.stock_ser.updateStock(new update_qty(item.Fk_stock_id,this.update_qty)).subscribe(
                      (data:any)=>
                      {
                        console.log(data);
                      }
                    );
                  }
                );
              }
            );
          }
        );
      }
    );

  }

  // onClickReject(item)
  // {
  //   this.sup_ser.updateOrderStatus(new update_status(item.supplier_order_id,"Request Rejected")).subscribe(
  //     (data:any)=>
  //     {
  //       this.flag=true;
  //       console.log(data);
  //       this.ngOnInit();
  //     }
  //   );
  // }

  applyFilter(filterValue: string) {
    this.customer_order_dataSource.filter = filterValue.trim().toLowerCase();
  }


}
