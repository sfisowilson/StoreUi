import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JwtModule } from '@auth0/angular-jwt';
import { LoginComponent } from './pages/login/login.component';
import { CustomersComponent } from './pages/customers/customers.component';
import { ProductsComponent } from './pages/products/products.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './pages/home/home.component';
import { SingleProductComponent } from './pages/products/single-product/single-product.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { InventoryComponent } from './pages/dashboard/inventory/inventory.component';
import { ManageProductComponent } from './pages/dashboard/manage-product/manage-product.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTabsModule} from '@angular/material/tabs';
import { CreateOrEditProductComponent } from './pages/dashboard/create-or-edit-product/create-or-edit-product.component';
import { MatSelectModule } from '@angular/material/select';

export function tokenGetter() {
  return localStorage.getItem("token");
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CustomersComponent,
    ProductsComponent,
    HomeComponent,
    SingleProductComponent,
    CategoriesComponent,
    DashboardComponent,
    InventoryComponent,
    ManageProductComponent,
    CreateOrEditProductComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["example.com"],
        disallowedRoutes: ["http://example.com/examplebadroute/"],
      },
    }),
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatTabsModule,
    MatSelectModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
