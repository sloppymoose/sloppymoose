module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true
  },
  extends: [
    'eslint:recommended',
    'standard',
    'plugin:import/errors',
    'plugin:import/react',
    'plugin:import/warnings',
    'plugin:react/recommended'
  ],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    sourceType: 'module'
  },
  plugins: [],
  rules: {
    'no-unused-vars': ['error', { args: 'none', varsIgnorePattern: '_' }]
  }
}
