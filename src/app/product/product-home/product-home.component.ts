import { Component, OnInit, ViewChild } from "@angular/core";
import {animate, state, style, transition, trigger} from '@angular/animations';
import { PageEvent, MatPaginator } from "@angular/material";
import { product } from "../../classes/product_class";
import { MatTableDataSource,MatSort } from "@angular/material";
import { ProductService } from "../../Services/product.service";
import { SelectionModel } from "@angular/cdk/collections";
import { Router } from "@angular/router";
import { CategoryService } from "../../Services/category.service";
import { url } from "../../../environments/environment";

@Component({
  selector: "app-product-home",
  templateUrl: "./product-home.component.html",
  styleUrls: ["./product-home.component.css"],
   animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ProductHomeComponent implements OnInit {
  prod_tbl_arr: product[] = [];
  product_delarr: product[] = [];
  j: number;
  flag:boolean=true;
  i: number = 0;
  page_length = 100;
  pageSize = 10;
  product_selection = new SelectionModel(true, []);

  product_dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  pageEvent: PageEvent;
  endPoint:string=url.endPoints;
  expandedElement;
  arr:number[]=[];
  displayedColumns: string[] = [
    "Action1",
    "id",
    "Product_name",
    "Product_price",
    "Category_name",
    "Action"
  ];
  constructor(
    private prod_ser: ProductService,
    private _router: Router,
    private cat_ser: CategoryService
  ) {}

  ngOnInit()
  {
    this.flag=true;
    this.product_dataSource.paginator = this.paginator;
    this.product_dataSource.sort = this.sort;
    this.prod_ser.getAllProduct().subscribe(
      (data: any[]) => {
        console.log(data);
          this.prod_tbl_arr=data;
          this.product_dataSource.data=data;
          this.product_dataSource.sort = this.sort;

    });
  }
  onProduct_Delete(item: product) {
    this.prod_ser.deleteProduct(item).subscribe((data: any) => {
      console.log(data);
      this.prod_tbl_arr.splice(this.prod_tbl_arr.indexOf(item),1);
      this.product_dataSource.data.splice(this.product_dataSource.data.indexOf(item),1);
      console.log(this.product_dataSource.data);
      this.ngOnInit();
    });
  }
  onProduct_Add() {
    this._router.navigate(["menu/add_product"]);
  }
  onProduct_Update(item) {
    this._router.navigate(["/menu/update_product", item.Product_id]);
  }
  // isAllSelected() {
  //   const numSelected = this.product_selection.selected.length;
  //   const numRows = this.product_dataSource.data.length;
  //   return numSelected === numRows;
  // }
  // // masterToggle() {
  //   this.isAllSelected()
  //     ? this.product_selection.clear()
  //     : this.product_dataSource.data.forEach(row => this.product_selection.select(row));
  // }
  applyFilter(filterValue: string) {



    this.product_dataSource.filter = filterValue.trim().toLowerCase();
    console.log( this.product_dataSource.filter);
    if(this.product_dataSource.filteredData.length==0)
    {
      //console.log('in1');
      this.flag=false;
    }
    else
    {
      this.flag=true;
    }
  }
  onCheakboxchacked(item: product) {
    if (this.product_delarr.find(x => x == item)) {
      this.product_delarr.splice(this.product_delarr.indexOf(item), 1);
    } else {
      this.product_delarr.push(item);
    }
    console.log(this.product_delarr);
  }


  Selected_delete() {
    this.prod_ser.deleteAll(this.product_delarr).subscribe((data: any) => {
      console.log(data);
      for (this.i = 0; this.i < this.product_delarr.length; this.i++) {
        if (this.prod_tbl_arr.find(x => x == this.product_delarr[this.i])) {
          this.prod_tbl_arr.splice(this.prod_tbl_arr.indexOf(this.product_delarr[this.i]), 1);
        }
      }
      this.product_dataSource.data = this.prod_tbl_arr;
    });
  }
}
