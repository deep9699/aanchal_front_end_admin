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
import { EmployeeHomeComponent } from "./Employee/employee-home/employee-home.component";
import { AddEmployeeComponent } from "./Employee/add-employee/add-employee.component";
import { UpdateEmployeeComponent } from "./Employee/update-employee/update-employee.component";
import { SupplierOrderStatusComponent } from './supplier/supplier-order-status/supplier-order-status.component';
import { ChangePasswordComponent } from './change-password/change-password.component';



import { SizeHomeComponent } from './Size/size-home/size-home.component';
import { UpdateSizeComponent } from './Size/update-size/update-size.component';
import { AddSizeComponent } from './Size/add-size/add-size.component';
import { ColorHomeComponent } from './Color/color-home/color-home.component';
import { AddColorComponent } from './Color/add-color/add-color.component';
import { UpdateColorComponent } from './Color/update-color/update-color.component';
import { BillDetalisComponent } from './bill/bill-detalis/bill-detalis.component';
import { GenerateBillComponent } from './bill/generate-bill/generate-bill.component';
import { CustomerHomeComponent } from './customer/customer-home/customer-home.component';
import { WithdrawalComponent } from './withdraw/withdrawal/withdrawal.component';

const arr:Routes=[
    {path:'',component:LogInComponent},
    {path:"forgetpassword",component:ForgetpasswordComponent},
    {path:"changepassword",component:ChangePasswordComponent},
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
      {path:"order_product",component:OrderProductComponent},
      {path:"employee_home",component:EmployeeHomeComponent},
      {path:"add_employee",component:AddEmployeeComponent},
      {path:"update_employee/:email_id",component:UpdateEmployeeComponent},
      {path:"supplier_order_status",component:SupplierOrderStatusComponent},
      {path:"order_product",component:OrderProductComponent},
      {path:"size_home",component:SizeHomeComponent},
      {path:"order_product",component:OrderProductComponent},
      {path:"update_size/:id",component:UpdateSizeComponent},
      {path:"add_size",component:AddSizeComponent},
      {path:"color_home",component:ColorHomeComponent},
      {path:"add_color",component:AddColorComponent},
      {path:"update_color/:id",component:UpdateColorComponent},
      {path:"bill_details/:id",component:BillDetalisComponent},
      {path:"gen_bill",component:GenerateBillComponent},
      {path:"customer_home",component:CustomerHomeComponent},
      {path:"with_req",component:WithdrawalComponent}
    ]},


  ];

export const routing=RouterModule.forRoot(arr);
