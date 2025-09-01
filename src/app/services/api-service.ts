import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { IApiArticlesResponse } from '../models/interfaces/api-response.interface';
import { IArticle } from '../models/interfaces/article.interface';
import { ArticleFilterTypeEnum } from '../models/enums/article-filter-type.enum';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly base = 'https://api.spaceflightnewsapi.net/v4/articles';
  http = inject(HttpClient);
  resultsForTitleAmountSignal = signal<number | null>(null);
  resultsForSummaryAmountSignal = signal<number | null>(null);

  getArticles(limit = 10, offset = 0): Observable<IApiArticlesResponse> {
    return this.http.get<IApiArticlesResponse>(
      `${this.base}/?limit=${limit}&offset=${offset}`
    );
  }
  getOneArticle(articleId: number): Observable<IArticle> {
    return this.http.get<IArticle>(`${this.base}/${articleId}`);
  }

  searchArticle(
    searchArray: string[],
    limit = 10,
    offset = 0,
    filterType: ArticleFilterTypeEnum
  ): Observable<IApiArticlesResponse> {
    let params = new HttpParams()
      .set('limit', limit.toString())
      .set('offset', offset.toString())
      .set(
        filterType === ArticleFilterTypeEnum.Title
          ? 'title_contains_one'
          : 'summary_contains_one',
        searchArray.join(',')
      );
    return this.http.get<IApiArticlesResponse>(`${this.base}`, { params });
  }

  gerResultsAmount(searchArray: string[]): void {
    this.http
      .get<IApiArticlesResponse>(
        `${this.base}?limit=1&offset=0&title_contains_one=${searchArray}`
      )
      .pipe(tap((res) => this.resultsForTitleAmountSignal.set(res.count)))
      .subscribe();
    this.http
      .get<IApiArticlesResponse>(
        `${this.base}?limit=1&offset=0&summary_contains_one=${searchArray}`
      )
      .pipe(tap((res) => this.resultsForSummaryAmountSignal.set(res.count)))
      .subscribe();
  }
}
