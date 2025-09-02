import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  clearFilterArticles,
  filterArticlesForSummary,
  filterArticlesForTitle,
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
  selectFilteredArticlesForSummaryCount,
  selectFilteredArticlesForTitleCount,
  selectFilteredSummaryOffset,
  selectFilteredTitleOffset,
  selectOffset,
} from '../../store/articles/articles.selectors';
import { ArticleCard } from '../../components/article-card/article-card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ApiService } from '../../services/api-service';

@Component({
  selector: 'app-articles',
  imports: [ArticleCard, MatProgressSpinnerModule],
  templateUrl: './articles.html',
  styleUrl: './articles.scss',
})
export class Articles implements OnInit {
  private store = inject(Store);
  private apiService = inject(ApiService);
  articles$: Observable<IArticle[]> = this.store.select(selectAllArticles);
  articlesCount$: Observable<number> = this.store.select(selectArticlesCount);
  offset$: Observable<number> = this.store.select(selectOffset);

  filteredArticles$: Observable<IArticle[]> = this.store.select(
    selectFilteredArticles
  );
  filteredTitleOffset$: Observable<number> = this.store.select(
    selectFilteredTitleOffset
  );
  filteredSummaryOffset$: Observable<number> = this.store.select(
    selectFilteredSummaryOffset
  );
  filteredArticlesForTitleCount$: Observable<number> = this.store.select(
    selectFilteredArticlesForTitleCount
  );
  filteredArticlesForSummaryCount$: Observable<number> = this.store.select(
    selectFilteredArticlesForSummaryCount
  );
  resultsForTitleAmountSignal = this.apiService.resultsForTitleAmountSignal;
  resultsForSummaryAmountSignal = this.apiService.resultsForSummaryAmountSignal;

  articles: IArticle[] = [];
  filteredArticles: IArticle[] = [];
  offset = 0;
  filteredSummaryOffset = 0;
  filteredTitleOffset = 0;
  limit = 10;
  articlesCount = 0;
  filteredArticlesForTitleCount = 0;
  filteredArticlesForSummaryCount = 0;
  loading = false;
  threshold = 1100;
  private searchSubject = new Subject<string>();
  private destroyRef = inject(DestroyRef);
  currentSearch: string[] = [];

  ngOnInit(): void {
    this.initArticlesLoad();
    this.initArticlesSubscription();
    this.initFilteredArticlesSubscription();
    this.initSearchSubscription();
  }

  private initArticlesLoad(): void {
    this.store.dispatch(
      loadArticles({ limit: this.limit, offset: this.offset })
    );
  }

  private initArticlesSubscription(): void {
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
  }

  private initFilteredArticlesSubscription(): void {
    combineLatest([
      this.filteredArticles$,
      this.filteredSummaryOffset$,
      this.filteredTitleOffset$,
      this.filteredArticlesForTitleCount$,
      this.filteredArticlesForSummaryCount$,
    ])
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(
        ([
          filteredArticles,
          filteredSummaryOffset,
          filteredTitleOffset,
          filteredArticlesForTitleCount,
          filteredArticlesForSummaryCount,
        ]) => {
          this.filteredArticles = filteredArticles;
          this.filteredSummaryOffset = filteredSummaryOffset;
          this.filteredTitleOffset = filteredTitleOffset;
          this.filteredArticlesForTitleCount = filteredArticlesForTitleCount;
          this.filteredArticlesForSummaryCount =
            filteredArticlesForSummaryCount;
        }
      );
  }

  private initSearchSubscription(): void {
    this.searchSubject
      .pipe(
        debounceTime(800),
        distinctUntilChanged(),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((searchText) => {
        this.currentSearch = searchText.trim().split(/\s+/).filter(Boolean);
        if (this.currentSearch.length) {
          this.store.dispatch(clearFilterArticles());
          this.apiService.gerResultsAmount(this.currentSearch);
          this.store.dispatch(
            filterArticlesForTitle({
              limit: this.limit,
              filteredOffset: 0,
              searchArray: this.currentSearch,
            })
          );
        }
      });
  }

  onSearch(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchSubject.next(value);
  }

  scroll($event: Event): void {
    this.currentSearch.length
      ? this.onScrollFiltered($event)
      : this.onScroll($event);
  }

  private onScroll(event: Event) {
    const target = event.target as HTMLElement;

    if (
      target.scrollTop + target.clientHeight >=
        target.scrollHeight - this.threshold &&
      this.articles.length < this.articlesCount &&
      !this.loading
    ) {
      this.store.dispatch(
        loadArticles({ limit: this.limit, offset: this.offset + this.limit })
      );
    }
  }
  private onScrollFiltered(event: Event) {
    const target = event.target as HTMLElement;
    if (
      target.scrollTop + target.clientHeight >=
        target.scrollHeight - this.threshold &&
      this.filteredArticles.length < this.filteredArticlesForTitleCount &&
      !this.loading
    ) {
      this.store.dispatch(
        filterArticlesForTitle({
          limit: this.limit,
          filteredOffset: this.filteredTitleOffset + this.limit,
          searchArray: this.currentSearch,
        })
      );
    }

    if (
      this.resultsForSummaryAmountSignal() &&
      target.scrollTop + target.clientHeight >=
        target.scrollHeight - this.threshold &&
      this.filteredArticles.length !==
        this.resultsForSummaryAmountSignal()! +
          this.filteredArticlesForTitleCount &&
      !this.loading &&
      this.filteredArticles.length >= this.filteredArticlesForTitleCount
    ) {
      this.store.dispatch(
        filterArticlesForSummary({
          limit: this.limit,
          filteredOffset:
            this.filteredArticles.length !== this.filteredArticlesForTitleCount
              ? this.filteredSummaryOffset + this.limit
              : 0,
          searchArray: this.currentSearch,
        })
      );
    }
  }

  openExternal(url: string) {
    window.open(url, '_blank');
  }
}
