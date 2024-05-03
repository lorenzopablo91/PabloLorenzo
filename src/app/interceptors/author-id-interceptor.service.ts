import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthorIdInterceptorService implements HttpInterceptor{

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authorId = environment.authorId;
    if (!authorId || isNaN(authorId)) {
      return next.handle(req);
    }

    const authReq = req.clone({
      setHeaders: {
        'authorId': authorId.toString()
      }
    });

    return next.handle(authReq);
  }
}

