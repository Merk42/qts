import { Component, input } from '@angular/core';
import { Highlight } from 'ngx-highlightjs';

@Component({
  selector: 'section[qts-example]',
  imports: [Highlight],
  templateUrl: './example.html',
  styleUrl: './example.scss'
})
export class Example {
  name = input.required<string>();
  snippet = input<string>('');
}
