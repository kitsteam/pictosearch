module.exports = {
  locales: ['en', 'de', 'es'],
  input: [
    'src/**/*.{ts,tsx}',
  ],
  output: 'src/locales/$LOCALE/$NAMESPACE.json',
  useKeysAsDefaultValue: false,
}
