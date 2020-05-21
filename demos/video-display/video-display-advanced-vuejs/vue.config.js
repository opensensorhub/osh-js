const { DefinePlugin } = require('webpack');
// vue.config.js
module.exports = {
  parallel: true,
  publicPath: process.env.NODE_ENV === 'production'
    ? 'http://opensensorhub.github.io/osh-js/v2.0.0/demos/video-display-advanced-vuejs'
    : '/'
}
