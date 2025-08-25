import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AnimatedData } from './animated-data/animated-data';
import { Card } from "./card/card";
import { Carousel } from './carousel/carousel';
import { CarouselContent } from './carousel/carousel-content/carousel-content';
import { CarouselConfig } from './carousel/carousel-config';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AnimatedData, Card, Carousel, CarouselContent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'qts';
  carouselconfig: CarouselConfig = new CarouselConfig({small:2.25,medium:3,large:3, xlarge:3, xxlarge:3});
}
