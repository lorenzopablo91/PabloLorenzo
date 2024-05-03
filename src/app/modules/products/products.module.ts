import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridComponent } from 'src/app/components/grid/grid.component';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductListComponent } from './product-list';



@NgModule({
  declarations: [
    ProductListComponent 
  ],
  imports: [
    CommonModule,
    GridComponent,
    ProductsRoutingModule
  ]
})
export class ProductsModule { }
