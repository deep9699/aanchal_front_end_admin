import { Router,RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from "../app/product/add-product/add-product.component";
import { ProductHomeComponent } from "../app/product/product-home/product-home.component";
import { UpdateProductComponent } from "../app/product/update-product/update-product.component";
import { AddCategoryComponent } from "../app/category/add-category/add-category.component";
import { CategoryHomeComponent } from "../app/category/category-home/category-home.component";
import { UpdateCategoryComponent } from "../app/category/update-category/update-category.component";


const arr:Routes=[
  {path:'product_home',component:ProductHomeComponent},
  {path:'add_product',component:AddProductComponent},
  {path:'update_product/:id',component:UpdateProductComponent},
  {path:"add_category",component:AddCategoryComponent},
  {path:"category_home",component:CategoryHomeComponent},
  {path:"update_category/:id",component:UpdateCategoryComponent}
];
export const routing=RouterModule.forRoot(arr);
