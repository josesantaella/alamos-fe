import { Image, Localization } from '../models';

export interface Post {
  id: number;
  title: string;
  content: string;
  description: string;
  created_at: string;
  updated_at: string;
  published_at: string;
  image: Image;
  slug: string;
  category: {
    name: string;
  };
  author: {
    name: string;
  };
  localizations: Localization[];
  locale: string;
}
