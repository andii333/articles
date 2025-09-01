import { Component, Input } from '@angular/core';
import { IArticle } from '../../models/interfaces/article.interface';

@Component({
  selector: 'app-article-card',
  imports: [],
  templateUrl: './article-card.html',
  styleUrl: './article-card.scss',
})
export class ArticleCard {
  @Input() article!: IArticle;
}
