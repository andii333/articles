import { createReducer, on } from '@ngrx/store';
import { IArticle } from '../../models/interfaces/article.interface';
import {
  loadArticlesSuccess,
  loadArticlesFailure,
  loadArticles,
  loadOneArticle,
  loadOneArticleFailure,
  loadOneArticleSuccess,
  filterArticlesSuccess,
  filterArticlesFailure,
  filterArticles,
} from './articles.actions';

export interface ArticlesState {
  articles: IArticle[];
  offset: number;
  loading: boolean;
  activeArticle: IArticle | null;
  articlesCount: number;
  filteredArticles: IArticle[];
  filteredArticlesCount: number;
  filteredOffset: number;
}

export const initialState: ArticlesState = {
  articles: [],
  offset: 0,
  loading: false,
  activeArticle: null,
  articlesCount: 0,
  filteredArticles: [],
  filteredArticlesCount: 0,
  filteredOffset: 0,
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

  on(filterArticles, (state, { filteredOffset }) => ({
    ...state,
    loading: true,
    filteredOffset,
  })),
  on(
    filterArticlesSuccess,
    (state, { filteredArticles, filteredArticlesCount }) => ({
      ...state,
      loading: false,
      filteredArticles: [...state.filteredArticles, ...filteredArticles],
      filteredArticlesCount: filteredArticlesCount,
    })
  ),
  on(filterArticlesFailure, (state) => ({
    ...state,
    loading: false,
  }))
);
