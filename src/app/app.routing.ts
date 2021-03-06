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
import { CustomerOrderComponent } from './customer-order/customer-order.component';
import { WithdrawalComponent } from './withdraw/withdrawal/withdrawal.component';
import { SalaryManagementComponent } from './Employee/salary-management/salary-management.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthserviceService } from './authservice.service';
import { Notfound404Component } from './notfound404/notfound404.component';

const arr:Routes=[
    {path:'',component:LogInComponent},
    {path:"forgetpassword",component:ForgetpasswordComponent},
    {path:"changepassword",component:ChangePasswordComponent},
    //{path:"**",component:Notfound404Component},
    {path:"menu",component:MenuComponent,children:[
      {path:'',component:DashboardComponent,canActivate:[AuthserviceService]},
      {path:'customer_order',component:CustomerOrderComponent,canActivate:[AuthserviceService]},
      {path:'product_home',component:ProductHomeComponent,canActivate:[AuthserviceService]},
      {path:'add_product',component:AddProductComponent,canActivate:[AuthserviceService]},
      {path:'update_product/:id',component:UpdateProductComponent,canActivate:[AuthserviceService]},
      {path:"category_home",component:CategoryHomeComponent,canActivate:[AuthserviceService]},
      {path:"add_category",component:AddCategoryComponent,canActivate:[AuthserviceService]},
      {path:"update_category/:id",component:UpdateCategoryComponent,canActivate:[AuthserviceService]},
      {path:"add_supplier",component:AddSupplierComponent,canActivate:[AuthserviceService]},
      {path:"supplier_home",component:SupplierHomeComponent,canActivate:[AuthserviceService]},
      {path:"update_supplier/:id",component:UpdateSupplierComponent,canActivate:[AuthserviceService]},
      {path:"bill_home",component:BillComponent,canActivate:[AuthserviceService]},
      {path:"supplier_order",component:SupplierOrderComponent,canActivate:[AuthserviceService]},
      {path:"order_product",component:OrderProductComponent,canActivate:[AuthserviceService]},
      {path:"employee_home",component:EmployeeHomeComponent,canActivate:[AuthserviceService]},
      {path:"add_employee",component:AddEmployeeComponent,canActivate:[AuthserviceService]},
      {path:"update_employee/:email_id",component:UpdateEmployeeComponent,canActivate:[AuthserviceService]},
      {path:"supplier_order_status",component:SupplierOrderStatusComponent,canActivate:[AuthserviceService]},
      {path:"order_product",component:OrderProductComponent,canActivate:[AuthserviceService]},
      {path:"size_home",component:SizeHomeComponent,canActivate:[AuthserviceService]},
      {path:"order_product",component:OrderProductComponent,canActivate:[AuthserviceService]},
      {path:"update_size/:id",component:UpdateSizeComponent,canActivate:[AuthserviceService]},
      {path:"add_size",component:AddSizeComponent,canActivate:[AuthserviceService]},
      {path:"color_home",component:ColorHomeComponent,canActivate:[AuthserviceService]},
      {path:"add_color",component:AddColorComponent,canActivate:[AuthserviceService]},
      {path:"update_color/:id",component:UpdateColorComponent,canActivate:[AuthserviceService]},
      {path:"bill_details/:bill_id",component:BillDetalisComponent,canActivate:[AuthserviceService]},
      {path:"bill_details/:bill_id",component:BillDetalisComponent,canActivate:[AuthserviceService]},
      {path:"gen_bill",component:GenerateBillComponent,canActivate:[AuthserviceService]},
      {path:"customer_home",component:CustomerHomeComponent,canActivate:[AuthserviceService]},
      {path:"with_req",component:WithdrawalComponent,canActivate:[AuthserviceService]},
      {path:"salary",component:SalaryManagementComponent,canActivate:[AuthserviceService]},
     
    ]},


  ];

export const routing=RouterModule.forRoot(arr);
