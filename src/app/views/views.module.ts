import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { AboutComponent } from './about/about.component';
import { ListComponent } from './list/list.component';
import { EditComponent } from './edit/edit.component';
import { MainComponent } from './main/main.component';
import { ComponentsModule } from '../components/components.module';
import { MatListModule } from '@angular/material/list';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    AboutComponent,
    ListComponent,
    EditComponent,
    MainComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatOptionModule,
    MatListModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule
  ],
  exports: [
    AboutComponent,
    ListComponent,
    EditComponent,
    MainComponent
  ]
})
export class ViewsModule { }
