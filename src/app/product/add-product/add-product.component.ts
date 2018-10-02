import { Component, OnInit } from "@angular/core";
import { product } from "../../classes/product_class";
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

@Component({
  selector: "app-add-product",
  templateUrl: "./add-product.component.html",
  styleUrls: ["./add-product.component.css"]
})


export class AddProductComponent implements OnInit {
  constructor(private prod_ser: ProductService,private color_ser: ColorService,private size_ser: SizeService,private stock_ser: StockService,private sup_ser: SupplierService,private cat_ser:CategoryService) {}

  Product_name: string;
  Fk_category_id: number;
  Product_desc: string;
  Product_price: number;
  Product_image: string;
  Fk_color_id: number;
  Fk_size_id: number;
  imagesUrl: any[] = [];
  Supplier_id: number;
  selectedFile: File = null;
  arr: product[] = [];
  color: color[] = [];
  size: size[] = [];
  sizes: size[] = [];
  colors: color[] = [];
  stock: stock[] = [];
  supplier: supplier[] = [];
  suppliers: supplier;
  category:category[]=[];
  categories:category;
  qty: number[] = [0];
  qtys: number;
  id: number;


  extra_arr: extra[] = [];

  i: number;
  j: number;
  k: number;

  s: number = 0;
  onClickChange(item: any, i: number) {
    if (this.qty[i] < 1) {
      alert("Item can not be 0");
      this.qty[i] = 1;
    }
  }
  onChange(value) {
    this.selectedFile = <File>value.target.files[0];
  }
  onclickAdd()
  {
    console.log(this.categories.Category_id)
    const fd = new FormData();
    fd.append("Product_name", this.Product_name);
    fd.append("Product_desc", this.Product_desc);
    fd.append("Fk_category_id", this.categories.Category_id.toString());
    fd.append("Product_price", this.Product_price.toString());
    fd.append("Product_image", this.selectedFile, this.selectedFile.name);
    this.prod_ser.addProduct(fd).subscribe(
      (data: any) =>
      {
      this.arr.push(new product(this.Product_name,this.Product_desc,this.categories.Category_id,this.Product_price,this.Product_image));
      console.log(this.colors.length);
      console.log(this.sizes.length);
      this.id = data.insertId;
      for(this.i=0;this.i<this.extra_arr.length;this.i++)
      {
          this.stock_ser.addStock(new stock(this.suppliers.Supplier_id,this.extra_arr[this.i].size.Size_id,this.extra_arr[this.i].color.Color_id,this.id,this.qty[this.i])).subscribe(
            (data: any) => {
              console.log(data);
            });
        }
        alert("product added successfully");
      });


    }

  onCheckChangeColor(item: color) {
    if (this.colors.find(x => x == item)) {
      this.colors.splice(this.colors.indexOf(item), 1);
    } else {
      this.colors.push(item);
    }
    if (this.colors.length != 0 && this.sizes.length != 0) {
      this.extra_arr.splice(0,this.extra_arr.length);
      for (this.i = 0; this.i < this.colors.length; this.i++) {
        for (this.j = 0; this.j < this.sizes.length; this.j++) {
          this.extra_arr.push(new extra(this.colors[this.i], this.sizes[this.j], 0));
        }
      }
    }
    console.log(this.colors);
  }
  onCheckChangeSize(item: size) {
    if (this.sizes.find(x => x == item)) {
      this.sizes.splice(this.sizes.indexOf(item), 1);
    } else {
      this.sizes.push(item);
    }
    if (this.colors.length != 0 && this.sizes.length != 0) {
      this.extra_arr.splice(0,this.extra_arr.length);
      for (this.i = 0; this.i < this.colors.length; this.i++) {
        for (this.j = 0; this.j < this.sizes.length; this.j++) {
          this.extra_arr.push(new extra(this.colors[this.i],this.sizes[this.j],0)
          );
        }
      }
    }

    console.log(this.sizes);
  }
  onCheckChangeSupplier(item: supplier) {
    this.suppliers = item;
    console.log(this.suppliers);
  }
  ngOnInit() {
    this.color_ser.getAllColor().subscribe((data: color[]) => {
      this.color = data;
      console.log(this.color);
    });
    this.size_ser.getAllSize().subscribe((data: size[]) => {
      this.size = data;
    });
    this.sup_ser.getAllSupplier().subscribe((data: supplier[]) => {
      this.supplier = data;
    });
    this.cat_ser.getAllCategory().subscribe((data:category[])=>{
      this.category=data;
    })
  }
}
