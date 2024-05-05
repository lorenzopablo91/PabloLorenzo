import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { NavbarComponent, ToastComponent } from './components';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthorIdInterceptorService } from './interceptors/author-id-interceptor.service';

@NgModule({
    declarations: [
        AppComponent
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthorIdInterceptorService,
            multi: true
        }
    ],
    bootstrap: [AppComponent],
    imports: [
        HttpClientModule,
        BrowserModule,
        AppRoutingModule,
        NavbarComponent,
        ToastComponent
    ]
})
export class AppModule { }
