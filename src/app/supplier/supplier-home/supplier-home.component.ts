import { Component, OnInit,ViewChild } from '@angular/core';
import {PageEvent,MatPaginator} from '@angular/material';
import { supplier } from '../../classes/supplier_class';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { SupplierService } from '../../Services/supplier.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-supplier-home',
  templateUrl: './supplier-home.component.html',
  styleUrls: ['./supplier-home.component.css']
})
export class SupplierHomeComponent implements OnInit {
  supplier_arr:supplier[]=[];
  supplier_delarr:supplier[]=[];
  i:number=0;
  length = 100;
  pageSize = 10;
  //selection = new SelectionModel(true, []);

  Supplier_dataSource=new MatTableDataSource();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  pageEvent: PageEvent;
  displayedColumns: string[] = ['Action1','Name', 'Mobile_no','Action'];

  constructor(private sup_ser:SupplierService,private _router:Router) { }

  ngOnInit() {
    this.Supplier_dataSource.paginator=this.paginator;

    this.Supplier_dataSource.sort = this.sort;
    this.sup_ser.getAllSupplier().subscribe(
      (data:supplier[])=>{
        this.supplier_arr=data ;
        console.log(this.supplier_arr);
        this.Supplier_dataSource.data=this.supplier_arr;
      }
    );
  }
  onclickSupplieradd()
  {
    this._router.navigate(['menu/add_supplier']);
  }
  applyFilter(filterValue: string) {
    this.Supplier_dataSource.filter = filterValue.trim().toLowerCase();
  }
  selectedSupplier(item:supplier){
    if(this.supplier_delarr.find(x=>x==item))
    {
    this.supplier_delarr.splice(this.supplier_delarr.indexOf(item),1)
    }
    else{
    this.supplier_delarr.push(item);
    }
    console.log(this.supplier_delarr);
    }
    onSupplier_Update(item:supplier) {
      console.log(item);
      this._router.navigate(["menu/update_supplier", item.Supplier_id]);
    }


    selectedDelete(){
      this.sup_ser.deleteMultiSupplier(this.supplier_delarr).subscribe(

      (data:any)=>{

        console.log(data);
      for(this.i=0;this.i<this.supplier_delarr.length;this.i++)
      {
      if(this.supplier_arr.find(x=>x==this.supplier_delarr[this.i]))
      {
      this.supplier_arr.splice(this.supplier_arr.indexOf(this.supplier_delarr[this.i]),1);
      }
      }
      this.Supplier_dataSource.data=this.supplier_arr;
      }
      );
      }

      delete_supplier(item:supplier)
      {
        console.log(item);
          this.sup_ser.deleteSupplier(item).subscribe(
            (data:any)=>{
              this.supplier_arr.splice(this.supplier_arr.indexOf(item),1);
                console.log(data);
            }
          );
      }

}
