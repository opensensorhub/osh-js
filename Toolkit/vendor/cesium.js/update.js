var shell = require('shelljs'),
    path = require('path'),
    jsonfile = require('jsonfile');

// Parsing console arguments
var argv = require('minimist')(process.argv.slice(2)),
    version = argv._[0],
    force = argv.force;

// Checking whether Cesium version is specified
if (!version) {
    console.error('Cesium version is not specified.');
    process.exit(1);
}

// Updating package.json
var packageJsonFilePath = path.resolve(__dirname, 'package.json'),
    packageJson = jsonfile.readFileSync(packageJsonFilePath, {
        throws: false
    });

if (packageJson === null) {
    console.error('Unable to read package.json file.');
    process.exit(2);
}

if (!force && packageJson.version === version && packageJson.devDependencies.cesium === version) {
    console.log('Bower package is already @' + version);
    process.exit(0);
}

console.log('Updating package.json...');
packageJson.version = version;
packageJson.devDependencies.cesium = version;
jsonfile.writeFileSync(packageJsonFilePath, packageJson, { spaces: 2 });

// Updating Cesium library
console.log('Updating Cesium library to ' + version + '...');
if (shell.exec('npm update').code !== 0) {
    process.exit(3);
}

// Copying source and build files
var fs = require('fs-extra');

var srcDirPath = path.resolve(__dirname, 'src'),
    distDirPath = path.resolve(__dirname, 'dist');

var cesiumDirPath = path.resolve(__dirname, 'node_modules', 'cesium'),
    cesiumSrcDirPath = path.resolve(cesiumDirPath, 'Source'),
    cesiumDistDirPath = path.resolve(cesiumDirPath, 'Build', 'Cesium');

console.log('Copying source files...');
fs.emptyDirSync(srcDirPath);
fs.copySync(cesiumSrcDirPath, srcDirPath);

console.log('Copying build files...');
fs.emptyDirSync(distDirPath);
fs.copySync(cesiumDistDirPath, distDirPath);

// Commiting changes
shell.exec('git reset --mixed');

console.log('Commiting source files...');
shell.exec('git add src');
shell.exec('git commit -m "src directory is updated to ' + version + '."');

console.log('Commiting build files...');
shell.exec('git add dist');
shell.exec('git commit -m "dist directory is updated to ' + version + '."');

console.log('Commiting package.json...');
shell.exec('git add package.json');
shell.exec('git commit --allow-empty -m "Version bump."');
