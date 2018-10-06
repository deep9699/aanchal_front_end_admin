import { Component, OnInit, ViewChild } from "@angular/core";
import { PageEvent, MatPaginator } from "@angular/material";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material/sort";
import { SelectionModel } from "@angular/cdk/collections";
import { CategoryService } from "../../Services/category.service";
import { category } from "../../classes/category_class";
import { Router } from "@angular/router";

@Component({
  selector: "category-home",
  templateUrl: "./category-home.component.html",
  styleUrls: ["./category-home.component.css"]
})
export class CategoryHomeComponent implements OnInit {
  arr: category[] = [];
  delarr: category[] = [];


  j: number;
  length = 100;
  pageSize = 10;
  selection = new SelectionModel(true, []);

  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;
  pageEvent: PageEvent;
  displayedColumns: string[] = ["Action1", "Category_name", "Action"];

  constructor(private cat_ser: CategoryService,private _router:Router) {}

  ngOnInit() {
    this.dataSource.paginator = this.paginator;

    this.dataSource.sort = this.sort;
    this.cat_ser.getAllCategory().subscribe((data: any[]) => {
      this.arr=data;
      this.dataSource.data = data;
    });
  }
  onclickUpdate(item:category)
  {
    this._router.navigate(['update_category',item.Category_id]);
  }
  onClickAdd()
  {
    this._router.navigate(['add_category']);
  }
  onclickDelete(item: category) {
    this.cat_ser.deleteProduct(item).subscribe((data: any) => {
      console.log(data);
    });
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach(row => this.selection.select(row));
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  chacked(item: category) {
    if (this.delarr.find(x => x == item)) {
      this.delarr.splice(this.delarr.indexOf(item), 1);
    } else {
      this.delarr.push(item);
    }
    console.log(this.delarr);
  }
  i: number = 0;

  delete() {
    this.cat_ser.deleteAll(this.delarr).subscribe((data: any) => {
      console.log(data);
      for (this.i = 0; this.i < this.delarr.length; this.i++) {
        if (this.arr.find(x => x == this.delarr[this.i])) {
          this.arr.splice(this.arr.indexOf(this.delarr[this.i]), 1);
        }
      }
      this.dataSource.data = this.arr;
    });
  }
}


