import { NgClass, isPlatformBrowser, isPlatformServer } from '@angular/common';
import {
  PLATFORM_ID,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  contentChildren,
  ElementRef,
  Inject,
  input,
  OnInit,
  QueryList,
  viewChild,
  ViewContainerRef,
  afterEveryRender,
  effect,
  inject
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil, distinctUntilChanged } from 'rxjs/operators';

import { WindowResizeObserver } from '../../services/window-resize-observer';
import { CarouselConfig } from './carousel-config';
import { CarouselContent } from './carousel-content/carousel-content';

@Component({
  selector: 'qts-carousel',
  imports: [NgClass],
  templateUrl: './carousel.html',
  styleUrl: './carousel.scss'
})
export class Carousel  implements OnInit {
	private ngUnsubscribe: Subject<any> = new Subject<any>();
	private windowResizeObserverService = inject(WindowResizeObserver);
	private changeDetectorRef = inject(ChangeDetectorRef);
	readonly groups = contentChildren(CarouselContent);
	readonly id = input<String>('');
	readonly title = input<String>('');
	readonly pane = viewChild.required<ElementRef>('pane');
	readonly carouselContents = viewChild.required('carouselContents', { read: ViewContainerRef });
	readonly config = input<CarouselConfig>(new CarouselConfig());
  readonly index = input<number>(1);

	currentIndex = 0;
	prevIsDisabled: boolean = false;
	nextIsDisabled: boolean = false;
  isServerRendered: boolean = false;
	isContentRendered: boolean = false;
  platformId: Object;

	/** Inserted by Angular inject() migration for backwards compatibility */
	constructor(...args: unknown[]);

	constructor() {
    const platformId = inject<Object>(PLATFORM_ID);

    this.platformId = platformId;
    afterEveryRender(() => {
			if (this.groups()?.length > 0 && !this.isContentRendered) {
				this.isContentRendered = true;
				this.checkButtonStatus(this.currentIndex);
			}
		});
    effect(() =>{
      this.scrollTo(this.index());
    })
  }

  ngOnInit(): void {
		if (isPlatformServer(this.platformId)) {
			this.isServerRendered = true;
		} else {
			this.isServerRendered = false;
			this.windowBreakpointObserver();
		}
	}

	scrollTo(index: number) {
    if (isPlatformBrowser(this.platformId)) {
      const PANE = this.pane().nativeElement as HTMLElement;
      const ELEWIDTH = PANE.querySelectorAll('qts-carousel-content')[0].clientWidth;
      // const WIDTH = PANE.clientWidth;
      const GAP = 0
      // need to add OR subtract, from current scroll amount
      const SCROLLTO = (ELEWIDTH + GAP) * index;
      const isSmoothScrollSupported = 'scrollBehavior' in document.documentElement.style;
      if (isSmoothScrollSupported) {
        PANE.scroll({ left: SCROLLTO, behavior: 'smooth' });
      } else {
        PANE.scrollLeft = SCROLLTO;
      }
      this.currentIndex = index;
    }
	}

	windowBreakpointObserver() {
		this.windowResizeObserverService.breakpointGetter$
		.pipe(
			distinctUntilChanged(),
			takeUntil(this.ngUnsubscribe))
			.subscribe((breakpoint: string) => {
        if (breakpoint !== 'small' && this.groups()) {
          this.checkButtonStatus(this.currentIndex);
        }
			});
	}

	currentBreakpoint(): 'small'|'medium'|'large'|'xlarge'|'xxlarge' {
		let innerWidth: number = window.innerWidth;
		return this.windowResizeObserverService.mapCurrentBreakPoint(innerWidth);
	}

	numberItemsAcross(): number {
		const SCREEN = this.currentBreakpoint();
		return this.config().pagination[SCREEN];
	}

	prevButton() {
		if (this.prevIsDisabled) {
			return
		}
		let GOTO = this.currentIndex - Math.floor(this.numberItemsAcross());
		if (GOTO < 0) {
			GOTO = 0;
		}

		this.checkButtonStatus(GOTO);
		this.scrollTo(GOTO);
	}

	nextButton() {
		if (this.nextIsDisabled) {
			return
		}
		let GOTO = this.currentIndex + Math.floor(this.numberItemsAcross());
		// cannot have index be higher than length - number across!
		if (GOTO > this.groups().length - Math.floor(this.numberItemsAcross())) {
			GOTO = this.groups().length - Math.floor(this.numberItemsAcross()-1);
		}
		// this.trackButtonClick();
		this.checkButtonStatus(GOTO);
		this.scrollTo(GOTO);
	}

	checkButtonStatus(GOTO: number) {
		if (GOTO === 0) {
			if (this.groups().length <= Math.floor(this.numberItemsAcross())) {
				this.nextIsDisabled = true;
			} else {
				this.nextIsDisabled = false;
			}
		} else {
			if (GOTO >= this.groups().length - Math.floor(this.numberItemsAcross())) { // or length - noScroll??
				this.nextIsDisabled = true;
			} else {
				this.nextIsDisabled = false;
			}
		}
		if (GOTO <= 0) {
			this.prevIsDisabled = true;
		} else {
			this.prevIsDisabled = false;
		}
		this.changeDetectorRef.markForCheck();
	}

	ngOnDestroy() {
    this.ngUnsubscribe.next(true);
    this.ngUnsubscribe.complete();
  }
}
