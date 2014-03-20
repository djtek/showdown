//
//  Google Prettify
//  A showdown extension to add Google Prettify (http://code.google.com/p/google-code-prettify/)
//  hints to showdown's HTML output.
//

(function (root, factory) {
	if (typeof exports === 'object') { // Node.js
		module.exports = factory();

	} else if (typeof define === 'function' && define.amd) { // Require.JS
		define(function (require, exports, module) {
			var Showdown = require('showdown');
			module.exports = factory(Showdown);
		});
	} else {
		// Browser globals root is window
		factory(root.Showdown);
	}
}(this, function (Showdown) { // Factory function, the implementation
	"option strict";

    var prettify = function(converter) {
        return [
            { type: 'output', filter: function(source){

                return source.replace(/(<pre>)?<code>/gi, function(match, pre) {
                    if (pre) {
                        return '<pre class="prettyprint linenums" tabIndex="0"><code data-inner="1">';
                    } else {
                        return '<code class="prettyprint">';
                    }
                });
            }}
        ];
    };

	if (Showdown && Showdown.extensions) Showdown.extensions.prettify = prettify;
		
	return prettify; // Export the constructor
})); // Wrapping