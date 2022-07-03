module.exports = {
  root: true,
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  plugins: ['prettier', 'jsdoc'],
  extends: [
    'airbnb-base',
    'plugin:prettier/recommended',
    'plugin:jsdoc/recommended',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    camelcase: 0,
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        trailingComma: 'all',
      },
    ],
    'jsdoc/require-param-description': 0,
    'jsdoc/require-returns-description': 0,
    'jsdoc/require-property-description': 0,
  },
};
