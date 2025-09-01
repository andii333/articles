import { createAction, props } from '@ngrx/store';
import { IArticle } from '../../models/interfaces/article.interface';

export const loadArticles = createAction(
  '[Articles] Load Articles',
  props<{ limit: number; offset: number }>()
);
export const loadArticlesSuccess = createAction(
  '[Articles] Load Articles Success',
  props<{ articles: IArticle[]; count: number }>()
);
export const loadArticlesFailure = createAction(
  '[Articles] Load Articles Failure',
  props<{ error: any }>()
);

export const loadOneArticle = createAction(
  '[One Article] Load One Article',
  props<{ id: number }>()
);
export const loadOneArticleSuccess = createAction(
  '[One Article] Load One Article Success',
  props<{ article: IArticle }>()
);
export const loadOneArticleFailure = createAction(
  '[One Article] Load One Article Failure',
  props<{ error: any }>()
);

export const filterArticles = createAction(
  '[Articles] Filter Articles',
  props<{ limit: number; filteredOffset: number; searchArray: string[] }>()
);
export const filterArticlesSuccess = createAction(
  '[Articles] Filter Articles Success',
  props<{ filteredArticles: IArticle[]; filteredArticlesCount: number }>()
);
export const filterArticlesFailure = createAction(
  '[Articles] Filter Articles Failure',
  props<{ error: any }>()
);
