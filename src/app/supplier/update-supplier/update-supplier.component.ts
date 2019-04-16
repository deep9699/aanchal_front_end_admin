import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { supplier } from '../../classes/supplier_class';
import { SupplierService } from '../../Services/supplier.service';

@Component({
  selector: 'app-update-supplier',
  templateUrl: './update-supplier.component.html',
  styleUrls: ['./update-supplier.component.css']
})
export class UpdateSupplierComponent implements OnInit {
  Email_id:string;
  Password1:string;
  Password:string;
  Name:string;
  Mobile_no:string;
  Address:string;
  arr_supplier:supplier[];
  Supplier_id:number;
  constructor(private _http:SupplierService,private act_router:ActivatedRoute,private _router:Router) { }

  ngOnInit() {
    this.Supplier_id= this.act_router.snapshot.params['id'];
    this._http.getSupplierById(this.Supplier_id).subscribe(
      (data:supplier[])=>{
       this.Supplier_id=data[0].Supplier_id;
       this.Email_id=data[0].Email_id;
       this.Name=data[0].Name;
       this.Password=data[0].Password;
       this.Address=data[0].Address;
       this.Mobile_no=data[0].Mobile_no;
       console.log(data);
      }
    );
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

onsave()
{
  this._http.updatesupplier(new supplier(this.Supplier_id,this.Email_id,this.Name,this.Address,this.Password,this.Mobile_no),this.Supplier_id).subscribe(
    (data:any)=>{
      console.log(data);
      this._router.navigate(['menu/supplier_home']);
    }
  );

}
}
