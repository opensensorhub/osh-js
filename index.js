/*eslint-env node*/
'use strict';

var path = require('path');

// If in 'production' mode, use the combined/minified/optimized version of Cesium
if (process.env.NODE_ENV === 'production') {
    module.exports = require(path.join(__dirname, 'build/osh.min.js'));
    return;
}
module.exports = require('esm')(module)('./source/OSH.js');
