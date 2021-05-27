module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
}
