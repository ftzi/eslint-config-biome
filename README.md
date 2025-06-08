<div align="center">

## 🚀 Check out my latest project — [NextStack](https://www.nextstack.gg)! 

<a href="https://www.nextstack.gg" target="_blank">
  <img src="https://www.nextstack.gg/opengraph-image" width="500" alt="NextStack OpenGraph Image">
</a>

---


<br/>
<img src="logo.svg" alt="logo" width="250"/>

# eslint-config-biome
[![npm](https://img.shields.io/npm/v/eslint-config-biome)](https://www.npmjs.com/package/eslint-config-biome)
[![npm](https://img.shields.io/npm/dt/eslint-config-biome)](https://www.npmjs.com/package/eslint-config-biome)


<h4>

Disables ESLint rules that have an [**equivalent and recommended**](https://github.com/biomejs/biome/discussions/3) [Biome](https://biomejs.dev/) rule, allowing the simultaneous use of Biome and ESLint.

</h4>


<br/>

</div>



## 💿 Installation

```bash
npm install -D eslint-config-biome # or your preferred package manager ;)
```

- `eslint.config.js`: Import `eslint-config-biome` and have it as the last item in the configuration array

    ```js
    import biome from "eslint-config-biome";

    export default [
      // other configs,
      biome,
    ];
    ```

- Or `.eslintrc.*` (eslint <= v8): Add the following as the last item in the `"overrides"` array. Create it if necessary.

    ```json5
    {
      "overrides": [
        // other overrides,
        {
          files: ["*.ts", "*.js", "*.tsx", "*.jsx"],
          extends: ["biome"],
        }
      ],
    }
    ```

## ℹ️ Info

- In VSCode, to apply Biome and ESLint on save, you should have these in your project's `.vscode/settings.json`:

    ```json
    {
      "editor.codeActionsOnSave": {
        "source.fixAll.eslint": "explicit",
        "source.organizeImports.biome": "explicit",
        "quickfix.biome": "explicit"
      },
      "editor.defaultFormatter": "biomejs.biome"
    }
    ```

- For package.json scripts and CI, I recommend running `biome` before `eslint` for faster failure detection.

  ```json
  "scripts": {
    "format:check": "biome check . && eslint .",
    "format": "biome check --write --unsafe . && eslint --fix .",
  }
  ```

- This package includes [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier), so formatting rules are also disabled as Biome is equivalent to Prettier. [Attribution](ATTRIBUTION.md).


## 📰 [Changelog](CHANGELOG.md)
