export default (name, artifact) => {
  // Check if there is a store && 
  // check if artifact has a reducer &&
  // check if the reducer wasn't already attached
  if (window.Store && artifact.reducer && !window.Store.getState()[name]) {
    window.Store.attachReducers({ [name]: artifact.reducer });
  }

  // If the artifact has a component, return it; 
  // otherwise return the whole artifact
  return artifact.component || artifact;
}