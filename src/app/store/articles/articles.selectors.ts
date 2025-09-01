import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ArticlesState } from './articles.reducer';

export const selectArticlesState =
  createFeatureSelector<ArticlesState>('articles');

export const selectAllArticles = createSelector(
  selectArticlesState,
  (state) => state.articles
);

export const selectOffset = createSelector(
  selectArticlesState,
  (state) => state.offset
);

export const selectArticlesLoading = createSelector(
  selectArticlesState,
  (state) => state.loading
);

export const selectOneArticle = createSelector(
  selectArticlesState,
  (state) => state.activeArticle
);

export const selectArticlesCount = createSelector(
  selectArticlesState,
  (state) => state.articlesCount
);

export const selectFilteredArticles = createSelector(
  selectArticlesState,
  (state: ArticlesState) => state.filteredArticles
);

export const selectFilteredArticlesCount = createSelector(
  selectArticlesState,
  (state: ArticlesState) => state.filteredArticlesCount
);

export const selectFilteredOffset = createSelector(
  selectArticlesState,
  (state: ArticlesState) => state.filteredOffset
);
