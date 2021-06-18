module.exports = {
  locales: ['en', 'de', 'es'],
  input: [
    'src/**/*.tsx'
  ],
  output: 'src/locales/$LOCALE/$NAMESPACE.json',
  useKeysAsDefaultValue: false,
}
