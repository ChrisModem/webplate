/**
 * File: demo.js
 * Type: Javascript demo
 * Author: Chris Humboldt
 */

// Table of contents
// ---------------------------------------------------------------------------------------
// Demo stuff

// Demo stuff
// ---------------------------------------------------------------------------------------
setTimeout(function() {
	web.snap('.snap');
	web.snap('.snap-large', 700);
}, 400);

new Modalplate('.modal-basic', {
	trigger: '.modal-trigger-basic'
});