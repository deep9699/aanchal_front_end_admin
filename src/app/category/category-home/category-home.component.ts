import { Component, OnInit, ViewChild } from "@angular/core";
import { PageEvent, MatPaginator } from "@angular/material";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material/sort";
import { MatDialog, MatDialogRef} from '@angular/material';
import { takeUntil } from 'rxjs/operators';
import { SelectionModel } from "@angular/cdk/collections";
import { CategoryService } from "../../Services/category.service";
import { category } from "../../classes/category_class";
import { Router, ActivatedRoute } from "@angular/router";
import { Subject } from "rxjs";
import { AddCategoryComponent } from "../add-category/add-category.component";
import { UpdateCategoryComponent } from "../update-category/update-category.component";


@Component({
  selector: "category-home",
  templateUrl: "./category-home.component.html",
  styleUrls: ["./category-home.component.css"]
})
export class CategoryHomeComponent implements OnInit {
  currentdialog:MatDialogRef<any>=null;
  destroy=new Subject<any>();

  category_list: category[] = [];
  category_delarr: category[] = [];
  j: number;
  length = 100;
flag:boolean=true;
  pageSize = 10;
  selection = new SelectionModel(true, []);
  category_dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;
  pageEvent: PageEvent;
  displayedColumns: string[] = ["Action1", "Category_name", "Action"];

  constructor(private cat_ser: CategoryService,private _router:Router,private matDialog:MatDialog,private _act:ActivatedRoute) {}

  ngOnInit() {
    this.flag=true;
    this.category_dataSource.paginator = this.paginator;
    this.category_dataSource.sort = this.sort;
    this.cat_ser.getAllCategory().subscribe((data: any[]) => {
      this.category_list=data;
      this.category_dataSource.data = data;
    });
  }
  category_name_Update(item:category)
  {
   // this._router.navigate(['menu/update_category',item.Category_id]);

    this._act.params.pipe(takeUntil(this.destroy)).subscribe(params => {
      if(this.currentdialog)
      {
        this.currentdialog.close();
      }
      this.currentdialog=this.matDialog.open(UpdateCategoryComponent,{
        data: {id : item.Category_id}
      });
      this.currentdialog.afterClosed().subscribe(result => {
        console.log('the dailog was closed');

      })
    });
  }
  Add_category()
  {
      //this._router.navigate(['menu/add_category']);
      this._act.params.pipe(takeUntil(this.destroy)).subscribe(params => {
        if(this.currentdialog)
        {


          this.currentdialog.close();
          this.ngOnInit();
        }
        this.currentdialog=this.matDialog.open(AddCategoryComponent,{
          data: {id : params.id}
        });
        this.currentdialog.afterClosed().subscribe(result => {

          console.log('the dailog was closed');

          this.ngOnInit();
        })
      });
  }
  categoryDelete(item: category) {
    this.cat_ser.deleteProduct(item).subscribe((data: any) => {
      console.log(data);
      this.ngOnInit();
    });
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.category_dataSource.data.length;
    return numSelected === numRows;
  }
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.category_dataSource.data.forEach(row => this.selection.select(row));
  }
  applyFilter(filterValue: string) {
    this.category_dataSource.filter = filterValue.trim().toLowerCase();
    if(this.category_dataSource.filteredData.length==0)
    {
      //console.log('in1');
      this.flag=false;
    }
    else
    {
      this.flag=true;
    }
  }
  checkedItems(item: category) {
    if (this.category_delarr.find(x => x == item)) {
      this.category_delarr.splice(this.category_delarr.indexOf(item), 1);
    } else {
      this.category_delarr.push(item);
    }
    console.log(this.category_delarr);
  }
  i: number = 0;

  selectedDelete() {
    this.cat_ser.deleteAll(this.category_delarr).subscribe((data: any) => {
      console.log(data);
      for (this.i = 0; this.i < this.category_delarr.length; this.i++) {
        if (this.category_list.find(x => x == this.category_delarr[this.i])) {
          this.category_list.splice(this.category_list.indexOf(this.category_delarr[this.i]), 1);
        }
      }

      this.category_dataSource.data = this.category_list;
      this.ngOnInit();
    });
  }
}


