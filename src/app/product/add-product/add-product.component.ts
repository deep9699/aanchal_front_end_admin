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
import { TouchSequence } from "selenium-webdriver";

@Component({
  selector: "app-add-product",
  templateUrl: "./add-product.component.html",
  styleUrls: ["./add-product.component.css"]
})


export class AddProductComponent implements OnInit {
  constructor(private prod_ser: ProductService,private color_ser: ColorService,private size_ser: SizeService,private stock_ser: StockService,private sup_ser: SupplierService,private cat_ser:CategoryService,private _router:Router) {}

  Product_name: string;
  Fk_category_id: number;
  Product_desc: string;
  Product_price: number;
  Product_image: string;
  Fk_color_id: number;
  Fk_size_id: number;
  imagesUrl: any[] = [];
  Supplier_id: number;
  stock: stock[] = [];

  selectedFile: File=null;

  color_list: color[] = [];
  size_list: size[] = [];
  selected_sizes: size[] = [];
  selected_color: color[] = [];
  supplier_list: supplier[] = [];
  selected_suppliers: supplier;
  category_list:category[]=[];
  selected_categories:category;
  qty: number[] = [0];

  id: number;

  color_flag:boolean=false;
  size_flag:boolean=false;
  supplier_flag:boolean=false;


  extra_arr: extra[] = [];

  i: number;
  j: number;
  k: number;

  s: number = 0;
  onClickChange(i: number) {

    if (this.qty[i] < 0) {
      alert("Item can not less than 0");
      this.qty[i] = 0;
      console.log(i);
    }
  }
  onChange(value) {

    this.selectedFile = <File>value.target.files[0];
  }
  onclickCancle()
  {

    this._router.navigate(['product_home']);
  }
  onclickAdd()
  {
    console.log(this.selected_categories.Category_id)
    const fd = new FormData();
    fd.append("Product_name", this.Product_name);
    fd.append("Product_desc", this.Product_desc);
    fd.append("Fk_category_id", this.selected_categories.Category_id.toString());
    fd.append("Product_price", this.Product_price.toString());
    fd.append("Product_image", this.selectedFile, this.selectedFile.name);
    this.prod_ser.addProduct(fd).subscribe(
      (data: any) =>
      {

      console.log(this.selected_color.length);
      console.log(this.selected_sizes.length);
      this.id = data.insertId;
      for(this.i=0;this.i<this.extra_arr.length;this.i++)
      {
        if(this.qty[this.i]>0)
        {
          this.stock_ser.addStock(new stock(this.selected_suppliers.Supplier_id,this.extra_arr[this.i].size.Size_id,this.extra_arr[this.i].color.Color_id,this.id,this.qty[this.i])).subscribe(
            (data: any) => {
              console.log(data);
            });
        }

        }
        alert("product added successfully");
        this._router.navigate(['']);
      });


    }

  onCheckChangeColor(item: color) {
    this.color_flag=true;
    if (this.selected_color.find(x => x == item)) {
      this.selected_color.splice(this.selected_color.indexOf(item), 1);
    } else {
      this.selected_color.push(item);
    }
    if (this.selected_color.length != 0 && this.selected_sizes.length != 0) {
      this.extra_arr.splice(0,this.extra_arr.length);
      for (this.i = 0; this.i < this.selected_color.length; this.i++) {
        for (this.j = 0; this.j < this.selected_sizes.length; this.j++) {
          this.extra_arr.push(new extra(this.selected_color[this.i], this.selected_sizes[this.j], 0));
        }
      }
    }
    console.log(this.selected_color);
  }
  onCheckChangeSize(item: size) {
    this.size_flag=true;
    if (this.selected_sizes.find(x => x == item)) {
      this.selected_sizes.splice(this.selected_sizes.indexOf(item), 1);
    } else {
      this.selected_sizes.push(item);
    }
    if (this.selected_color.length != 0 && this.selected_sizes.length != 0) {
      this.extra_arr.splice(0,this.extra_arr.length);
      for (this.i = 0; this.i < this.selected_color.length; this.i++) {
        for (this.j = 0; this.j < this.selected_sizes.length; this.j++) {
          this.extra_arr.push(new extra(this.selected_color[this.i],this.selected_sizes[this.j],0)
          );
        }
      }
    }

    console.log(this.selected_sizes);
  }
  onCheckChangeSupplier(item: supplier) {
    this.supplier_flag=true;
    this.selected_suppliers = item;
    console.log(this.selected_suppliers);
  }
  ngOnInit() {
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
    this.cat_ser.getAllCategory().subscribe((data:category[])=>{
      this.category_list=data;
    })
  }
}
