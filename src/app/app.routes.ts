import { Routes } from '@angular/router';
import { Examples } from './examples/examples';
import { Homepage } from './homepage/homepage';
export const routes: Routes = [
  { path: '', component: Examples},
  { path: 'library', component: Examples},
];
