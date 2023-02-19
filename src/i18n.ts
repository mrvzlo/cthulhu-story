import { WritableComputedRef } from 'vue';
import { createI18n, I18n, Locale, LocaleMessageValue, VueMessageType } from 'vue-i18n';
import { GetFromStorage } from './components/saving/storage.service';

export const translation = createI18n({
   locale: 'ru',
   globalInjection: true,
   legacy: false,
   fallbackLocale: 'ru',
});

type Translation = { [x: string]: Record<string, LocaleMessageValue<VueMessageType>> };

export async function UpdateLocale() {
   const locale = (translation.global.locale as WritableComputedRef<Locale>).value;
   const messages = await loadLocaleMessages();
   translation.global.setLocaleMessage(locale, messages[locale]);
}

async function loadLocaleMessages(): Promise<Translation> {
   const locales = await loadRelevantLocales();
   const messages: Translation = {};
   locales.keys().forEach((key) => {
      const matched = key.match(/([A-Za-z0-9-_]+)\./i);
      if (!matched || matched.length < 2) return;
      const locale = matched[1];
      messages[locale] = locales(key);
   });
   return messages;
}

async function loadRelevantLocales() {
   const gender = await GetFromStorage('gender', 'male');
   if (gender === 'male') return require.context('./locales/male', true, /[A-Za-z0-9-_,\s]+\.json$/i);
   else return require.context('./locales/female', true, /[A-Za-z0-9-_,\s]+\.json$/i);
}
