module.exports = {
  plugins: [
    "node_modules/jsdoc-vuejs"
  ],
  "title": "OpenSensorHub JS Toolkit",
  source: {
    include: [
      '../source'
    ],
    includePattern: '\\.(vue|js)$',
  },
  opts: {
    mainpagetitle: "OpenSensorHub JS Toolkit",
    destination: 'dist',
    template: "./templates/default",
    encoding: 'utf8',
    "recurse": true
  },
  templates: {
    linenums: false,
    outputSourceFiles: true,
  }
};
