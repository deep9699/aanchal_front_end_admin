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
    keyPressText(event: any)
  {
    const pattern = /[A-Z\a-z\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    // console.log(inputChar, e.charCode);
       if (!pattern.test(inputChar) || this.Name.length>=20) {
       // invalid character, prevent input
           event.preventDefault();
      }
  }
  
keyPressNumber(event: any) {
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    // console.log(inputChar, e.charCode);
       if (!pattern.test(inputChar) || this.Mobile_no.length>=10) {
       // invalid character, prevent input
           event.preventDefault();
      }
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
            if(data.errno==1062)
            {
              alert("Email_id already exist");
            }
            this._router.navigate(['menu/supplier_home']);
          }
          );

      }
  }
