module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'airbnb-base', 'airbnb/rules/react', 'prettier'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/state-in-constructor': 'off',
    'react/prop-types': 'off',
    'react/no-array-index-key': 'off',
    'no-underscore-dange': 'off',
    'jsx-a11y': 'off',
    'import/extensions': 'off',
    'global-require': 'off',
    'no-console': 'off',
    'no-unused-expressions': 'warn',
    'no-unused-vars': 'warn',
    'no-nested-ternary': 'warn',
    'import/no-extraneous-dependencies': 'warn',
    'no-param-reassign': 'warn',
    camelcase: 'off',
    'import/prefer-default-export': 'off',
    'no-underscore-dangle': 'off',
  },
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
      },
    },
  },
};
