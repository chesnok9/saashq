import 'server-only';

const dictionaries = {
  en: () => import('./locales/en.json').then((module) => module.default),
  cz: () => import('./locales/cz.json').then((module) => module.default),
  de: () => import('./locales/de.json').then((module) => module.default),
  uk: () => import('./locales/uk.json').then((module) => module.default),
  ko: () => import('./locales/ko.json').then((module) => module.default),
  tr: () => import('./locales/tr.json').then((module) => module.default),
};

export type SupportLanguageDict = keyof typeof dictionaries;

export const getDictionary = async (locale: SupportLanguageDict) =>
  dictionaries[locale]();
