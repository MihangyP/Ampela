import 'intl-pluralrules';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import mgTranslation from '../locales/mg.json';
import frTranslation from '../locales/fr.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      mg: { translation: mgTranslation },
      fr: { translation: frTranslation }
    },
    lng: 'fr', // Langue par défaut
    fallbackLng: 'fr', // Langue de secours si la traduction n'est pas disponible
    debug: true,
    interpolation: { escapeValue: false } // Permet d'utiliser des balises HTML dans les traductions
});

export default i18n;

