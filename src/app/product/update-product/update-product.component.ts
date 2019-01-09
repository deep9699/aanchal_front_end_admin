import { Component, OnInit, ViewChild } from "@angular/core";
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
  Product_image:string;
  selectedFile: File=null;
  imagesUrl: any[] = [];
  Product_price: number;
  product_data: product[]=[];
  category:category[]=[];
  id: number;
  flag:boolean=false;
  category_id:number;

image:File;


  constructor(
    private act_router: ActivatedRoute,
    private prod_ser: ProductService,
    private cat_ser: CategoryService,
    private _router: Router
  ) {}
  context=CanvasRenderingContext2D;
  @ViewChild("mycanvas") mycanvas;


  onChange(value):void {
    this.selectedFile = <File>value.target.files[0];
    if(this.selectedFile)
    {
      this.flag=true;
      let canvas=this.mycanvas.nativeElement;
      let context=canvas.getContext('2d');
      context.clearRect(0,0,200,200);

      var render=new FileReader();
      render.onload=function(event:any){
        var img=new Image();
        img.onload=function(){
          context.drawImage(img,0,0,218,180);
        };
        img.src=event.target.result;
      };
      render.readAsDataURL(value.target.files[0]);
    }
  }

  onclickUpdate()
  {
    const fd = new FormData();
    if(this.flag)
    {
      fd.append("Product_id",this.id.toString());
      fd.append("Product_name", this.Product_name);
      fd.append("Product_desc", this.Product_desc);
      fd.append("Fk_category_id", this.category_id.toString());
      fd.append("Product_price", this.Product_price.toString());
      fd.append("Product_image", this.selectedFile, this.selectedFile.name);
          this.prod_ser.updateProduct_image(fd).subscribe(
            (data:any)=>
            {
              console.log(data);
              this._router.navigate(['menu/product_home']);
            }
          );
    }
    else
    {
      this.prod_ser.updateProdut(new product(this.Product_name,this.Product_desc,this.category_id,this.Product_price,this.Product_image,this.id)).subscribe(
        (data:any)=>
        {
          console.log(data);
          this._router.navigate(['menu/product_home']);
        }
      );
    }
  }


  onclickCancle()
  {
    this._router.navigate(['menu/product_home']);
  }

  ngOnInit() {

    this.cat_ser.getAllCategory().subscribe((data: category[]) => {
      this.category = data;
    });
    this.id = this.act_router.snapshot.params["id"];
    this.prod_ser.getProductById(this.id).subscribe(
      (data: product[]) => {
        this.product_data = data;
        console.log(this.product_data[0].Fk_category_id);
        this.Product_image=this.product_data[0].Product_image;
        this.Product_name=this.product_data[0].Product_name;
        this.category_id=this.product_data[0].Fk_category_id;
        this.Product_desc=this.product_data[0].Product_desc;
        this.Product_price=this.product_data[0].Product_price;
        console.log(this.Product_image);
      });
  }
}
