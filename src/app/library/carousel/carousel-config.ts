export class CarouselConfig {
	pagination: Breakpoints;
  constructor (screens?: Breakpoints) {
    this.pagination = {
      small: screens?.small ? screens.small : DEFAULT_PAGINATION.small,
      medium: screens?.medium ? screens.medium : DEFAULT_PAGINATION.medium,
      large: screens?.large ? screens.large : DEFAULT_PAGINATION.large,
      xlarge: screens?.xlarge ? screens.xlarge : DEFAULT_PAGINATION.xlarge,
      xxlarge: screens?.xxlarge ? screens.xxlarge : DEFAULT_PAGINATION.xxlarge
    }
  }
}

export interface Breakpoints {
  small: number;
  medium: number;
	large: number;
	xlarge: number;
	xxlarge: number;
}

export const DEFAULT_PAGINATION: Breakpoints = {
	small: 2.5,
	medium: 4,
	large: 5,
	xlarge: 5,
	xxlarge: 5
}
