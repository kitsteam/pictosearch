import 'i18next';

// workaround, see https://github.com/i18next/react-i18next/issues/1559

declare module 'i18next' {
  interface CustomTypeOptions {
    returnNull: false;
  }
}