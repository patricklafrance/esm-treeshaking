# Getting Started

This POC explore 2 scenarios:

- [Tree-shaking native ESM JS code with Webpack](#1---tree-shaking-native-esm-js-code-with-webpack)
- [Tree-shaking TS + React ESM code with Webpack](#2---tree-shaking-ts--react-esm-code-with-webpack)

## 1 - Tree-shaking native ESM JS code with Webpack

Go to the `app` project and install the dependencies:

```bash
cd app
pnpm install
```

Build the app:

```bash
pnpm build
```

Go to the app project `dist` folder and open the `main.js` file.

### What are you looking at?

The POC include `package-1`, `package-2`, `package-3` and a random CJS module called `to-array` to prove that ESM and CJS packages can be bundled together. Those 3 packages are imported into a non "module" application called `app` and bundled with Webpack 5.

#### package-1 project

This project contains 2 functions, `add` and `subtract` splitted in 2 distinct files. 

The project `index.js` file export everything from `add.js` and `substract.js`.

```js
export * from "./add.js";
export * from "./subtract.js";
```

#### package-2 project

This project contains 2 functions, `multiple` and `divide`. All the code is in a single `index.js` file.

```js
export function multiple(x, y) {
    return x * y;
}

export function divide(x, y) {
    return x / y;
}
```

#### package-3 project

This project contains 2 functions, `areEqual` and `areNotEqual` splitted in 2 distinct files. The only difference with this project is that it's imported via a packed `.tgz` file.

#### app project

This project is a single `index.js` file importing and using the `package-1`, `package-2`, `package-3` and `to-array` projects.

## Understanding the content of the main.js file

In the Getting Started section we executed the `build` command to generate a `main.js` in the `dist` folder.

Since the `app` project `index.js` only import respectively the `subtract`, `divide` and `areNotEqual` functions from `package-1`, `package-2` and `package-3` we expect that Webpack ESM treeshaking will not bundled the `add`, `multiply` and `areEqual` functions.

By looking in the `main.js` file, we can see that the `multiply` function is added, however the `add` and `areEqual` functions are not.

The conclusion here is that Webpack ESM treeshaking do work as expected but the modules must be in distinct files.

Since the `to-array` function is also added to the `main.js` file, we can conclude that Webpack can handle ESM and CJS packages in the same app.

If you have doubts about the validity of the resulting file, you can execute it with the following command:

```bash
node dist/main.js
```

## 2 - Tree-shaking TS + React ESM code with Webpack

Go to the `package-4` project, install the dependencies and build the library:

```bash
cd package-4
pnpm install
pnpm build
```

Then, go to the `package-5` project, install the dependencies and build the library:

```bash
cd package-5
pnpm install
pnpm build
```

Then, go to the `app-ts-react` application and install the dependencies:

```bash
cd app-ts-react
pnpm install
```

Build the app:

```bash
pnpm build
```

Go to the app project `dist` folder and open the `main.js` file.

### What are you looking at?

The POC include `package-4` and `package-5` packages. Those 2 packages are imported into a non "module" application called `app-ts-react` and bundled with Webpack 5.

#### package-4 project

This project contains 2 TypeScript functions, `isUndefined` and `isNotUndefined` splitted in 2 distinct files.

Both function are exported from an `index.ts` file.

The files are transpiled to JavaScript and their types declaration are available in collocated `.d.ts` files.

#### package-5 project

This project contains 2 React components written in TS, `Page1` and `Page2` splitted in 2 distinct files.

Both components are exported from an `index.ts` file.

The files are transpiled to JavaScript and their types declaration are available in collocated `.d.ts` files.

#### app-ts-react

This project is a single index.ts file importing and using the `package-4` and `package-5` projects. The app renders a single `Page2` React components.

## Understanding the content of the main.js file

At first, `package-4` behave similarly to what has been observed previously with `package-1` and `package-3` in [Understanding the content of the main.js file](#understanding-the-content-of-the-mainjs-file) but `package-5` did not.

Even if `app-ts-react` index file only imported `Page2`, the `Page1` component was still being added to the bundle.

After reading Webpack [tree-shaking documentation](https://webpack.js.org/guides/tree-shaking/), turns out that to be tree-shaken, the library project `package.json` file must define a `sideEffects` field with the `false` value or an array of files having side effects.

Files with side effects will be excluded from the tree-shaking. If the field is omitted, React code is not tree-shaken.

After adding the `sideEffects: false` field, only the `Page2` component is added to the bundle.

# Conclusion

Tree-shaking ESM code with Webpack 5 mostly work as expected if the code is properly splitted in distinct files and the `sideEffects` field is added to the libraries `package.json` file.

## Note

There are 2 layers of [tree shaking with Webpack](https://webpack.js.org/guides/tree-shaking/):

- The first one is with the `sideEffects` field and depends on the code being properly splitted in distinct files. This one cannot eliminate in-file unused code.
- The second one depends on the [Terser](https://webpack.js.org/plugins/terser-webpack-plugin/) plugin and can eliminate in0file unused code. It won't eliminate unused imports thought.

# Learn more

- https://www.codefeetime.com/post/tree-shaking-a-react-component-library-in-rollup/
- https://webpack.js.org/guides/tree-shaking/
- https://exploringjs.com/es6/ch_modules.html#static-module-structure

