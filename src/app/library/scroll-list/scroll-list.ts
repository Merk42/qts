import { Component, ContentChild, ElementRef, TemplateRef, viewChild } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { Subject, debounceTime } from 'rxjs';

@Component({
  selector: 'qts-scroll-list',
  imports: [NgTemplateOutlet],
  templateUrl: './scroll-list.html',
  styleUrl: './scroll-list.scss'
})
export class ScrollList {
@ContentChild(TemplateRef) template!: TemplateRef<any>;
	readonly items = viewChild.required<ElementRef>('items');


  scrollAmount = new Subject<number>();

  constructor() {
    this.scrollAmount
      .pipe(debounceTime(300))
      .subscribe((scrolled: number) => {
        this.checkReset(scrolled);
      });
  }

  onScroll(event:Event) {
    // @ts-ignore
    const SC = event.target?.scrollLeft
    this.scrollAmount.next(SC);
  }

  checkReset(scroll:number){
    const PANE = this.items().nativeElement as HTMLElement;
    // @ts-ignore
    const TOTAL = PANE.scrollWidth;
    // @ts-ignore
    const SC = scroll;
    if (SC >= TOTAL / 2) {
      const SCROLLTO = SC - (TOTAL / 2);
      PANE.scrollLeft = SCROLLTO;
    }
  }
}
