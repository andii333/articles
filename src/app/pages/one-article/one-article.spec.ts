import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneArticle } from './one-article';

describe('OneArticle', () => {
  let component: OneArticle;
  let fixture: ComponentFixture<OneArticle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OneArticle]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OneArticle);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
