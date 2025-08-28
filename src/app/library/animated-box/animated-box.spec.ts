import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimatedBox } from './animated-box';

describe('AnimatedBox', () => {
  let component: AnimatedBox;
  let fixture: ComponentFixture<AnimatedBox>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimatedBox]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimatedBox);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
