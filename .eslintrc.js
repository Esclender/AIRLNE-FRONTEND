module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'standard',
    'plugin:react/recommended'
  ],
  overrides: [
    {
      env: {
        node: true
      },
      files: [
        '.eslintrc.{js,cjs,jsx}'
      ],
      parserOptions: {
        sourceType: 'script',
        ecmaFeatures: {
          experimentalObjectRestSpread: true,
          jsx: true,
          arrowFunctions: true,
          classes: true,
          modules: true,
          defaultParams: true
        }
      }
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: [
    'react'
  ],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'react/jsx-key': 'off',
    eqeqeq: 'off',
    'no-unused-vars': 'warn',
    'dot-notation': 'off'
  }
}
