import { Component } from '@angular/core';
import { EvenGrid } from '../library/even-grid/even-grid';
import { Link } from "../library/link/link";
@Component({
  selector: 'qts-globe',
  imports: [EvenGrid, Link],
  templateUrl: './globe.html',
  styleUrl: './globe.scss',
  host: {
    class: 'midwidth'
  }
})
export class Globe {

}
