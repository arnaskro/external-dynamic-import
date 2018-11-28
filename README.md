# external-dynamic-import
Allows to load in css and js files dynamically into the page.

Example:
```
import { loadCSS, loadJS } from 'external-dynamic-import';

loadCSS('your-cdn.com/styles.css')
  .then(() => loadJS(your-cdn.com/script.js))
  .then(() => require('./App.js'))
  .catch((err) => console.log(err));

```
