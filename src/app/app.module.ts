import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AppNavigationComponent } from './components/app-navigation/app-navigation.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { AppDashboardComponent } from './components/app-dashboard/app-dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { ListComponent } from './views/list/list.component';
import { EditComponent } from './views/edit/edit.component';
import { AboutComponent } from './views/about/about.component';
import { MainComponent } from './views/main/main.component';
import { AppTableComponent } from './components/app-table/app-table.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppDialogComponent } from './components/app-dialog/app-dialog.component';
import { HttpInterceptorInterceptor } from './interceptors/http-interceptor.interceptor'
import { NgxSpinnerModule } from "ngx-spinner";
import { CapitalDirective } from './directives/capital.directive';
import { TablaBorrarComponent } from './tabla-borrar/tabla-borrar.component';


@NgModule({
  declarations: [
    AppComponent,
    AppNavigationComponent,
    AppDashboardComponent,
    ListComponent,
    EditComponent,
    AboutComponent,
    MainComponent,
    AppTableComponent,
    AppDialogComponent,
    CapitalDirective,
    TablaBorrarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    HttpClientModule,
    LayoutModule,
    MatToolbarModule,
    MatDialogModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorInterceptor, multi: true }
  ],
  entryComponents: [AppDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
