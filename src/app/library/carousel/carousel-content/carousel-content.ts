import { Component, ElementRef, OnInit, inject } from '@angular/core';

@Component({
  selector: 'qts-carousel-content',
  imports: [],
  templateUrl: './carousel-content.html',
  styleUrl: './carousel-content.scss'
})
export class CarouselContent {
  private elementRef = inject(ElementRef);

  ngOnInit(): void {
		if (this.elementRef?.nativeElement) {
			this.elementRef.nativeElement.classList.add('carousel_item');
		}
	}
}
