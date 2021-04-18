import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Routing
import { AppRoutingModule } from './app-routing.module';

// Views
import { AppComponent } from './app.component';
import { ListComponent } from './views/list/list.component';
import { AboutComponent } from './views/about/about.component';
import { MainComponent } from './views/main/main.component';
import { EditComponent } from './views/edit/edit.component';

// Components
import { AppNavigationComponent } from './components/app-navigation/app-navigation.component';
import { AppDashboardComponent } from './components/app-dashboard/app-dashboard.component';
import { AppTableComponent } from './components/app-table/app-table.component';
import { AppDialogComponent } from './components/app-dialog/app-dialog.component';

// Miscelania
import { HttpInterceptorInterceptor } from './interceptors/http-interceptor.interceptor'
import { NgxSpinnerModule } from "ngx-spinner";
import { CapitalDirective } from './directives/capital.directive';

// Material
import { LayoutModule } from '@angular/cdk/layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';


@NgModule({
  declarations: [
    AppComponent,
    AppNavigationComponent,
    AppDashboardComponent,
    AppTableComponent,
    AppDialogComponent,
    CapitalDirective,
    ListComponent,
    EditComponent,
    AboutComponent,
    MainComponent
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
    MatSelectModule,
    MatOptionModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorInterceptor, multi: true }
  ],
  entryComponents: [AppDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
