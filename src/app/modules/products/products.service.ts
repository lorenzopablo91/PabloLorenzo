import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';

import { Product, Toast } from 'src/app/models';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  url: string = environment.baseUrl + 'products';
  toasts: Toast[] = [];

  constructor(private http: HttpClient) { }

  getProductList() {
    return this.http.get<Product[]>(this.url, { observe: 'response' }).pipe(
      map((response: HttpResponse<any>) => {
        if (response.status === 200) {
          return response.body;
        } else {
          return false;;
        }
      }),
      catchError(error => {
        return of(false);
      })
    );
  }

  createProduct(obj: Product): Observable<boolean> {
    return this.http.post<Product>(this.url, obj).pipe(
      map((response: Product) => {
        return response ? true : false;
      }),
      catchError(error => {
        return of(false);
      })
    );
  }

  verifyId(id?: string): Observable<any> {
    return this.http.get<boolean>(this.url + '/verification?id=' + id).pipe(
      map((response: boolean) => {
        return response;
      }),
      catchError(error => {
        return of(true);
      })
    )
  }

}


