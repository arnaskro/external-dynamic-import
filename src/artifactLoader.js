import loadJS from './scriptLoader';

const returnArtifact = (resolve, name, artifact) => {
  
  // Check if there is a store && 
  // check if artifact has a reducer &&
  // check if the reducer wasn't already attached
  if (window.Store && artifact.reducer && !window.Store.getState()[name]) {
    window.Store.attachReducers({ [name]: artifact.reducer });
  }

  // If the artifact has a component, return it; 
  // otherwise return the whole artifact
  resolve(artifact.component || artifact);
}

export default (name) => 
  new Promise((resolve, reject) => {
    // Check if artifact is known
    if (!window.artifacts[name]) return reject(`Artifact ${name} is unknown.`)
    // Check if artifact was not previously loaded
    else if (window[name]) return returnArtifact(resolve, name, window[name])
    // Load the artifact if its the first time
    else return loadJS(window.artifacts[name].JS || window.artifacts[name])
        .then(() => 
          window[name] ? 
          returnArtifact(resolve, name, window[name]) :
          reject("Import failed for artifact: " + name)
        )
      }
  )