import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, delay, map, mergeMap, of } from 'rxjs';
import { ApiService } from '../../services/api-service';
import {
  loadArticles,
  loadArticlesSuccess,
  loadArticlesFailure,
  loadOneArticle,
  loadOneArticleFailure,
  loadOneArticleSuccess,
  filterArticles,
  filterArticlesSuccess,
  filterArticlesFailure,
} from './articles.actions';

@Injectable()
export class ArticlesEffects {
  private actions$ = inject(Actions);
  private apiService = inject(ApiService);

  loadArticles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadArticles),
      mergeMap(({ limit, offset }) =>
        this.apiService.getArticles(limit, offset).pipe(
          map((response) =>
            loadArticlesSuccess({
              articles: response.results,
              count: response.count,
            })
          ),
          catchError((error) => of(loadArticlesFailure({ error })))
        )
      )
    )
  );

  filterArticles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(filterArticles),
      mergeMap(({ limit, filteredOffset, searchArray }) =>
        this.apiService.searchArticle(searchArray, limit, filteredOffset).pipe(
          map((response) =>
            filterArticlesSuccess({
              filteredArticles: response.results,
              filteredArticlesCount: response.count,
            })
          ),
          catchError((error) => of(filterArticlesFailure({ error })))
        )
      )
    )
  );

  loadOneArticle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadOneArticle),
      mergeMap(({ id }) =>
        this.apiService.getOneArticle(id).pipe(
          map((response) => loadOneArticleSuccess({ article: response })),
          catchError((error) => of(loadOneArticleFailure({ error })))
        )
      )
    )
  );
}
