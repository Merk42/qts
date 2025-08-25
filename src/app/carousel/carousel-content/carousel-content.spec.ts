import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselContent } from './carousel-content';

describe('CarouselContent', () => {
  let component: CarouselContent;
  let fixture: ComponentFixture<CarouselContent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarouselContent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarouselContent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
