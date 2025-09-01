import {
  ChangeDetectorRef,
  Component,
  DestroyRef,
  inject,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { loadOneArticle } from '../../store/articles/articles.actions';
import { Observable } from 'rxjs';
import { IArticle } from '../../models/interfaces/article.interface';
import { selectOneArticle } from '../../store/articles/articles.selectors';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-one-article',
  imports: [AsyncPipe],
  templateUrl: './one-article.html',
  styleUrl: './one-article.scss',
})
export class OneArticle implements OnInit {
  private route = inject(ActivatedRoute);
  private store = inject(Store);
  private destroyRef = inject(DestroyRef);
  article$: Observable<IArticle | null> = this.store.select(selectOneArticle);

  ngOnInit(): void {
    this.route.params
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((params) =>
        this.store.dispatch(loadOneArticle({ id: +params['id'] }))
      );
  }
}
