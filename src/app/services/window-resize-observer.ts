import { Injectable, NgZone, inject } from '@angular/core';
import { BehaviorSubject, fromEvent, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WindowResizeObserver {
	private zone = inject(NgZone);

	private breakpoint = new BehaviorSubject<string>('');
	private breakpoint$ = this.breakpoint.asObservable();
	private resizeObservable$!: Observable<Event>;

	/** Inserted by Angular inject() migration for backwards compatibility */
	constructor(...args: unknown[]);

  constructor() {
		this.zone.runOutsideAngular(() => {
			let innerWidth: number = window.innerWidth;
			let breakPoint: string = this.mapCurrentBreakPoint(innerWidth);
			if (breakPoint !== this.breakpointGetter) this.breakpointSetter = breakPoint;

			this.resizeObservable$ = fromEvent(window, 'resize');
			this.resizeObservable$
			.pipe(
				debounceTime(1500),
				distinctUntilChanged()
			).subscribe(() => {
				innerWidth = window.innerWidth;
				breakPoint = this.mapCurrentBreakPoint(innerWidth);
				if (breakPoint !== this.breakpointGetter) {
					this.zone.run(() => this.breakpointSetter = breakPoint);
				}
			});
		});
	}

	mapCurrentBreakPoint(pixelWidth: number) {
		if (pixelWidth <= 640) {
			return 'small';
		} else if (pixelWidth > 640 && pixelWidth <= 1024) {
			return 'medium';
		} else if (pixelWidth > 1024 && pixelWidth <= 1200) {
			return 'large';
		} else if (pixelWidth > 1200 && pixelWidth <= 1440) {
			return 'xlarge';
		} else {
			return 'xxlarge';
		}
	}

	// * Setters
	set breakpointSetter(breakpoint: string) {
		this.breakpoint.next(breakpoint);
	}

	// * Getters
	get breakpointGetter() {
		return this.breakpoint.value;
	}

	get breakpointGetter$() {
		return this.breakpoint$;
	}

	get resizeObservableGetter$() {
		return this.resizeObservable$;
	}
}
