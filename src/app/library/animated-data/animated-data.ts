import { Component, computed, effect, input, signal } from '@angular/core';
import { animationFrames } from 'rxjs';
import { map, takeWhile, endWith } from 'rxjs/operators';
import { IntersectionObserverDirective } from '../../services/intersection-observer';
import { IntersectionStatus } from '../../services/from-intersection-observer';
@Component({
  selector: 'qts-animated-data',
  imports: [IntersectionObserverDirective],
  templateUrl: './animated-data.html',
  styleUrl: './animated-data.scss'
})
export class AnimatedData {
  readonly number = input.required<number>();
  readonly prefix = input<string>('');
  readonly suffix = input<string>('');
  readonly format = input<string>();
  animatedCount = signal<number>(0);
  animatedDisplay = computed(() => {
    if (this.format() === ',') {
      return `${this.prefix()}${new Intl.NumberFormat().format(this.animatedCount())}${this.suffix()}`
    }
    if (this.format() === '$') {
      return `${this.prefix()}${new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(this.animatedCount())}${this.suffix()}`
    }
    return `${this.prefix()}${this.animatedCount()}${this.suffix()}`
  })
  shouldAnimate = signal<boolean>(false);

  constructor() {
    effect(() => {
      if (this.shouldAnimate()) {
        const startValue = 0;
        const endValue = this.number();
        const duration = 2000; // in milliseconds

        animationFrames().pipe(
          map(({ elapsed }) => elapsed / duration),
          takeWhile(progress => progress <= 1),
          endWith(1),
          map(progress => Math.round(startValue + (endValue - startValue) * progress))
        ).subscribe(value => {
          this.animatedCount.set(value);
        });
      }
    })
  }

  onVisibilityChanged(index: number, status: IntersectionStatus) {
    if (status === 'Visible') {
      this.shouldAnimate.set(true)
    }
  }
}
