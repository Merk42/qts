import { Component, computed, input, signal } from '@angular/core';

@Component({
  selector: 'qts-animated-box',
  imports: [],
  templateUrl: './animated-box.html',
  styleUrl: './animated-box.scss',
   host: {
    '[style.--imgfronturl]': 'imgfronturl()',
    '[style.--imgbackurl]': 'imgbackurl()'
   }
})
export class AnimatedBox {
  isOpen = signal<boolean>(false);

  readonly imgfront = input.required<string>();
  readonly imgback = input.required<string>();
  readonly link = input<string>('');

  imgfronturl = computed(() => {
    return `url('${this.imgfront()}')`
  })

  imgbackurl = computed(() => {
    return `url('${this.imgback()}')`
  })
}
