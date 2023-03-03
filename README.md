# Getting Started

Go to the `app` project and install the dependencies:

```bash
cd app
pnpm install
```

Build the app:

```bash
pnpm dev
```

Go to the app project `dist` folder and open the `main.js` file.

# What are you looking at?

The POC include `package-1`, `package-2` and a random CJS module called `to-array` to prove that ESM and CJS packages can be bundled together. Those 3 packages are imported into a non "module" application called `app` and bundled with Webpack 5.

## package-1 project

This project contains 2 functions, `add` and `subtract` splitted in 2 distinct files. 

The project `index.js` file export everything from `add.js` and `substract.js`.

```js
export * from "./add.js";
export * from "./subtract.js";
```

## package-2 project

This project contains 2 functions, `multiple` and `divide`. All the code is in a single `index.js` file.

```js
export function multiple(x, y) {
    return x * y;
}

export function divide(x, y) {
    return x / y;
}
```

## app project

This project is a single `index.js` file importing and using the `package-1`, `package-2` and `to-array` projects.

## Understand the content of the main.js file

In the Getting Started section we executed the `build` command to generate a `main.js` in the `dist` folder.

Since the `app` project `index.js` only import respectively the `subtract` and `divide` functions from `package-1` and `package-2` we expect that Webpack ESM treeshaking will not bundled the `add` and `multiply` functions.

By looking in the `main.js` file, we can see that the `multiply` function is added, however the `add` function is not.

The conclusion here is that Webpack ESM treeshaking do work as expected but the modules must be in distinct files.

Since the `to-array` function is also added to the `main.js` file, we can conclude that Webpack can handle ESM and CJS packages in the same app.

If you have doubts about the validity of the resulting file, you can execute it with the following command:

```bash
node dist/main.js
```

