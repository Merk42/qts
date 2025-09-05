import { AfterViewInit, Component, ContentChild, ElementRef, TemplateRef, viewChild } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { Subject, debounceTime } from 'rxjs';
import { IconButton } from "../icon-button/icon-button";

@Component({
  selector: 'qts-scroll-list',
  imports: [NgTemplateOutlet, IconButton],
  templateUrl: './scroll-list.html',
  styleUrl: './scroll-list.scss'
})
export class ScrollList implements AfterViewInit {
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
    const CONTENTWIDTH = PANE.scrollWidth / 3;
    // @ts-ignore
    const SC = scroll;
    if (SC >= CONTENTWIDTH * 2) {
      const SCROLLTO = SC - CONTENTWIDTH * 2;
      PANE.scrollLeft = SCROLLTO;
    }
    if (SC < CONTENTWIDTH) {
      const SCROLLTO = SC + CONTENTWIDTH;
      PANE.scrollLeft = SCROLLTO;
    }
  }

  ngAfterViewInit(): void {
    const PANE = this.items().nativeElement as HTMLElement;
    const CONTENTWIDTH = PANE.scrollWidth / 3;
    PANE.scrollLeft = CONTENTWIDTH;
  }

  scroll(direction:'left'|'right') {
    const PANE = this.items().nativeElement as HTMLElement;
    const ITEMWIDTH = (PANE.firstChild?.nextSibling as HTMLElement).offsetWidth
    let newPosition = PANE.scrollLeft;
    if (direction === 'left') {
      newPosition -= ITEMWIDTH
    } else {
      newPosition += ITEMWIDTH
    }
    PANE.scrollTo({
      left: newPosition,
      behavior: 'smooth'
    });
  }
}
