import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  filterArticles,
  loadArticles,
} from '../../store/articles/articles.actions';
import { IArticle } from '../../models/interfaces/article.interface';
import {
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  Observable,
  Subject,
} from 'rxjs';
import {
  selectAllArticles,
  selectArticlesCount,
  selectArticlesLoading,
  selectFilteredArticles,
  selectFilteredArticlesCount,
  selectFilteredOffset,
  selectOffset,
} from '../../store/articles/articles.selectors';
import { NgClass } from '@angular/common';
import { ArticleCard } from '../../components/article-card/article-card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-articles',
  imports: [ArticleCard, MatProgressSpinnerModule, NgClass],
  templateUrl: './articles.html',
  styleUrl: './articles.scss',
})
export class Articles implements OnInit {
  private store = inject(Store);
  articles$: Observable<IArticle[]> = this.store.select(selectAllArticles);
  filteredArticles$: Observable<IArticle[]> = this.store.select(
    selectFilteredArticles
  );
  offset$: Observable<number> = this.store.select(selectOffset);
  filteredOffset$: Observable<number> = this.store.select(selectFilteredOffset);
  articlesCount$: Observable<number> = this.store.select(selectArticlesCount);
  filteredArticlesCount$: Observable<number> = this.store.select(
    selectFilteredArticlesCount
  );
  articles: IArticle[] = [];
  filteredArticles: IArticle[] = [];
  offset = 0;
  filteredOffset = 0;
  limit = 20;
  articlesCount = 0;
  filteredArticlesCount = 0;
  loading = false;
  private searchSubject = new Subject<string>();
  private destroyRef = inject(DestroyRef);
  currentSearch: string[] = [];

  ngOnInit(): void {
    this.store.dispatch(
      loadArticles({ limit: this.limit, offset: this.offset })
    );

    combineLatest([
      this.store.select(selectAllArticles),
      this.store.select(selectOffset),
      this.store.select(selectArticlesCount),
      this.store.select(selectArticlesLoading),
    ])
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(([articles, offset, count, loading]) => {
        this.articles = articles;
        this.offset = offset;
        this.articlesCount = count;
        this.loading = loading;
      });

    combineLatest([
      this.filteredArticles$,
      this.filteredOffset$,
      this.filteredArticlesCount$,
    ])
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(([filteredArticles, filteredOffset, filteredCount]) => {
        this.filteredArticles = filteredArticles;
        this.filteredOffset = filteredOffset;
        this.filteredArticlesCount = filteredCount;
      });

    this.searchSubject
      .pipe(
        debounceTime(800),
        distinctUntilChanged(),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((searchText) => {
        this.currentSearch = searchText.trim().split(/\s+/);
        this.store.dispatch(
          filterArticles({
            limit: this.limit,
            filteredOffset: this.filteredOffset,
            searchArray: this.currentSearch,
          })
        );
      });
  }

  onSearch(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchSubject.next(value);
  }

  onScroll(event: Event) {
    const target = event.target as HTMLElement;
    const threshold = 600;
    console.log('this.articles.length', this.articles.length);
    console.log('this.articlesCount', this.articlesCount);

    if (
      target.scrollTop + target.clientHeight >=
        target.scrollHeight - threshold &&
      this.articles.length < this.articlesCount &&
      !this.loading
    ) {
      this.loadMore();
    }
  }

  loadMore() {
    this.store.dispatch(
      loadArticles({ limit: this.limit, offset: this.offset + this.limit })
    );
  }

  onScrollFiltered(event: Event) {
    const target = event.target as HTMLElement;
    const threshold = 600;

    if (
      target.scrollTop + target.clientHeight >=
        target.scrollHeight - threshold &&
      this.filteredArticles.length < this.filteredArticlesCount &&
      !this.loading
    ) {
      this.store.dispatch(
        filterArticles({
          limit: this.limit,
          filteredOffset: this.filteredOffset + this.limit,
          searchArray: this.currentSearch,
        })
      );
    }
  }

  openExternal(url: string) {
    window.open(url, '_blank');
  }
}
