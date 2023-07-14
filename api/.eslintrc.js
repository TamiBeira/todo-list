module.exports = {
  plugins:['prettier'],
  env:{
    es6: true,
    node: true,
  },
  extends:[
    'airbnb-base',
    'prettier'
  ],
  globals:{
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    "prettier/prettier":"error",
    "class-methods-use-this":"off",
    "no-param-reassingn":"off",
    "camelcase":"off",
    "no-underscore-dangle":"off",
    "no-unused-vars":["error", {"argsIgnorePattern":"next"}],
  },
};
