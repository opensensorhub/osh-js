var OSH = {
	version: '0.0.2'
};

function expose() {
	var oldOSH = window.OSH;

	OSH.noConflict = function () {
		window.OSH = oldOSH;
		return this;
	};

	window.OSH = OSH;
}

// define OSH for Node module pattern loaders, including Browserify
if (typeof module === 'object' && typeof module.exports === 'object') {
	module.exports = OSH;

// define OSH as an AMD module
} else if (typeof define === 'function' && define.amd) {
	define(OSH);
}

// define OSH as a global L variable, saving the original OSH to restore later if needed
if (typeof window !== 'undefined') {
	expose();
}
