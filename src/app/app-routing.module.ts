import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './views/list/list.component';
import { AboutComponent } from './views/about/about.component';
import { EditComponent } from './views/edit/edit.component';
import { MainComponent } from './views/main/main.component';

const routes: Routes = [
  { path: 'main', component: MainComponent },
  { path: 'list', component: ListComponent },
  { path: 'about', component: AboutComponent },
  { path: 'edit/:id', component: EditComponent },
  { path: '',   redirectTo: '/main', pathMatch: 'full' },
  { path: '**', component: MainComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
