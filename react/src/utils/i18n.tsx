/*
 * @Author: fantiga
 * @Date: 2022-06-28 10:39:12
 * @LastEditTime: 2023-02-04 18:31:40
 * @LastEditors: fantiga
 * @Description:
 * @FilePath: /2048-react/react/src/utils/i18n.tsx
 */

// import 'i18next';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// declare custom type options so the return is always a string.
declare module 'i18next' {
  interface CustomTypeOptions {
    returnNull: false;
  }
}

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
import en_US from '../languages/en-US.json';
import zh_CN from '../languages/zh-CN.json';
import zh_TW from '../languages/zh-TW.json';
import ja_JP from '../languages/ja-JP.json';

const resources = {
  en_US: {
    translation: en_US,
  },
  zh_CN: {
    translation: zh_CN,
  },
  zh_TW: {
    translation: zh_TW,
  },
  ja_JP: {
    translation: ja_JP,
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'en_US', // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    // fixed the TypeScript's return null bug.
    returnNull: false,

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
