import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { routing } from "./app.routing";
import { AddProductComponent } from "./product/add-product/add-product.component";
import { UpdateProductComponent } from './product/update-product/update-product.component';
import { FormsModule } from '@angular/forms';
import { MatCardModule,
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
  MatDialogModule
   } from '@angular/material';
   import { MatFormFieldModule } from "@angular/material/form-field";
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
import { SupplierOrderStatusComponent } from './supplier/supplier-order-status/supplier-order-status.component';
import { ChangePasswordComponent } from './change-password/change-password.component';



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
    SupplierOrderStatusComponent,
    ChangePasswordComponent,
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatTableModule,
    MatCheckboxModule,
    MatButtonModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatCardModule,
    MatDialogModule,
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


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
