import { Component } from '@angular/core';
import { AnimatedBox } from '../library/animated-box/animated-box';
import { AnimatedData } from '../library/animated-data/animated-data';
import { EvenGrid } from '../library/even-grid/even-grid';

@Component({
  selector: 'qts-homepage',
  imports: [AnimatedBox, AnimatedData, EvenGrid],
  templateUrl: './homepage.html',
  styleUrl: './homepage.scss'
})
export class Homepage {

}
