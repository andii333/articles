import { Routes } from '@angular/router';
import { Articles } from './pages/articles/articles';
// import { OneArticle } from './pages/one-article/one-article';

export const routes: Routes = [
  { path: '', redirectTo: 'articles', pathMatch: 'full' },
  { path: 'articles', component: Articles },
  // { path: 'article/:id', component: OneArticle },
];
