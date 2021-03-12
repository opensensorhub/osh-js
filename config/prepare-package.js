const fs = require('fs');
const path = require('path');
const pkg = require('../package.json');

const buildDir = path.resolve(__dirname, '../build/osh-js');

// update the version number in util.js

// write out simplified package.json
delete pkg.scripts;
delete pkg.devDependencies;
delete pkg.style;
delete pkg.eslintConfig;
delete pkg.private;
fs.writeFileSync(
  path.join(buildDir, 'package.json'),
  JSON.stringify(pkg, null, 2),
  'utf-8'
);

// copy in readme and license files
fs.copyFileSync(
  path.resolve(__dirname, '../README.md'),
  path.join(buildDir, 'README.md')
);
