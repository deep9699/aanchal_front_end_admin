import { Router,RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from "../app/product/add-product/add-product.component";
import { ProductHomeComponent } from "../app/product/product-home/product-home.component";
import { UpdateProductComponent } from "../app/product/update-product/update-product.component";
import { AddCategoryComponent } from "../app/category/add-category/add-category.component";
import { CategoryHomeComponent } from "../app/category/category-home/category-home.component";
import { UpdateCategoryComponent } from "../app/category/update-category/update-category.component";
import { AddSupplierComponent } from "../app/supplier/add-supplier/add-supplier.component";
import { SupplierHomeComponent } from "../app/supplier/supplier-home/supplier-home.component";
import { UpdateSupplierComponent } from './supplier/update-supplier/update-supplier.component';
import { ForgetpasswordComponent } from "./forgetpassword/forgetpassword.component";
import { MenuComponent } from "./menu/menu.component";
import { LogInComponent } from './log-in/log-in.component';
import { BillComponent } from "./bill/bill.component";
import { SupplierOrderComponent } from './supplier/supplier-order/supplier-order.component';
import { OrderProductComponent } from './order-product/order-product.component';




const arr:Routes=[
    {path:'',component:LogInComponent},
    {path:"forgetpassword",component:ForgetpasswordComponent},
    {path:"menu",component:MenuComponent,children:[
      {path:'product_home',component:ProductHomeComponent},
      {path:'add_product',component:AddProductComponent},
      {path:'update_product/:id',component:UpdateProductComponent},
      {path:"category_home",component:CategoryHomeComponent},
      {path:"add_category",component:AddCategoryComponent},
      {path:"update_category/:id",component:UpdateCategoryComponent},
      {path:"add_supplier",component:AddSupplierComponent},
      {path:"supplier_home",component:SupplierHomeComponent},
      {path:"update_supplier/:id",component:UpdateSupplierComponent},
      {path:"bill_home",component:BillComponent},
      {path:"supplier_order",component:SupplierOrderComponent},
      {path:"order_product",component:OrderProductComponent}
    ]},


  ];

export const routing=RouterModule.forRoot(arr);
