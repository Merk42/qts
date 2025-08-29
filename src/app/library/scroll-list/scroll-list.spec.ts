import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrollList } from './scroll-list';

describe('ScrollList', () => {
  let component: ScrollList;
  let fixture: ComponentFixture<ScrollList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScrollList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScrollList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
