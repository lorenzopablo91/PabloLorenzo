import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsRoutingModule } from './products-routing.module';
import { SearchPlusComponent, GridComponent } from 'src/app/components';
import { ProductListComponent } from './product-list';
import { ProductFormComponent } from './product-form';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ProductListComponent,
    ProductFormComponent
  ],
  imports: [
    CommonModule,
    GridComponent,
    ProductsRoutingModule,
    SearchPlusComponent,
    ReactiveFormsModule
  ],
})

export class ProductsModule { }
