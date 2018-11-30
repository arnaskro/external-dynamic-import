/**
 * It would be better to use the global module,
 * because it has the all loaders in one place.
 */
import scriptjs from 'scriptjs';

// Loads the stylesheet dynamically and returns a promise
export default (script) => 
  new Promise((resolve, reject) =>
    (script == null) ? 
    reject("No script provided") :
    scriptjs(script, resolve)
  )