import { Component } from '@angular/core';
import { ContentChild } from '@angular/core';
import { TemplateRef } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { viewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs';
import { map } from 'rxjs';
import { Subject } from 'rxjs';
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
    const WIDTH = PANE.offsetWidth;
    console.log("W", WIDTH);
    // @ts-ignore
    const SC = scroll;
    console.log("SC", SC);

    if (SC >= WIDTH) {

      const SCROLLTO = SC % WIDTH;
      PANE.scrollLeft = SCROLLTO;
    }
  }
}
