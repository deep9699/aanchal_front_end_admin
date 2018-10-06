import { Component, OnInit } from "@angular/core";
import { product } from "../../classes/product_class";
import { ProductService } from "../../Services/product.service";
import { category } from "../../classes/category_class";
import { CategoryService } from "../../Services/category.service";
import { update_prod } from "../../classes/update_prod_class";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-update-product",
  templateUrl: "./update-product.component.html",
  styleUrls: ["./update-product.component.css"]
})
export class UpdateProductComponent implements OnInit {
  Product_name: string;
  Product_desc: string;
  Product_price: number;
  pro: product[]=[];
  category:category[]=[];
  id: number;

  category_id:number;




  constructor(
    private act_router: ActivatedRoute,
    private prod_ser: ProductService,
    private cat_ser: CategoryService,
    private _router: Router
  ) {}

  onclickUpdate()
  {
    this.prod_ser.updateProdut(new update_prod(this.id,this.Product_name,this.Product_desc,this.category_id,this.Product_price)).subscribe(
      (data:any)=>{
        console.log(data);
        this._router.navigate(['']);
      }
    );
  }
  onclickCancle()
  {
    this._router.navigate(['product_home']);
  }
  ngOnInit() {

    this.cat_ser.getAllCategory().subscribe((data: category[]) => {
      this.category = data;
    });
    this.id = this.act_router.snapshot.params["id"];
    this.prod_ser.getProductById(this.id).subscribe(
      (data: product[]) => {
        this.pro = data;
        console.log(this.pro[0].Fk_category_id)
        this.Product_name=this.pro[0].Product_name;
        this.category_id=this.pro[0].Fk_category_id;
        this.Product_desc=this.pro[0].Product_desc;
        this.Product_price=this.pro[0].Product_price;


      });
  }
}
