import { Component, input } from '@angular/core';

@Component({
  selector: 'qts-article-summary',
  imports: [],
  templateUrl: './article-summary.html',
  styleUrl: './article-summary.scss',
  host: {
    '[class.alternate]': 'alternate()',
  }
})
export class ArticleSummary {
  readonly alternate = input<boolean>(false)
}
