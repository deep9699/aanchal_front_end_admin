import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { AppComponent } from "./app.component";
import { routing } from "./app.routing";
import { AddProductComponent } from "./product/add-product/add-product.component";
import { UpdateProductComponent } from "./product/update-product/update-product.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
  MatCardModule,
  MatSortModule,
  MatProgressSpinnerModule,
  MatPaginatorModule,
  MatButtonModule,
  MatCheckboxModule,
  MatTableModule,
  MatInputModule,
  MatRadioModule,
  MatSelectModule,
  MatOptionModule,
  MatSidenavModule,
  MatToolbarModule,
  MatListModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatAutocompleteModule,

} from "@angular/material";

   import { MatFormFieldModule } from "@angular/material/form-field";


import { WithdrawalComponent } from "./withdraw/withdrawal/withdrawal.component";
import { MatStepperModule } from "@angular/material/stepper";

import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ProductHomeComponent } from './product/product-home/product-home.component';
import {MatIconModule} from '@angular/material/icon';
import { AddCategoryComponent } from './category/add-category/add-category.component';
import { CategoryHomeComponent } from './category/category-home/category-home.component';
import { UpdateCategoryComponent } from './category/update-category/update-category.component';
import { MenuComponent } from './menu/menu.component';
import { LayoutModule } from '@angular/cdk/layout';
import { AddSupplierComponent } from './supplier/add-supplier/add-supplier.component';
import { SupplierHomeComponent } from './supplier/supplier-home/supplier-home.component';
import { UpdateSupplierComponent } from './supplier/update-supplier/update-supplier.component';
import { LogInComponent } from './log-in/log-in.component';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { BillComponent } from './bill/bill.component';
import { SupplierOrderComponent } from './supplier/supplier-order/supplier-order.component';
import { OrderProductComponent } from './order-product/order-product.component';
import { EmployeeHomeComponent } from "./Employee/employee-home/employee-home.component";
import { AddEmployeeComponent } from './Employee/add-employee/add-employee.component';
import { UpdateEmployeeComponent } from './Employee/update-employee/update-employee.component';

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
import { SalaryManagementComponent } from './Employee/salary-management/salary-management.component';


import {MatGridListModule} from '@angular/material/grid-list';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChartsModule } from 'ng2-charts';


import { CustomerOrderComponent } from "./customer-order/customer-order.component";
import { Notfound404Component } from './notfound404/notfound404.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

@NgModule({
  declarations: [
    AppComponent,
    AddProductComponent,
    ProductHomeComponent,
    UpdateProductComponent,
    AddCategoryComponent,
    CategoryHomeComponent,
    UpdateCategoryComponent,
    MenuComponent,
    AddSupplierComponent,
    SupplierHomeComponent,
    UpdateSupplierComponent,
    LogInComponent,
    ForgetpasswordComponent,
    BillComponent,
    SupplierOrderComponent,
    OrderProductComponent,
    EmployeeHomeComponent,
    UpdateEmployeeComponent,
    AddEmployeeComponent,
    //SizeComponent,
    SupplierOrderStatusComponent,
    ChangePasswordComponent,
    SizeHomeComponent,
    UpdateSizeComponent,
    AddSizeComponent,
    ColorHomeComponent,
    AddColorComponent,
    UpdateColorComponent,
    BillDetalisComponent,
    GenerateBillComponent,
    CustomerHomeComponent,
    WithdrawalComponent,
    SalaryManagementComponent,
    DashboardComponent,

    CustomerOrderComponent,
    WithdrawalComponent,
    Notfound404Component,
    PagenotfoundComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatTableModule,
    MatCheckboxModule,
    MatButtonModule,
    MatDatepickerModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatCardModule,
    MatInputModule,
    MatAutocompleteModule,
    routing,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatOptionModule,
    MatSidenavModule,
    LayoutModule,
    MatToolbarModule,
    MatListModule,
    MatNativeDateModule,
    MatStepperModule,
    MatDatepickerModule,
    MatNativeDateModule,





    MatGridListModule,
    ChartsModule,

    MatStepperModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
