import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AnimatedData } from './animated-data/animated-data';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AnimatedData,],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'qts';
}
