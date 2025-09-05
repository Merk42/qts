import { Component, input } from '@angular/core';

@Component({
  selector: '[qts-icon-button]',
  imports: [],
  templateUrl: './icon-button.html',
  styleUrl: './icon-button.scss',
  host: {
    '[class.next]':'name() === "next"',
    '[class.previous]':'name() === "previous"',
    '[class.plus]':'name() === "plus"',
    '[class.minus]':'name() === "minus"',
    '[attr.aria-label]':'name()',
  }
})
export class IconButton {
  readonly name = input.required<string>()
}
