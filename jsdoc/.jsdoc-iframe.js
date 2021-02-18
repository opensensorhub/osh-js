const config = Object.assign({}, require('./.jsdoc'));

config.opts.destination = 'dist-iframe';
config.templates = {
  linenums: false,
  outputSourceFiles: true,
  default: {
    layoutFile: "./templates/default/tmpl/layout-iframes.tmpl"
  }
};

module.exports = config;
