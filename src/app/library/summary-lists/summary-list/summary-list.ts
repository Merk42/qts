import { Component, input } from '@angular/core';
import { Link } from "../../link/link";

@Component({
  selector: 'qts-summary-list',
  imports: [Link],
  templateUrl: './summary-list.html',
  styleUrl: './summary-list.scss'
})
export class SummaryList {
  readonly link = input.required<string>()
}
