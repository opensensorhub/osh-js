const { DefinePlugin } = require('webpack');
// vue.config.js
module.exports = (env) => {
  const target = process.env.ENV === 'latest'? 'latest' : 'dev';
  console.log('Current Target release: ', target);

  return {
    parallel: true,
    publicPath: process.env.NODE_ENV === 'production'
        ? `http://opensensorhub.github.io/osh-js/${target}/demos/video-display-advanced-vuejs`
        : '/'
  }
};
