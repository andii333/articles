import { createReducer, on } from '@ngrx/store';
import { IArticle } from '../../models/interfaces/article.interface';
import {
  loadArticlesSuccess,
  loadArticlesFailure,
  loadArticles,
  loadOneArticle,
  loadOneArticleFailure,
  loadOneArticleSuccess,
  clearFilterArticles,
  filterArticlesForTitleSuccess,
  filterArticlesForTitle,
  filterArticlesForTitleFailure,
  filterArticlesForSummarySuccess,
  filterArticlesForSummary,
  filterArticlesForSummaryFailure,
} from './articles.actions';
import { ArticleFilterTypeEnum } from '../../models/enums/article-filter-type.enum';

export interface ArticlesState {
  articles: IArticle[];
  offset: number;
  loading: boolean;
  activeArticle: IArticle | null;
  articlesCount: number;
  filteredArticles: IArticle[];
  filteredArticlesForTitleCount: number;
  filteredArticlesForSummaryCount: number;
  filteredTitleOffset: number;
  filteredSummaryOffset: number;
}

export const initialState: ArticlesState = {
  articles: [],
  offset: 0,
  loading: false,
  activeArticle: null,
  articlesCount: 0,
  filteredArticles: [],
  filteredArticlesForTitleCount: 0,
  filteredArticlesForSummaryCount: 0,
  filteredTitleOffset: 0,
  filteredSummaryOffset: 0,
};

export const articlesReducer = createReducer(
  initialState,
  on(loadArticles, (state, { offset }) => ({
    ...state,
    loading: true,
    offset,
  })),
  on(loadArticlesSuccess, (state, { articles, count }) => ({
    ...state,
    loading: false,
    articles: [...state.articles, ...articles],
    articlesCount: count,
  })),
  on(loadArticlesFailure, (state) => ({
    ...state,
    loading: false,
  })),

  on(loadOneArticle, (state) => ({
    ...state,
    loading: true,
  })),
  on(loadOneArticleSuccess, (state, { article }) => ({
    ...state,
    loading: false,
    activeArticle: article,
  })),
  on(loadOneArticleFailure, (state) => ({
    ...state,
    loading: false,
  })),

  on(filterArticlesForTitle, (state, { filteredOffset }) => ({
    ...state,
    loading: true,
    filteredTitleOffset: filteredOffset,
  })),
  on(
    filterArticlesForTitleSuccess,
    (state, { filteredArticles, titleCount }) => ({
      ...state,
      loading: false,
      filteredArticles: [...state.filteredArticles, ...filteredArticles],
      filteredArticlesForTitleCount: titleCount,
    })
  ),
  on(filterArticlesForTitleFailure, (state) => ({
    ...state,
    loading: false,
  })),

  on(filterArticlesForSummary, (state, { filteredOffset }) => ({
    ...state,
    loading: true,
    filteredSummaryOffset: filteredOffset,
  })),
  on(
    filterArticlesForSummarySuccess,
    (state, { filteredArticles, summaryCount }) => ({
      ...state,
      loading: false,
      filteredArticles: [...state.filteredArticles, ...filteredArticles],
      filteredArticlesForSummaryCount: summaryCount,
    })
  ),
  on(filterArticlesForSummaryFailure, (state) => ({
    ...state,
    loading: false,
  })),

  on(clearFilterArticles, (state) => ({
    ...state,
    filteredArticles: [],
    filteredTitleOffset: 0,
    filteredSummaryOffset: 0,
  }))
);
