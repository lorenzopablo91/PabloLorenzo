import { Component } from '@angular/core';

import { Toast, Product } from 'src/app/models';
import { ProductListSchema } from './product-list.schema';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {
  productListData: Array<Product> = [];

  productListSchema: ProductListSchema = new ProductListSchema();

  toasts: Toast[] = [];

  constructor(private productsService: ProductsService) {

  }

  ngOnInit(): void {
    this.getProductList();
  }

  showToast(type: string, message: string) {
    this.toasts.push({ type, message });
  }

  getProductList() {
    this.productsService.getProductList().subscribe(data => {
      if (!data) {
        this.showToast('error', 'Se ha producido un error al obtener el listado de productos.')
        return;
      }

      this.productListData = data;
    });
  }

}
