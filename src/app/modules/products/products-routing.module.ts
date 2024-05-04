import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './product-list';
import { ProductFormComponent } from './product-form';

const routes: Routes = [
  {path : '' , component : ProductListComponent},
  {path : 'list' , component : ProductListComponent},
  {path : 'create' , component : ProductFormComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule  { }
