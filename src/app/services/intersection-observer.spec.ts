import { TestBed } from '@angular/core/testing';

import { IntersectionObserver } from './intersection-observer';

describe('IntersectionObserver', () => {
  let service: IntersectionObserver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IntersectionObserver);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
