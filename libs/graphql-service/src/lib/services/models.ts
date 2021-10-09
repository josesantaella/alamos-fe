export class Image {
  url: string;
  width: number;
  height: number;
  blurHash: string | undefined;
}

export interface Localization {
  id: number;
  slug: string;
  locale: string;
}

export interface Seo {
  metaTitle: string;
  metaDescription: string;
  shareImage: Image;
}
