import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

@Component({
  selector: 'qts-card',
  imports: [],
  templateUrl: './card.html',
  styleUrl: './card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Card {
  readonly date = input.required<string>();
  readonly tags = input<string[]>([]);

  formattedDate = computed(() => {
    const date = new Date(this.date() + 'T12:00:00Z');
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date)
  })
}
