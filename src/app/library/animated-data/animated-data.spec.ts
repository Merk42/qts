import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimatedData } from './animated-data';

describe('AnimatedData', () => {
  let component: AnimatedData;
  let fixture: ComponentFixture<AnimatedData>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimatedData]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimatedData);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
