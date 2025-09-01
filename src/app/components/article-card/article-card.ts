import { Component, Input } from '@angular/core';
import { IArticle } from '../../models/interfaces/article.interface';
import { HighlightPipe } from '../../pipes/highlight-pipe';

@Component({
  selector: 'app-article-card',
  imports: [HighlightPipe],
  templateUrl: './article-card.html',
  styleUrl: './article-card.scss',
})
export class ArticleCard {
  @Input() article!: IArticle;
  @Input() currentSearch!: string[];
}
