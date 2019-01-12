import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, PageEvent } from '@angular/material';
import { SupplierService } from '../../Services/supplier.service';
import { StockService } from '../../Services/stock.service';
import { Router } from '@angular/router';


export class TableDetais
{
  constructor(
    public supplier_order_id:number,
    public Fk_Stock_id:number,
    public Product_name:string,
    public Supplier_name:string,
    public Color_name:string,
    public Size_name:string,
    public req_qty:number,
    public pre_qty:number,
    public Price:number,
    public Status:string
  ){}
}

export class update_qty
{
  constructor(
    public Stock_id:number,
    public Quantity:number
  ){}
}

export class update_status
{
  constructor(
    public supplier_order_id:number,
    public status:string
  ){}
}

@Component({
  selector: 'app-supplier-order-status',
  templateUrl: './supplier-order-status.component.html',
  styleUrls: ['./supplier-order-status.component.css']
})
export class SupplierOrderStatusComponent implements OnInit {

  i:number;
  j:number;
  quantity:number;
  price:number;
  status:string;
  color:string;
  size:string;
  supplier:string;
  product:string;
  length = 100;
  pageSize = 10;

  //selection = new SelectionModel(true, []);

  supplier_order_table:TableDetais[]=[];
  supplier_order_dataSource=new MatTableDataSource();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  pageEvent: PageEvent;
  displayedColumns: string[] = ['Product_name','Color_name', 'Size_name','Quantity','Price','Status','Action'];

  constructor(private sup_ser:SupplierService,private stk_ser:StockService,private _router:Router) { }

  ngOnInit() {
    this.supplier_order_dataSource.paginator=this.paginator;
    this.supplier_order_dataSource.sort=this.sort;
    this.supplier_order_table=[];
    this.supplier_order_dataSource.data=[];
    this.sup_ser.getSupplierOrder().subscribe(
      (data:any[])=>
      {
        console.log(data);
        for(this.i=0;this.i<data.length;this.i++)
        {
          this.supplier_order_table.push(new TableDetais(data[this.i].supplier_order_id,data[this.i].Fk_stock_id,data[this.i].Product_name,data[this.i].Name,data[this.i].Color_name,data[this.i].Size_name,data[this.i].quantity,data[this.i].Quantity,data[this.i].price,data[this.i].status));
        }
         this.supplier_order_dataSource.data=this.supplier_order_table;
         console.log(this.supplier_order_dataSource.data);

      });

  }

  onClickDelivered(item:any)
  {
    console.log(item);
    this.stk_ser.addExistingProduct(new update_qty(item.Fk_Stock_id,item.pre_qty+item.req_qty)).subscribe(
    (data:any)=>
    {
      console.log(data);
      this.sup_ser.updateOrderStatus(new update_status(item.supplier_order_id,"Delivered")).subscribe(
        (data:any)=>
        {
          console.log(data);
          this.ngOnInit();
        }
      );
    });
  }

  applyFilter(filterValue: string) {
    this.supplier_order_dataSource.filter = filterValue.trim().toLowerCase();
  }

}
