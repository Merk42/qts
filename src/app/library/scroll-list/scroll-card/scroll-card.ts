import { Component, input } from '@angular/core';

@Component({
  selector: 'qts-scroll-card',
  imports: [],
  templateUrl: './scroll-card.html',
  styleUrl: './scroll-card.scss'
})
export class ScrollCard {
  readonly image = input.required<string>();
  readonly copy = input.required<string>();
  readonly ratio = input<string>('1');
}
