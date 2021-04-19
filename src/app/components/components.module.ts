import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppNavigationComponent } from './app-navigation/app-navigation.component';
import { AppDashboardComponent } from './app-dashboard/app-dashboard.component';
import { AppTableComponent } from './app-table/app-table.component';
import { AppDialogComponent } from './app-dialog/app-dialog.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AppRoutingModule } from '../app-routing.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    AppNavigationComponent,
    AppDashboardComponent,
    AppTableComponent,
    AppDialogComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    NgxSpinnerModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatTableModule,
    MatButtonModule,
    MatSnackBarModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule
  ],
  exports: [
    AppNavigationComponent,
    AppDashboardComponent,
    AppTableComponent,
    AppDialogComponent
  ]
})
export class ComponentsModule { }
