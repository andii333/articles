import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { ApiService } from '../../services/api-service';
import {
  loadArticles,
  loadArticlesSuccess,
  loadArticlesFailure,
  loadOneArticle,
  loadOneArticleFailure,
  loadOneArticleSuccess,
  filterArticlesForTitle,
  filterArticlesForSummary,
  filterArticlesForTitleFailure,
  filterArticlesForTitleSuccess,
  filterArticlesForSummarySuccess,
  filterArticlesForSummaryFailure,
} from './articles.actions';
import { ArticleFilterTypeEnum } from '../../models/enums/article-filter-type.enum';

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

  filterArticlesForTitle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(filterArticlesForTitle),
      mergeMap(({ limit, filteredOffset, searchArray }) =>
        this.apiService
          .searchArticle(
            searchArray,
            limit,
            filteredOffset,
            ArticleFilterTypeEnum.Title
          )
          .pipe(
            map((response) =>
              filterArticlesForTitleSuccess({
                filteredArticles: response.results,
                titleCount: response.count,
              })
            ),
            catchError((error) => of(filterArticlesForTitleFailure({ error })))
          )
      )
    )
  );

  filterArticlesForSummary$ = createEffect(() =>
    this.actions$.pipe(
      ofType(filterArticlesForSummary),
      mergeMap(({ limit, filteredOffset, searchArray }) =>
        this.apiService
          .searchArticle(
            searchArray,
            limit,
            filteredOffset,
            ArticleFilterTypeEnum.Summary
          )
          .pipe(
            map((response) =>
              filterArticlesForSummarySuccess({
                filteredArticles: response.results,
                summaryCount: response.count,
              })
            ),
            catchError((error) =>
              of(filterArticlesForSummaryFailure({ error }))
            )
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
