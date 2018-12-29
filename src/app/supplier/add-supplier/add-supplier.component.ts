import { Component, OnInit } from '@angular/core';
import { supplier } from "../../classes/supplier_class";
import { SupplierService } from "../../Services/supplier.service";
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-supplier',
  templateUrl: './add-supplier.component.html',
  styleUrls: ['./add-supplier.component.css']
})
export class AddSupplierComponent implements OnInit {
  Email_id:string;
  Password:string;
  Name:string;
  Mobile_no:string;
  Address:string;
    constructor(private sup_ser:SupplierService,private _router:Router) { }

    ngOnInit() {
    }
    onclickCancle()
    {
      this._router.navigate(['menu/supplier_home']);
    }
      onsignup()
      {
        this.sup_ser.addSupplier(new supplier(0,this.Email_id,this.Name,this.Address,this.Password,this.Mobile_no)).subscribe(
          (data:any)=>{
            console.log(data);
            this._router.navigate(['menu/supplier_home']);
          }
          );

      }
  }
