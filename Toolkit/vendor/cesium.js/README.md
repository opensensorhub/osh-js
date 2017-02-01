# Cesium

This is a [Bower](http://bower.io/) package for amazing [Cesium](http://cesiumjs.org) JavaScript library
for creating 3D globes and 2D maps in a web browser without a plugin.

The package contains source files from original `Source` directory under `src` directory and built minified files
from `Build/Cesium` directory under `dist` directory.

## Installation

In order to install Cesium with Bower run:

    bower install cesium.js
    
## How to prepare new Cesium release    

1. Install recent [Node.js](https://nodejs.org/) and [Node Package Manager](https://npmjs.com/). Using
[NVM](https://github.com/creationix/nvm) installation script is a preferable way to do this. [Git](https://git-scm.com/)
is also required to clone repositories.

2. Clone this repository:

        git clone git@github.com:solarpatrol/cesium-bower /path/to/cesium-bower
        
3. Switch to `dev` branch:
                
        git checkout dev
        
4. Install development dependencies:

        cd /path/to/cesium-bower
        npm install
        
5. Run update script passing Cesium version to update to (say, to `1.27`):

        npm run update 1.27.0
        
    This one will do the following steps:
    
    - update version fields in `package.json` file of this repository;
    - install corresponding version of official [Cesium](https://www.npmjs.com/package/cesium) package in `node_modules`;
    - copy source and build files from Cesium package to `src` and `dist` directories;
    - commit all changes to current (`dev`) branch.
    
    If you get a message like
    
    > Bower package is already @1.27.0
    
    but want to continue update anyway then run:
     
        npm run update 1.27.0 -- --force
    
6. If you are a maintainer of this repository then merge all changes to `master` branch:

        git checkout master
        git merge --no-ff dev -m "Version 1.27.0."
        git tag -a 1.27.0 -m "Version 1.27.0."
        
    If you are a contributor then [create a pull request](https://github.com/solarpatrol/cesium-bower/pull/new/dev) to
    `dev` branch.

## Contribution

Before making a pull request, please, be sure that your changes are rebased to `dev` branch.
