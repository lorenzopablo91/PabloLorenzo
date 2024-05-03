import { Component } from '@angular/core';
import { ProductListSchema } from './product-list.schema';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {
  productListData: any[] = [];

  productListSchema: ProductListSchema = new ProductListSchema();
}
