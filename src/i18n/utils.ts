import { ui } from './ui';

const defaultLocale = 'ru';

export function getLangFromUrl(url: URL): keyof typeof ui {
  const [, lang] = url.pathname.split('/');
  if (lang in ui) return lang as keyof typeof ui;
  return defaultLocale;
}

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: keyof typeof ui['ru']) {
    return ui[lang][key] || ui[defaultLocale][key];
  }
}