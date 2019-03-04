import { Component, OnInit,ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { size } from '../../classes/size_class'
import {SizeService } from '../../Services/size.service';
import { PageEvent, MatPaginator } from "@angular/material";
import { MatSort } from "@angular/material/sort";
import { MatDialog, MatDialogRef} from '@angular/material';
import { takeUntil } from 'rxjs/operators';
import { SelectionModel } from "@angular/cdk/collections";
import { Subject } from "rxjs";
import { UpdateSizeComponent } from '../update-size/update-size.component';
import { AddSizeComponent } from '../add-size/add-size.component';
@Component({
  selector: 'app-size-home',
  templateUrl: './size-home.component.html',
  styleUrls: ['./size-home.component.css']
})
export class SizeHomeComponent implements OnInit {
  size_arr:size[];
  currentdialog:MatDialogRef<any>=null;
  destroy=new Subject<any>();
  size_list:size[]=[];
  size_delarr:size[]=[];
  length=100;

  pageSize = 10;
  selection = new SelectionModel(true, []);
  size_dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;
  pageEvent: PageEvent;


  constructor(private matDialog:MatDialog,private _ac:ActivatedRoute,private _ser:SizeService,private route:Router) { }
  displayedColumns: string[] = ['Action1','Size_name','Action'];
  ngOnInit() {
    this.size_dataSource.paginator=this.paginator;
    this.size_dataSource.sort=this.sort;
  
    this._ser.getAllSize().subscribe(
      (data:size[])=>{
        console.log(data);
        this.size_arr=data;
        this.size_dataSource = new MatTableDataSource(this.size_arr);

      }
    );
  }
  Add_size()
  {
      //this._router.navigate(['menu/add_category']);
      this._ac.params.pipe(takeUntil(this.destroy)).subscribe(params => {
        if(this.currentdialog)
        {
          this.currentdialog.close();
        }
        this.currentdialog=this.matDialog.open(AddSizeComponent,{
          data: {id : params.id}
        });
        this.currentdialog.afterClosed().subscribe(result => {
              console.log('the dailog was closed');


        })
      });
      this.ngOnInit();
  }
  SizeDelete(item:size) {
    this._ser.deleteSize(item).subscribe((data: any) => {
      console.log(data);
    });
  }
  Size_name_Update(item:size)
  {
   // this._router.navigate(['menu/update_category',item.Category_id]);

    this._ac.params.pipe(takeUntil(this.destroy)).subscribe(params => {
      if(this.currentdialog)
      {
        this.currentdialog.close();
      }
      this.currentdialog=this.matDialog.open(UpdateSizeComponent,{
        data: {id : item.Size_id}
      });
      this.currentdialog.afterClosed().subscribe(result => {
        console.log('the dailog was closed');

      })
    });
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.size_dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.size_dataSource.data.forEach(row => this.selection.select(row));
  }
  applyFilter(filterValue: string) {
    this.size_dataSource.filter = filterValue.trim().toLowerCase();
  }
  checkedItems(item:size) {
    if (this.size_delarr.find(x => x == item)) {
      this.size_delarr.splice(this.size_delarr.indexOf(item), 1);
    } else {
      this.size_delarr.push(item);
    }
    console.log(this.size_delarr);
  }
  i: number = 0;

  selectedDelete() {
    this._ser.deleteAll(this.size_delarr).subscribe((data: any) => {
      console.log(data);
      for (this.i = 0; this.i < this.size_delarr.length; this.i++) {
        if (this.size_list.find(x => x == this.size_delarr[this.i])) {
          this.size_list.splice(this.size_list.indexOf(this.size_delarr[this.i]), 1);
        }
      }
      this.size_dataSource.data = this.size_list;
    });
  }
}




