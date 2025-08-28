import { Component } from '@angular/core';
import { AnimatedBox } from '../library/animated-box/animated-box';
import { AnimatedData } from '../library/animated-data/animated-data';
import { Card } from '../library/card/card';
import { Carousel } from '../library/carousel/carousel';
import { CarouselConfig } from '../library/carousel/carousel-config';
import { CarouselContent } from '../library/carousel/carousel-content/carousel-content';
import { EvenGrid } from '../library/even-grid/even-grid';
import { SummaryLists } from '../library/summary-lists/summary-lists';
import { SummaryList } from '../library/summary-lists/summary-list/summary-list';

@Component({
  selector: 'qts-homepage',
  imports: [AnimatedBox, AnimatedData, Card, Carousel, CarouselContent, EvenGrid, SummaryList, SummaryLists],
  templateUrl: './homepage.html',
  styleUrl: './homepage.scss'
})
export class Homepage {
  carouselconfig: CarouselConfig = new CarouselConfig({small:2.25,medium:3,large:3, xlarge:3, xxlarge:3});
}
