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

export const selectFilteredArticlesForTitleCount = createSelector(
  selectArticlesState,
  (state: ArticlesState) => state.filteredArticlesForTitleCount
);

export const selectFilteredArticlesForSummaryCount = createSelector(
  selectArticlesState,
  (state: ArticlesState) => state.filteredArticlesForSummaryCount
);

export const selectFilteredTitleOffset = createSelector(
  selectArticlesState,
  (state: ArticlesState) => state.filteredTitleOffset
);
export const selectFilteredSummaryOffset = createSelector(
  selectArticlesState,
  (state: ArticlesState) => state.filteredSummaryOffset
);
