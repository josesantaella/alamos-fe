export interface NavItem {
  text: string;
  to: string;
  external?: boolean;
}

export interface Locale {
  value: string;
  label: string;
  handler: () => void;
}

export interface Localization {
  active: string;
  locales: Locale[];
}
