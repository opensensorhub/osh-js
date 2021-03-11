const { DefinePlugin } = require('webpack');
// vue.config.js
module.exports = {
  parallel: true,
  publicPath: process.env.NODE_ENV === 'production'
    ? 'http://opensensorhub.github.io/osh-js/dev/demos/video-display-advanced-vuejs'
    : '/'
}
