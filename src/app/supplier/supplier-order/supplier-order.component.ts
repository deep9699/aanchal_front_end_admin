import { Component, OnInit, ViewChild } from "@angular/core";
import { PageEvent, MatPaginator, MatDialog, MatDialogRef } from "@angular/material";
import { product } from "../../classes/product_class";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material/sort";
import { ProductService } from "../../Services/product.service";
import { SelectionModel } from "@angular/cdk/collections";
import { Router, ActivatedRoute } from "@angular/router";
import { takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";
import { OrderProductComponent } from "../../order-product/order-product.component";
import { stock } from "../../classes/stock_class";
import { SupplierService } from "../../Services/supplier.service";
import { supplier_order } from "../../classes/supplier_order_class";
import { TouchSequence } from "selenium-webdriver";


export class Product_details
{
  constructor(
    public Product_id:number,
    public Product_name:string,
    public Product_price:number,
    public Category_name:string,
    public Size_name:string,
    public Color_name:string,
    public Quantity:number,
    public Stock_id:number,
    public Status:string
    )
    {}

}

@Component({
  selector: 'app-supplier-order',
  templateUrl: './supplier-order.component.html',
  styleUrls: ['./supplier-order.component.css'],
})
export class SupplierOrderComponent implements OnInit {

  currentdialog:MatDialogRef<any>=null;
  destroy=new Subject<any>();

    Table_detials:Product_details[]=[];
    stock_tbl_arr:stock[]=[];
    prod_tbl_arr: any[] = [];
    product_delarr: product[] = [];
    indexs:number;
    j: number;
    i: number = 0;
    saw_flag:boolean=false;
    page_length = 100;
    pageSize = 10;
    product_selection = new SelectionModel(true, []);

    Table_dataSource = new MatTableDataSource();
    @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
    
    pageEvent: PageEvent;
    arr:number[]=[];
    displayedColumns: string[] = [
      "Product_name",
      "Product_price",
      "Category_name",
      "Size",
      "Color",
      "Quentity",
      "Action"
    ];
    constructor(
      private prod_ser: ProductService,
      private _router: Router,
      private sup_ser:SupplierService,
      private matDialog:MatDialog,private _act:ActivatedRoute
    ) {}

    ngOnInit()
    {
      
      this.Table_dataSource.paginator = this.paginator;

      //this.Table_dataSource.sort = this.sort;
      this.Table_detials=[];
      this.Table_dataSource.data=[];
      this.prod_ser.getLowQtyProduct().subscribe(
        (data: Product_details[]) => {
          this.Table_dataSource.sort = this.sort;
          console.log(data);
          this.sup_ser.getSupplierOrder().subscribe(
            (x:supplier_order[])=>
            {
              console.log(x);
              for(this.i=0;this.i<data.length;this.i++)
              {
                for(this.j=0;this.j<x.length;this.j++)
                {
                  //console.log(data[this.i].Stock_id ,x[this.j].Fk_stock_id);
                  if(data[this.i].Stock_id==x[this.j].Fk_stock_id)
                  {
                    this.saw_flag=true;
                    break;
                  }
                  else
                  {

                  }
                }
                if(this.saw_flag==true)
                {
                  this.Table_detials.push(data[this.i]);
                }
                this.saw_flag=false;
              }
              console.log(this.Table_detials);
              this.Table_dataSource.sort = this.sort
                this.Table_dataSource.data=this.Table_detials;
              
            }
          );
          //console.log(data);
          //this.Table_detials=data;
          console.log(this.Table_detials);

      });

    }
    onSentRequest()
    {

    }
    onOrder_now(item: Product_details) {
      //this._router.navigate(['menu/add_category']);
      this._act.params.pipe(takeUntil(this.destroy)).subscribe(params => {
        if(this.currentdialog)
        {
          this.currentdialog.close();
        }
        this.currentdialog=this.matDialog.open(OrderProductComponent,{
          data: {
            Product_id : item.Product_id,
            Stock_id  : item.Stock_id,
            Color_name : item.Color_name,
            Size_name : item.Size_name
          }

        });
        this.currentdialog.afterClosed().subscribe(result => {
        console.log('the dailog was closed');
          this.ngOnInit();
        })
      });

    }

    onRemind_later(item) {
      this._router.navigate(["/menu/update_product", item.Product_id]);
    }
    applyFilter(filterValue: string) {
      this.Table_dataSource.filter = filterValue.trim().toLowerCase();
    }
  }


