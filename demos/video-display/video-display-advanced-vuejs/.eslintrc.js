module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/recommended'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'max-len': [0],
    'vue/no-unused-components': 'off',
    'import/no-unresolved': 'off',
    'no-unused-expressions': ['off', { 'allowTernary': true }],
    'no-param-reassign': 0,
    'quote-props': ['off', 'consistent'],
    // vue rules
    'vue/no-unused-vars': 'off',
    'vue/valid-v-for': 'off',
    "vue/order-in-components": ["off", {
      "order": [
        "el",
        "name",
        "parent",
        "functional",
        ["delimiters", "comments"],
        ["components", "directives", "filters"],
        "extends",
        "mixins",
        "inheritAttrs",
        "model",
        ["props", "propsData"],
        "data",
        "computed",
        "watch",
        "LIFECYCLE_HOOKS",
        "methods",
        ["template", "render"],
        "renderError"
      ]
    }],
    'vue/html-closing-bracket-newline': ['off', {
      'singleline': 'never',
      'multiline': 'never'
    }],
    'vue/html-closing-bracket-spacing': ['off', {
      'startTag': 'never',
      'endTag': 'never',
      'selfClosingTag': 'always'
    }],
    'vue/script-indent': ['off', 2, {
      'baseIndent': 0,
      'switchCase': 1,
      'ignores': []
    }],
    'vue/valid-v-model': 'off',
    'vue/max-attributes-per-line':  'off',
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
