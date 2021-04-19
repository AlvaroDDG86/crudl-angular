import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Routing
import { AppRoutingModule } from './app-routing.module';

// Views
import { AppComponent } from './app.component';

// Dialog
import { AppDialogComponent } from './components/app-dialog/app-dialog.component';

// Miscelania
import { HttpInterceptorInterceptor } from './interceptors/http-interceptor.interceptor'
import { NgxSpinnerModule } from "ngx-spinner";
import { CapitalDirective } from './directives/capital.directive';

// Material
import { LayoutModule } from '@angular/cdk/layout';
import { ViewsModule } from './views/views.module';
import { ComponentsModule } from './components/components.module';

@NgModule({
  declarations: [
    AppComponent,
    CapitalDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    HttpClientModule,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    ViewsModule,
    ComponentsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorInterceptor, multi: true }
  ],
  entryComponents: [AppDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
