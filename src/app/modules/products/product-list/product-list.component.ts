import { Component } from '@angular/core';
import { ProductListSchema } from './product-list.schema';
import { ProductsService } from '../products.service';
import { Product } from 'src/app/models/product.interface';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {
  productListData: Array<Product> = [];

  productListSchema: ProductListSchema = new ProductListSchema();

  constructor(private productsService: ProductsService) {

  }

  ngOnInit(): void {
    this.getProductList();
  }

  getProductList() {
    this.productsService.getProductList().subscribe(data => {
        if (!data) {
            // mostrar msj 'Se ha producido un error al obtener el listado de productos'
            return;
        }

        this.productListData = data;
    });
}

}
