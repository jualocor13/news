import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewsComponent } from './news/news.component';
import { NewsArchivedComponent } from './news-archived/news-archived.component';


const routes: Routes = [
  {
    path: 'news',
    component: NewsComponent
  },
  {
    path: 'news-archived',
    component: NewsArchivedComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
