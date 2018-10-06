import { Component, OnInit, ViewChild } from "@angular/core";
import { PageEvent, MatPaginator } from "@angular/material";
import { product } from "../../classes/product_class";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material/sort";
import { ProductService } from "../../Services/product.service";
import { SelectionModel } from "@angular/cdk/collections";
import { Router } from "@angular/router";
import { CategoryService } from "../../Services/category.service";

@Component({
  selector: "app-product-home",
  templateUrl: "./product-home.component.html",
  styleUrls: ["./product-home.component.css"]
})
export class ProductHomeComponent implements OnInit {
  prod_tbl_arr: product[] = [];
  product_delarr: product[] = [];
  j: number;
  i: number = 0;
  page_length = 100;
  pageSize = 10;
  product_selection = new SelectionModel(true, []);

  product_dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;
  pageEvent: PageEvent;
  displayedColumns: string[] = [
    "Action1",
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
    this.product_dataSource.paginator = this.paginator;

    this.product_dataSource.sort = this.sort;
    this.prod_ser.getAllProduct().subscribe(
      (data: any[]) => {
          this.prod_tbl_arr=data;
          this.product_dataSource.data=data;
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
    this._router.navigate(["add_product"]);
  }
  onProduct_Update(item) {
    this._router.navigate(["update_product", item.Product_id]);
  }
  isAllSelected() {
    const numSelected = this.product_selection.selected.length;
    const numRows = this.product_dataSource.data.length;
    return numSelected === numRows;
  }
  masterToggle() {
    this.isAllSelected()
      ? this.product_selection.clear()
      : this.product_dataSource.data.forEach(row => this.product_selection.select(row));
  }
  applyFilter(filterValue: string) {
    this.product_dataSource.filter = filterValue.trim().toLowerCase();
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
