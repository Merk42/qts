import { TestBed } from '@angular/core/testing';

import { WindowResizeObserver } from './window-resize-observer';

describe('WindowResizeObserver', () => {
  let service: WindowResizeObserver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WindowResizeObserver);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
