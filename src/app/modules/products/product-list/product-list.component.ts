import { Component } from '@angular/core';

import { Product } from 'src/app/models';
import { ProductListSchema } from './product-list.schema';
import { ProductsService } from '../products.service';
import { LoaderService, ToastService } from 'src/app/services';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {
  productListData: Array<Product> = [];

  productListSchema: ProductListSchema = new ProductListSchema();

  constructor(private productsService: ProductsService, private toastService: ToastService, private loaderService: LoaderService) {

  }

  ngOnInit(): void {
    this.getProductList();
  }

  getProductList() {
    this.loaderService.show();
    this.productsService.getProductList().subscribe(data => {
      this.loaderService.hide();
      if (!data) {
        this.toastService.addToast({ type: 'error', message: 'Se ha producido un error al obtener el listado de productos.' });
        return;
      }

      this.productListData = data;
    });
  }

}
