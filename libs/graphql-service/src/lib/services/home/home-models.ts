import { Seo } from '../models';

export interface Hero {
  title: string;
}

export interface HomePage {
  seo: Seo;
  hero: Hero;
}
