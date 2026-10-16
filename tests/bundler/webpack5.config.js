const path = require('path');

module.exports = {
    entry: './tests/bundler/test-entry.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist-webpack'),
    },
    mode: 'production',
};
