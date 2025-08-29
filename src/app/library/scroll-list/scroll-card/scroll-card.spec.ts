import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrollCard } from './scroll-card';

describe('ScrollCard', () => {
  let component: ScrollCard;
  let fixture: ComponentFixture<ScrollCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScrollCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScrollCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
