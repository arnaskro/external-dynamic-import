/**
 * It would be better to use the global module,
 * because it has the all loaders in one place.
 */
import { loadCSS } from 'fg-loadcss';

function onloadCSS( ss, callback ) {
	var called;
	function newcb(){
			if( !called && callback ){
				called = true;
				callback.call( ss );
			}
	}
	if( ss.addEventListener ){
		ss.addEventListener( "load", newcb );
	}
	if( ss.attachEvent ){
		ss.attachEvent( "onload", newcb );
  }
  if( "isApplicationInstalled" in navigator && "onloadcssdefined" in ss ) {
		ss.onloadcssdefined( newcb );
	}
}

// Loads the stylesheet dynamically and returns a promise
export default (stylesheet) => {

	if (!stylesheet.match(/^(http:)|(https:)|(\/\/)/g))
		stylesheet = window.location.origin + stylesheet;
	
  return new Promise((resolve, reject) => {
    (stylesheet == null) ? 
		reject("No stylesheet provided") :
		onloadCSS(loadCSS(stylesheet), resolve)
	})
}