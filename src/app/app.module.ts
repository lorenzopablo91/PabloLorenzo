import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { LoaderComponent, NavbarComponent, ToastComponent } from './components';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthorIdInterceptorService, LoaderInterceptor } from './interceptors';

@NgModule({
    declarations: [
        AppComponent
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthorIdInterceptorService,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: LoaderInterceptor,
            multi: true
          }
    ],
    bootstrap: [AppComponent],
    imports: [
        HttpClientModule,
        BrowserModule,
        AppRoutingModule,
        NavbarComponent,
        ToastComponent,
        LoaderComponent
    ]
})
export class AppModule { }
