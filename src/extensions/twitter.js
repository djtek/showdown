//
//  Twitter Extension
//  @username   ->  <a href="http://twitter.com/username">@username</a>
//  #hashtag    ->  <a href="http://twitter.com/search/%23hashtag">#hashtag</a>
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

	var twitter = function(converter) {
		return [

		// @username syntax
		{ type: 'lang', regex: '\\B(\\\\)?@([\\S]+)\\b', replace: function(match, leadingSlash, username) {
			// Check if we matched the leading \ and return nothing changed if so
			if (leadingSlash === '\\') {
				return match;
			} else {
				return '<a href="http://twitter.com/' + username + '">@' + username + '</a>';
			}
		}},

		// #hashtag syntax
		{ type: 'lang', regex: '\\B(\\\\)?#([\\S]+)\\b', replace: function(match, leadingSlash, tag) {
			// Check if we matched the leading \ and return nothing changed if so
			if (leadingSlash === '\\') {
				return match;
			} else {
				return '<a href="http://twitter.com/search/%23' + tag + '">#' + tag + '</a>';
			}
		}},

		// Escaped @'s
		{ type: 'lang', regex: '\\\\@', replace: '@' }
		];
	};
	if (Showdown && Showdown.extensions) Showdown.extensions.twitter = twitter;
		
	return twitter; // Export the constructor
})); // Wrapping