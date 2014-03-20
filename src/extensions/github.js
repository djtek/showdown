//
//  Github Extension (WIP)
//  ~~strike-through~~   ->  <del>strike-through</del>
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

    var github = function(converter) {
        return [
            {
              // strike-through
              // NOTE: showdown already replaced "~" with "~T", so we need to adjust accordingly.
              type    : 'lang',
              regex   : '(~T){2}([^~]+)(~T){2}',
              replace : function(match, prefix, content, suffix) {
                  return '<del>' + content + '</del>';
              }
            }
        ];
    };

	if (Showdown && Showdown.extensions) Showdown.extensions.github = github;
		
	return github; // Export the constructor
})); // Wrapping