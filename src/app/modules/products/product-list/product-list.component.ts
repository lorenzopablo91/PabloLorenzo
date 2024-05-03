import { Component } from '@angular/core';
import { ProductListSchema } from './product-list.schema';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {
  productListData: any[] = [];

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
