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
  MatSidenavModule, MatToolbarModule, MatListModule,


   } from '@angular/material';
   import { MatFormFieldModule } from "@angular/material/form-field";
   import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductHomeComponent } from './product/product-home/product-home.component';
import {MatIconModule} from '@angular/material/icon';
import { AddCategoryComponent } from './category/add-category/add-category.component';
import { CategoryHomeComponent } from './category/category-home/category-home.component';
import { UpdateCategoryComponent } from './category/update-category/update-category.component';
import { MenuComponent } from './menu/menu.component';
import { LayoutModule } from '@angular/cdk/layout';



@NgModule({
  declarations: [
    AppComponent,
    AddProductComponent,
    ProductHomeComponent,
    UpdateProductComponent,
    AddCategoryComponent,
    CategoryHomeComponent,
    UpdateCategoryComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
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
