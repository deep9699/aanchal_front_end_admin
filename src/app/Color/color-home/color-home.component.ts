import { Component, OnInit,ViewChild } from '@angular/core';
import { ColorService } from '../../Services/color.service';
import { color } from '../../classes/color_class';
import {MatTableDataSource} from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { PageEvent, MatPaginator } from "@angular/material";
import { MatSort } from "@angular/material/sort";
import { MatDialog, MatDialogRef} from '@angular/material';
import { takeUntil } from 'rxjs/operators';
import { SelectionModel } from "@angular/cdk/collections";
import { Subject } from "rxjs";
import { AddColorComponent } from '../add-color/add-color.component';
import { UpdateColorComponent } from '../update-color/update-color.component';
@Component({
  selector: 'app-color-home',
  templateUrl: './color-home.component.html',
  styleUrls: ['./color-home.component.css']
})
export class ColorHomeComponent implements OnInit {
  color_arr:color[];
  currentdialog:MatDialogRef<any>=null;
  destroy=new Subject<any>();
  color_list:color[]=[];
  color_delarr:color[]=[];
  length=100;
  pageSize=10;
  selection = new SelectionModel(true, []);
  color_dataSource=new MatTableDataSource();
  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;
  pageEvent: PageEvent;
flag:boolean=true;
  constructor(private matDialog:MatDialog,private _ac:ActivatedRoute,private _ser:ColorService,private route:Router) { }
  displayedColumns: string[] = ['Action1','Color_name','Action'];
  ngOnInit() {
    this.flag=true;

    this.color_dataSource.paginator=this.paginator;
    this.color_dataSource.sort=this.sort;
    this._ser.getAllColor().subscribe(
      (data:any)=>{
        console.log(data);
        this.color_arr=data;
        this.color_dataSource.data= data;

  }
);
}

  Add_Color()

  {
      //this._router.navigate(['menu/add_category']);
      this._ac.params.pipe(takeUntil(this.destroy)).subscribe(params => {
        if(this.currentdialog)
        {
          this.currentdialog.close();
          this.ngOnInit();
        }
        this.currentdialog=this.matDialog.open(AddColorComponent,{
          data: {id : params.id}
        });
        this.currentdialog.afterClosed().subscribe(result => {
          console.log('the dailog was closed');
          this.ngOnInit();

        })
      });
  }
  Delete_Color(item:color) {
    this._ser.deleteColor(item).subscribe((data: any) => {
      console.log(data);
      this.ngOnInit();
    });
  }
  Color_name_Update(item:color)
  {
   // this._router.navigate(['menu/update_category',item.Category_id]);

    this._ac.params.pipe(takeUntil(this.destroy)).subscribe(params => {
      if(this.currentdialog)
      {
        this.currentdialog.close();
        this.ngOnInit();
      }
      this.currentdialog=this.matDialog.open(UpdateColorComponent,{
        data: {id : item.Color_id}
      });
      this.currentdialog.afterClosed().subscribe(result => {
        console.log('the dailog was closed');
        this.ngOnInit();

      })
    });
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.color_dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.color_dataSource.data.forEach(row => this.selection.select(row));
  }
  applyFilter(filterValue: string) {
    this.color_dataSource.filter = filterValue.trim().toLowerCase();
    if(this.color_dataSource.filteredData.length==0)
    {
      //console.log('in1');
      this.flag=false;
    }
    else
    {
      this.flag=true;
    }
  }
  checkedItems(item:color) {
    if (this.color_delarr.find(x => x == item)) {
      this.color_delarr.splice(this.color_delarr.indexOf(item), 1);
    } else {
      this.color_delarr.push(item);
    }
    console.log(this.color_delarr);
  }
  i: number = 0;

  selectedDelete() {
    this._ser.deleteAll(this.color_delarr).subscribe((data: any) => {
      console.log(data);
      for (this.i = 0; this.i < this.color_delarr.length; this.i++) {
        if (this.color_list.find(x => x == this.color_delarr[this.i])) {
          this.color_list.splice(this.color_list.indexOf(this.color_delarr[this.i]), 1);
        }
      }
      this.color_dataSource.data = this.color_list;
      this.ngOnInit();
    });
  }

}
