import { Component, OnInit } from "@angular/core";
import { color } from "../../classes/color_class";
import { size } from "../../classes/size_class";
import { stock } from "../../classes/stock_class";
import { supplier } from "../../classes/supplier_class";
import { ProductService } from "../../Services/product.service";
import { ColorService } from "../../Services/color.service";
import { SizeService } from "../../Services/size.service";
import { StockService } from "../../Services/stock.service";
import { SupplierService } from "../../Services/supplier.service";
import { category } from "../../classes/category_class";
import { CategoryService } from "../../Services/category.service";
import { extra } from "../../classes/tmp_class";
import { Router } from "@angular/router";
import { product } from "../../classes/product_class";
import { Observable } from "../../../../node_modules/rxjs";
import { FormControl } from "../../../../node_modules/@angular/forms";
import { startWith, map } from "../../../../node_modules/rxjs/operators";
import { CustomerService } from "../../Services/customer.service";
import { cust } from "../../classes/customer_class";
import { temp } from "../../classes/temp1_class";
import { BillService } from "../../Services/bill.service";
import { bill } from "../../classes/bill_class";
import { bill_details } from "../../classes/bill_details_class";

export class updatestock {
  constructor(public Quantity: number, public Stock_id: number) {}
}

export class getsizeBycolorpro
{
  constructor(public color:string,public product_id:number){}
}

@Component({
  selector: "app-generate-bill",
  templateUrl: "./generate-bill.component.html",
  styleUrls: ["./generate-bill.component.css"]
})
export class GenerateBillComponent implements OnInit {
  constructor(
    private bill_ser: BillService,
    private cust_ser: CustomerService,
    private prod_ser: ProductService,
    private color_ser: ColorService,
    private size_ser: SizeService,
    private stock_ser: StockService,
    private sup_ser: SupplierService,
    private cat_ser: CategoryService,
    private _router: Router
  ) {}
  Product_name: string;
  Fk_category_id: number;
  Product_desc: string;
  Product_price: number;
  Product_image: string;
  Fk_color_id: number;
  Fk_size_id: number;
  numbers: string[] = [];
  imagesUrl: any[] = [];
  Supplier_id: number;
  stock: stock[] = [];

  selectedFile: File = null;
  product_list: product[] = [];
  color_list: color[] = [];
  size_list: size[] = [];
  selected_sizes: string;
  selected_color: color;
  sele_col: extra;
  supplier_list: supplier[] = [];
  selected_suppliers: supplier;
  category_list: category[] = [];
  selected_categories: category;
  selected_product: product;
  //qty: number[] = [0];
  temp_arr: temp[];
  id: number;
  total_qty: number;
  _qty: number;
  color_flag: boolean = false;
  size_flag: boolean = false;
  supplier_flag: boolean = false;

  extra_arr: temp[] = [];
  ex_arr: string[] = [];
  i: number;
  j: number;
  k: number;

  myControl = new FormControl();
  filteredOptions: Observable<string[]>;
  s: number = 0;
  Price: number = 0;
  dob: Date;
  Email_id:string="Aanchal1123@gamil.com";
  Address:string;
  cust_name: string="";
  selected_number: string;


  flag: number = 0;


  ids:number;
  qtys:number;
  x: number = 0;
  customer_id: number;
  product_id1: number;
  bill_id: number;
  product_id: number;
  amount: number;
  update_qty: number;
  bill_details1: bill_details[] = [];
  details: extra[] = [];
  Price1: number;
  sizebycolor: string[] = [];
  selected_qty: stock;
  date1:Date;
  password:string="Aanchal";
  Gender:string;

  stock_id: number[] = [];
  stock_id1: number;

  ngOnInit() {
    this.details=[];
    this.extra_arr=[];
    this._qty=1;


    this.cust_ser.getAllCustomer().subscribe((data: cust[]) => {
      console.log(data);
      for (this.i = 0; this.i < data.length; this.i++) {
        this.numbers.push(data[this.i].Mobile_no);
      }
      console.log(this.numbers);
    });

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(""),
      map(value => this._filter(value))
    );
    this.stock_ser.getAllStock().subscribe((data: stock[]) => {
      console.log(data);
    });

    this.color_ser.getAllColor().subscribe((data: color[]) => {
      this.color_list = data;
      console.log(this.color_list);
    });
    this.size_ser.getAllSize().subscribe((data: size[]) => {
      this.size_list = data;
    });
    this.sup_ser.getAllSupplier().subscribe((data: supplier[]) => {
      this.supplier_list = data;
    });
    this.cat_ser.getAllCategory().subscribe((data: category[]) => {
      this.category_list = data;
    });
    this.prod_ser.getAllProduct().subscribe((data: product[]) => {
      this.product_list = data;
    });
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.numbers.filter(
      option => option.toLowerCase().indexOf(filterValue) == 0
    );
  }

  onCheckChangeproduct(item: product) {
    this.Price = item.Product_price;
  }
  onChange(value) {
    this.selectedFile = <File>value.target.files[0];
  }

  onProduct_Add() {
    this.details = [];
    this.sizebycolor = [];
    console.log(this.stock_id1);

    this.Product_price = this.selected_product.Product_price;
    console.log(this.selected_product);

    this.extra_arr.push(
      new temp(this.selected_product,this.sele_col.color,this.selected_sizes,this._qty,this.Product_price * this._qty,this.stock_id1)
    );
    console.log(this.extra_arr);
    this.sizebycolor.splice(0, this.sizebycolor.length);
    this.stock_id.splice(0, this.stock_id.length);
    this.selected_product;
  }

  onclickSave() {
    for (this.i = 0; this.i < this.numbers.length; this.i++) {
      if (this.selected_number == this.numbers[this.i]) {
        this.flag = 1;
        break;
      }
    }
    for (this.i = 0; this.i < this.extra_arr.length; this.i++) {
      this.Price += this.extra_arr[this.i].price;
    }
    if (this.flag == 0) {
      this.cust_ser.addCustomer(new cust(0,this.Email_id,this.password,this.cust_name,this.Gender,this.selected_number,this.dob,this.Address,2)).subscribe
        ((data: any) => {
          console.log(data);
          this.cust_ser.getLastId().subscribe((data: cust[]) => {
            console.log(data);
            this.customer_id = data[0].Customer_id;
            console.log(this.customer_id);
            this.bill_ser.addBill(new bill(0, this.date1, this.Price, this.customer_id)).subscribe
              ((data: any) => {
                console.log(data);
                this.bill_id = data.insertId;
                for (this.i = 0; this.i < this.extra_arr.length; this.i++) {
                  this.product_id = this.extra_arr[this.i].product.Product_id;
                  this._qty = this.extra_arr[this.i].qty;
                  this.amount = this.extra_arr[this.i].price;
                  this.bill_details1.push(new bill_details(this.bill_id,this.customer_id,this.product_id,this._qty,this.amount)
                  );


                }
                this.bill_ser.addBillDetails(this.bill_details1).subscribe
                ((data: any) => {
                    console.log(data);
                  });
              });
          });
        });
    } else {
      this.cust_ser.getIdByMobileNo(this.selected_number).subscribe
        ((data: cust[]) => {
          console.log(data);
          this.customer_id = data[0].Customer_id;
          this.bill_ser.addBill(new bill(0, this.date1, this.Price, this.customer_id)).subscribe
            ((data: any) => {
              console.log(data);
              this.bill_id = data.insertId;
              for (this.i = 0; this.i < this.extra_arr.length; this.i++) {
                this.product_id = this.extra_arr[this.i].product.Product_id;
                this._qty = this.extra_arr[this.i].qty;
                this.amount = this.extra_arr[this.i].price;

                this.bill_details1.push(new bill_details(this.bill_id,this.customer_id,this.product_id,this._qty,this.amount)
                );
              }

              this.bill_ser.addBillDetails(this.bill_details1).subscribe
              ((data: any) => {
                  console.log(data);
                });
            });
        });
    }
    console.log(this.extra_arr);
    for (this.x = 0; this.x < this.extra_arr.length; this.x++) {
      this.qtys=this.extra_arr[this.x].qty;
      this.ids=this.extra_arr[this.x].id;
      console.log(this.ids);
      this.stock_ser.stockdetails(this.ids).subscribe
      ((data: stock[]) => {
          //console.log("success");
          console.log(data);
          this.update_qty = data[0].Quantity -this.qtys;
          console.log(this.update_qty);
          this.stock_ser.updateStock(new updatestock(this.update_qty,this.ids)).subscribe
          ((data: any) => {
              console.log(data);
            });
          //this.x++;
        });
    }
    alert('Thank You');
    this._router.navigate(["menu"]);


  }
  onclickAdd() {}
  onproductChange() {
    // console.log(this.selected_product);

    this.details.splice(0,this.details.length);
    this.stock_ser.getDetailsByProductid(this.selected_product.Product_id).subscribe
    ((data: any) => {
        //   console.log(data);
        for (this.k = 0; this.k < data.length; this.k++) {
          this.details.push(new extra(data[this.k].Color_name,data[this.k].Size_name,data[this.k].Quantity));
        }
        // console.log(this.details);
      });
  }
  onsizeChange() {
    console.log(this.selected_sizes);
    console.log(this.sizebycolor);
    //console.log(this.stock_id);
    //console.log(this.stock_id1);
    for (this.k = 0; this.k < this.sizebycolor.length; this.k++) {
      if (this.sizebycolor[this.k] == this.selected_sizes) {
        this.stock_id1 = this.stock_id[this.k];
      }
    }

    console.log(this.stock_id1);
  }
  oncolorChange() {
    console.log(this.sele_col);
    console.log(this.sele_col);
    this.sizebycolor.splice(0,this.sizebycolor.length);
    this.stock_ser.getsizeBycolor(new getsizeBycolorpro(this.sele_col.color,this.selected_product.Product_id)).subscribe
    ((data: any) => {
        console.log(data);

        for (this.k = 0; this.k < data.length; this.k++) {
          this.sizebycolor.push(data[this.k].Size_name);
          this.stock_id.push(data[this.k].Stock_id);
          this.total_qty = data[this.k].Quantity;
          console.log(this.total_qty);
        }
        console.log(this.stock_id);
        console.log(this.sizebycolor);
      });
  }
  onclickdelete(item, i) {
    this.extra_arr.splice(this.extra_arr.indexOf(item), 1);
    console.log(this.extra_arr);
  }

  onclickcreate(item, i) {
    console.log(item);
    this.selected_product = item.product;
    this.sele_col = item.color;
    this.selected_sizes = item.size;
    this._qty = item.qty;
  }

  onNumberChange()
  {
    console.log(this.selected_number)
    this.cust_ser.getIdByMobileNo(this.selected_number).subscribe((data:cust[])=>{
      console.log(data);
      this.Email_id=data[0].Email_id;
      this.cust_name=data[0].Name;
      this.Gender=data[0].Gender;
      this.Address=data[0].Gender;
      this.date1=data[0].DOB;

    }
    )


  }

  onclickreset()
  {
      this.ngOnInit();
  }
  onclickCancle()
  {
  }
}
