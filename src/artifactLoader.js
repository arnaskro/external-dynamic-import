import loadJS from './scriptLoader';
import handleArtifact from './artifactHandler';

const returnArtifact = (resolve, name) =>
  resolve(handleArtifact(name, window[name]));

export default (name) => 
  new Promise((resolve, reject) => {
    // Check if artifact is known
    if (!window.artifacts[name]) return reject(`Artifact ${name} is unknown.`)
    // Check if artifact was not previously loaded
    else if (window[name]) return returnArtifact(resolve, name)
    // Load the artifact if its the first time
    else return loadJS(window.artifacts[name].JS || window.artifacts[name])
        .then(() => 
          window[name] ? 
          returnArtifact(resolve, name) :
          reject("Import failed for artifact: " + name)
        )
      }
  )