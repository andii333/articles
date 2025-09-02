import { Component, Input, OnInit, signal } from '@angular/core';
import { IArticle } from '../../models/interfaces/article.interface';
import { HighlightPipe } from '../../pipes/highlight-pipe';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-article-card',
  imports: [HighlightPipe, MatProgressSpinnerModule, DatePipe],
  templateUrl: './article-card.html',
  styleUrl: './article-card.scss',
})
export class ArticleCard implements OnInit {
  @Input() article!: IArticle;
  @Input() currentSearch!: string[];

  imageLoaded = signal(false);
  imageSrc = signal<string | null>(null);

  ngOnInit() {
    const url = this.article?.image_url || 'news.jpg';
    const img = new Image();
    img.src = url;

    img.onload = () => {
      this.imageSrc.set(url);
      this.imageLoaded.set(true);
    };

    img.onerror = () => {
      this.imageSrc.set('news.jpg');
      this.imageLoaded.set(true);
    };
  }

  getShortText(text: string, limit: number = 100): string {
    return text.length > limit ? text.slice(0, limit) + '…' : text;
  }
}
