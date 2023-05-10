import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { CustomersComponent } from './pages/customers/customers.component';
import { AuthGuard } from './auth.guard';
import { ProductsComponent } from './pages/products/products.component';
import { HomeComponent } from './pages/home/home.component';
import { SingleProductComponent } from './pages/products/single-product/single-product.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { InventoryComponent } from './pages/dashboard/inventory/inventory.component';
import { ManageProductComponent } from './pages/dashboard/manage-product/manage-product.component';
import { CreateOrEditProductComponent } from './pages/dashboard/create-or-edit-product/create-or-edit-product.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'customers', component: CustomersComponent, canActivate: [AuthGuard]},
  {path: 'products', component: ProductsComponent},
  {path: 'products/:id', component: SingleProductComponent},
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: 'inventory',
        component: InventoryComponent,
        outlet: 'dashboard'
      },
      {
        path: 'manage-products',
        component: ManageProductComponent,
        outlet: 'dashboard'
      },
      {
        path: 'create-or-edit-product/:id',
        component: CreateOrEditProductComponent,
        outlet: 'dashboard'
      },
      {
        path: 'create-or-edit-product',
        component: CreateOrEditProductComponent,
        outlet: 'dashboard'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
