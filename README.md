# external-dynamic-import
Allows to load in external css and js files asynchronously into the page.

## What is it?
This package takes use of `fg-loadcss` and `scriptjs` and puts it into one package, it also wraps them around in promises so you can call your follow up functions after the scripts are loaded.

## Why does this exist?
This was extremely usefull for me when working on micro-frontend projects. My scripts were being compiled to UMD formats, so loading them in via the `loadJS` function allowed me to access them via the global `window` variable. This means the modules that are being required after the script is loaded won't need to import the modules again since its already loaded. This allowed me to have very efficient, scalable and easy to maintain frontend solutions that are or will grow large.  **Although this is not usefull for small projects!**

The css loader part came in later when I noticed that it takes a while for the stylesheets to be loaded and my react components were already requiring it. That's why I wrapped them around in promises and only after that I import the scripts.

## Install via npm
`npm install external-dynamic-import --save`

## Usage
In your code import the package like so:
`import { loadJS, loadCSS } from 'external-dynamic-import';`

Then whenever you need to load in external css or js simply do the following:
```
loadCSS('https://your-cdn.com/package/styles.css')
  .then(() => loadJS('https://your-cdn.com/package/scripts.js'))
  .then(() => require('./App.js'))
  .catch((err) => console.log(err));
```

The example above loads in the stylesheet to the headers asynchronously and after that is done, we load in the script as well. After that is done, we can load in our Components or catch errors.

## Importing stylesheets
Loading of stylesheets is done via the `loadCSS` package and utilizes the `onLoadCSS` function and simply returns a promise.
```
loadCSS('https://your-cdn.com/package/styles.css')
  .then(() => console.log('Stylesheet loaded!'))
  .catch((err) => console.log(err));
```

## Importing scripts
Loading of stylesheets is done via the `scriptjs` package and for the callback returns a promise.
```
loadJS('https://your-cdn.com/package/scripts.js')
  .then(() => console.log('Scripts loaded!'))
  .catch((err) => console.log(err));
```