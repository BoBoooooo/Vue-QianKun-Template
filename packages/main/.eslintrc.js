module.exports = {
  root: true,
  env: {
    node: true,
    es6: true,
  },
  extends: ['plugin:vue/essential', '@vue/airbnb', '@vue/typescript', 'plugin:prettier/recommended'],
  // 修改airbnb部分变态规则
  rules: {
    'max-len': ['error', { code: 200 }],
    // 允许修改形参
    'no-param-reassign': 0,
    // 允许使用 for-of，https://github.com/airbnb/javascript#iterators--nope
    'no-restricted-syntax': 0,
    // 允许v-if和v-for同时使用，https://vuejs.github.io/eslint-plugin-vue/rules/no-use-v-if-with-v-for.html
    'vue/no-use-v-if-with-v-for': [
      'error',
      {
        allowUsingIterationVar: true,
      },
    ],
    // 允许循环引入
    'import/no-cycle': 0,
    // fix unresolved bug
    'import/no-unresolved': 0,
    // file extension
    'import/extensions': 0,
    'no-unused-vars': 0,
    // import named
    'import/named': 0,
    // 允许class中方法不使用this
    'class-methods-use-this': 'off',
    // 允许下划线变量命名
    'no-underscore-dangle': 0,
  },
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaFeatures: {
      legacyDecorators: true,
    },
  },
};
