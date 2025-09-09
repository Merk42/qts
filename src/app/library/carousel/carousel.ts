import { NgClass, isPlatformBrowser, isPlatformServer } from '@angular/common';
import {
  PLATFORM_ID,
  ChangeDetectionStrategy,
  Component,
  contentChildren,
  ElementRef,
  input,
  OnInit,
  viewChild,
  ViewContainerRef,
  afterEveryRender,
  effect,
  inject,
  signal
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil, distinctUntilChanged } from 'rxjs/operators';

import { WindowResizeObserver } from '../../services/window-resize-observer';
import { CarouselConfig } from './carousel-config';
import { CarouselContent } from './carousel-content/carousel-content';
import { IconButton } from '../icon-button/icon-button';
@Component({
  selector: 'qts-carousel',
  imports: [NgClass, IconButton],
  templateUrl: './carousel.html',
  styleUrl: './carousel.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Carousel  implements OnInit {
	private ngUnsubscribe: Subject<any> = new Subject<any>();
	private windowResizeObserverService = inject(WindowResizeObserver);
	readonly groups = contentChildren(CarouselContent);
	readonly id = input<String>('');
	readonly title = input<String>('');
	readonly pane = viewChild.required<ElementRef>('pane');
	readonly carouselContents = viewChild.required('carouselContents', { read: ViewContainerRef });
	readonly config = input<CarouselConfig>(new CarouselConfig());
  readonly index = input<number>(1);

	currentIndex = signal<number>(0);
	prevIsDisabled = signal<boolean>(false);
	nextIsDisabled = signal<boolean>(false);
  isServerRendered = signal<boolean>(false);
	isContentRendered = signal<boolean>(false);
  platformId: Object;

	constructor() {
    const platformId = inject<Object>(PLATFORM_ID);

    this.platformId = platformId;
    afterEveryRender(() => {
			if (this.groups()?.length > 0 && !this.isContentRendered()) {
				this.isContentRendered.set(true);
				this.checkButtonStatus(this.currentIndex());
			}
		});
    effect(() =>{
      this.scrollTo(this.index());
    })
  }

  ngOnInit(): void {
		if (isPlatformServer(this.platformId)) {
			this.isServerRendered.set(true);
		} else {
			this.isServerRendered.set(false);
			this.windowBreakpointObserver();
		}
	}

	scrollTo(index: number) {
    if (isPlatformBrowser(this.platformId)) {
      const PANE = this.pane().nativeElement as HTMLElement;
      const ELEWIDTH = PANE.querySelectorAll('qts-carousel-content')[0].clientWidth;
      const GAP = 0
      // need to add OR subtract, from current scroll amount
      const SCROLLTO = (ELEWIDTH + GAP) * index;
      const isSmoothScrollSupported = 'scrollBehavior' in document.documentElement.style;
      if (isSmoothScrollSupported) {
        PANE.scroll({ left: SCROLLTO, behavior: 'smooth' });
      } else {
        PANE.scrollLeft = SCROLLTO;
      }
      this.currentIndex.set(index);
    }
	}

	windowBreakpointObserver() {
		this.windowResizeObserverService.breakpointGetter$
		.pipe(
			distinctUntilChanged(),
			takeUntil(this.ngUnsubscribe))
			.subscribe((breakpoint: string) => {
        if (breakpoint !== 'small' && this.groups()) {
          this.checkButtonStatus(this.currentIndex());
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
		if (this.prevIsDisabled()) {
			return
		}
		let GOTO = this.currentIndex() - Math.floor(this.numberItemsAcross());
		if (GOTO < 0) {
			GOTO = 0;
		}
		this.checkButtonStatus(GOTO);
		this.scrollTo(GOTO);
	}

	nextButton() {
		if (this.nextIsDisabled()) {
			return
		}
		let GOTO = this.currentIndex() + Math.floor(this.numberItemsAcross());
		// cannot have index be higher than length - number across!
		if (GOTO > this.groups().length - Math.floor(this.numberItemsAcross())) {
			GOTO = this.groups().length - Math.floor(this.numberItemsAcross()-1);
		}
		this.checkButtonStatus(GOTO);
		this.scrollTo(GOTO);
	}

	checkButtonStatus(GOTO: number) {
		if (GOTO === 0) {
			if (this.groups().length <= Math.floor(this.numberItemsAcross())) {
				this.nextIsDisabled.set(true);
			} else {
				this.nextIsDisabled.set(false);
			}
		} else {
			if (GOTO >= this.groups().length - Math.floor(this.numberItemsAcross())) { // or length - noScroll??
				this.nextIsDisabled.set(true);
			} else {
				this.nextIsDisabled.set(false);
			}
		}
		if (GOTO <= 0) {
			this.prevIsDisabled.set(true);
		} else {
			this.prevIsDisabled.set(false);
		}
	}

	ngOnDestroy() {
    this.ngUnsubscribe.next(true);
    this.ngUnsubscribe.complete();
  }
}
