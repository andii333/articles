import { createAction, props } from '@ngrx/store';
import { IArticle } from '../../models/interfaces/article.interface';
import { ArticleFilterTypeEnum } from '../../models/enums/article-filter-type.enum';

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

export const filterArticlesForTitle = createAction(
  '[Articles] Filter Articles For Title',
  props<{
    limit: number;
    filteredOffset: number;
    searchArray: string[];
  }>()
);
export const filterArticlesForTitleSuccess = createAction(
  '[Articles] Filter Articles For Title Success',
  props<{
    filteredArticles: IArticle[];
    titleCount: number;
  }>()
);
export const filterArticlesForTitleFailure = createAction(
  '[Articles] Filter Articles For Title Failure',
  props<{ error: any }>()
);

export const filterArticlesForSummary = createAction(
  '[Articles] Filter Articles For Summary',
  props<{
    limit: number;
    filteredOffset: number;
    searchArray: string[];
  }>()
);
export const filterArticlesForSummarySuccess = createAction(
  '[Articles] Filter Articles For Summary Success',
  props<{
    filteredArticles: IArticle[];
    summaryCount: number;
  }>()
);
export const filterArticlesForSummaryFailure = createAction(
  '[Articles] Filter Articles For Summary Failure',
  props<{ error: any }>()
);

export const clearFilterArticles = createAction(
  '[Articles] Clear Filter Articles'
);
