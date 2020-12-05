const ERROR = 2;

module.exports = {
  root: true,
  parser: 'babel-eslint',
  extends: [
    'plugin:prettier/recommended',
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:sonarjs/recommended',
  ],
  plugins: ['babel', 'sonarjs'],
  parserOptions: {
    ecmaVersion: 8,
    sourceType: 'module',
  },
  env: {
    node: true,
  },
  rules: {
    quotes: [
      ERROR,
      'single',
      { avoidEscape: true, allowTemplateLiterals: true },
    ],
  },
  settings: {
    'import/resolver': {
      'babel-module': {},
    },
  },
};
