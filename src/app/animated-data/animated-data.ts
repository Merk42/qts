import { Component, OnInit, computed, input, signal } from '@angular/core';
import { animationFrames } from 'rxjs';
import { map, takeWhile, endWith } from 'rxjs/operators';

@Component({
  selector: 'qts-animated-data',
  imports: [],
  templateUrl: './animated-data.html',
  styleUrl: './animated-data.scss'
})
export class AnimatedData implements OnInit{
  readonly number = input.required<number>();
  readonly prefix = input<string>('');
  readonly suffix = input<string>('');
  animatedCount = signal<number>(0);
  animatedDisplay = computed(() => {
    return `${this.prefix()}${new Intl.NumberFormat().format(this.animatedCount())}${this.suffix()}`
  })

  ngOnInit() {
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
}
