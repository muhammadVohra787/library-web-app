const indentSpaces = 4
module.exports = {
  root: false,
  env: { browser: true, node: false },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
//   parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  settings: { react: { version: "18.2" } },
  plugins: ["react-refresh"],
  rules: {
    // === React ===
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],

    // Disallow unnecessary JSX expressions when literals alone are sufficient
    "react/jsx-curly-brace-presence": [
      "warn",
      {
        props: "ignore",
        children: "never",
      },
    ],
    "react/jsx-curly-spacing": [
      "warn",
      {
        when: "always",
        children: true,
        objectLiterals: "never",
      },
    ],
    "react/jsx-indent": [
      "warn",
      indentSpaces,
      {
        indentLogicalExpressions: true,
      },
    ],
    "react/jsx-indent-props": [
      "warn",
      {
        indentMode: indentSpaces,
        first: true,
      },
    ],
    "react/prop-types": "off",
    "react/jsx-props-no-multi-spaces": "warn",
    "react/jsx-tag-spacing": [
      "warn",
      {
        beforeSelfClosing: "always",
      },
    ],

    //=== Javascript ===
    'no-unused-vars': 'warn'
  }
};
