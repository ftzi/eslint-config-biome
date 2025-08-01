# Changelog

## 2.1.3

- Updated Biome to 2.1.3.
- Updated `eslint-config-prettier`.

## 1.9.3

- Added a few minor ESLint rules to be disabled.
- Now using Biome's JSON Metadata to generate this package's rules to be disabled. Many thanks, [ematipico](https://github.com/ematipico)!

## 1.8.3

- Fix issue with ESLint's Flat Config ([#7](https://github.com/ftzi/eslint-config-biome/issues/7)).

## 1.7.3

- Updated Biome to 1.7.3; added the following disables:

```json
"no-eval": "off",
"no-global-assign": "off",
"no-lone-blocks": "off",
"no-misleading-character-class": "off",
"no-unneeded-ternary": "off",
"no-use-before-define": "off",
"@mysticatea/eslint-plugin/no-this-in-static": "off",
"@typescript-eslint/consistent-type-exports": "off",
"@typescript-eslint/consistent-type-imports": "off",
"@typescript-eslint/no-import-type-side-effects": "off",
"@typescript-eslint/no-unnecessary-type-arguments": "off",
"@typescript-eslint/prefer-function-type": "off",
"jest/max-nested-describe": "off",
"jest/no-duplicate-hooks": "off",
"jest/no-export": "off",
"jest/no-focused-tests": "off",
"react/jsx-key": "off",
"unicorn/no-thenable": "off",
"unicorn/prefer-node-protocol": "off",
"unicorn/prefer-number-properties": "off",
```

## 1.5.3

- Updated for Biome v1.5.3
- Now using https://biomejs.dev/linter/rules/ together with https://biomejs.dev/linter/rules-sources/ instead of https://github.com/biomejs/biome/discussions/3 as source of truth.

## 1.5.1

- Updated for Biome v1.5.1

## 1.4.1

- Missing eslint-config-prettier.js file in bundle

## 1.4.0

- `eslint-config-prettier` is now added automatically. You can remove it from your dependencies and your eslint config.

- Updated README so setups using .eslintrc.* suggests `"overrides"` instead of `"extends"`

## 1.3.0

- Now relevant [TS Extension rules](https://typescript-eslint.io/rules/#extension-rules) are added automatically to the index.js. These were added:

    ```json
    "@typescript-eslint/dot-notation": "off",
    "@typescript-eslint/no-loss-of-precision": "off",
    "@typescript-eslint/no-dupe-class-members": "off",
    "@typescript-eslint/default-param-last": "off",
    "@typescript-eslint/no-useless-constructor": "off",
    "@typescript-eslint/no-redeclare": "off",
    ```

    Thank you [Nicolas](https://discord.com/channels/1132231889290285117/1132231889911029825/1187781046167666790) for the idea!
- Added an awesome logo to the project ;)

## 1.2.0

- Added `"simple-import-sort/imports": "off"`.
- Added some tests for improved maturity of this package

## 1.1.0

- Fix missing plugin name in the start of the rule name.
- Remove Rust Clippy rules from output as they aren't related.

## 1.0.5-6

- Fix wrong command to install the package in the README. It was written `eslint-plugin-biome` instead of `eslint-config-biome`.

## 1.0.4

- Change description and repository in package.json

## 1.0.3

- Improve generated comment

## 1.0.2

- Improve Readme

## 1.0.1

- Remove unused deps

## 1.0.0

- Published

## 0.1.0

- Started project
