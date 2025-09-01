import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IApiArticlesResponse } from '../models/interfaces/api-response.interface';
import { IArticle } from '../models/interfaces/article.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly base = 'https://api.spaceflightnewsapi.net/v4/articles';
  http = inject(HttpClient);

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
    offset = 0
  ): Observable<IApiArticlesResponse> {
    return this.http.get<IApiArticlesResponse>(
      `${this.base}/?limit=${limit}&offset=${offset}&title_contains_one=${searchArray}&title_contains_one=${searchArray}`
    );
  }
}
