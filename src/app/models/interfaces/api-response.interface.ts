import { IArticle } from './article.interface';

export interface IApiArticlesResponse {
  count: number;
  next: string;
  previous: string;
  results: IArticle[];
}
