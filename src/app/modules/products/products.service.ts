import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Product } from 'src/app/models/product.interface';
import { Observable } from 'rxjs/internal/Observable';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  url: string = environment.baseUrl + 'products';

  constructor(private http: HttpClient) { }

  getProductList() {
    return this.http.get<Product[]>(this.url);
  }

  createProduct(obj: Product): Observable<any> {
    return this.http.post(this.url, obj);
  }

  verifyId(id?: string): Observable<any>{
    return this.http.get<boolean>(this.url + '/verification?id=' + id);
  }

}


