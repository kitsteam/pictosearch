module.exports = {
  locales: ['en', 'de'],
  input: [
    'src/**/*.tsx'
  ],
  output: 'src/locales/$LOCALE/$NAMESPACE.json',
  useKeysAsDefaultValue: false,
}
