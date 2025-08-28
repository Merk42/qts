import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryLists } from './summary-lists';

describe('SummaryLists', () => {
  let component: SummaryLists;
  let fixture: ComponentFixture<SummaryLists>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SummaryLists]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SummaryLists);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
