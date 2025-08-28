import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvenGrid } from './even-grid';

describe('EvenGrid', () => {
  let component: EvenGrid;
  let fixture: ComponentFixture<EvenGrid>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EvenGrid]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvenGrid);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
