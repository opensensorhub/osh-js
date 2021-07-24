# Contributing 

## Build gh-pages: demos, vuepress, showcase & Js documentation

Here a script to build the site, showcase, demos & the JsDoc:

You can use ENV=dev or ENV=latest to build either the dev environment or the latest one.

```shell
$ export ENV=dev
```

Then you can use the following script (don't forget to change output dir (DIR) and osh-js source dir (CURRENT)):

```shell
#!/bin/bash
DIR=<osh_gh_pages_git_clone>/osh-js/dev
CURRENT=<your_OSH_JS_dir>/osh-js

## Remove existing files

rm -fr $DIR/demos $DIR/jsdoc $DIR/site $DIR/showcase
mkdir -p $DIR/demos

nvm use v12.18.2

cd $CURRENT && 
echo "                                           "
echo "###########################################"
echo "Processing video-display-advanced-vuejs ..." 
echo "###########################################"
echo "                                           "
cd $CURRENT/demos/video-display/video-display-advanced-vuejs/ && rm -fr dist/* && yarn install && yarn prod && 
echo "                                           "
echo "###########################################"
echo "Processing video-display-vuejs ..." 
echo "###########################################"
echo "                                           "
cd $CURRENT/demos/video-display/video-display-vuejs/ && rm -fr dist/* && yarn install &&  yarn prod &&
echo "                                           "
echo "###########################################"
echo "Processing 3dr-solo-uav-vuejs ..." 
echo "###########################################"
echo "                                           "
cd $CURRENT/demos/3dr-solo-uav/3dr-solo-uav-vuejs/ && rm -fr dist/* && yarn install && yarn prod &&
echo "                                           "
echo "###########################################"
echo "Processing 3dr-solo-uav-react ..." 
echo "###########################################"
echo "                                           "
cd $CURRENT/demos/3dr-solo-uav/3dr-solo-uav-react/ && rm -fr dist/* && yarn install && yarn prod && 
echo "                                           "
echo "###########################################"
echo "Processing 3dr-solo-uav-react-tsx ..." 
echo "###########################################"
echo "                                           "
cd $CURRENT/demos/3dr-solo-uav/3dr-solo-uav-react-tsx/ && rm -fr dist/* && yarn install && yarn prod && 
echo "                                           "
echo "###########################################"
echo "Processing eathquake ..." 
echo "###########################################"
echo "                                           "
cd $CURRENT/demos/earthquake/ && rm -fr dist/* && yarn install && yarn prod && 
echo "                                           "
echo "###########################################"
echo "Processing Showcase ..." 
echo "###########################################"
echo "                                           "
cd $CURRENT/showcase/  && rm -fr dist/* && yarn install && yarn prod && 
echo "                                           "
echo "###########################################"
echo "Processing documentation & vuepress ..." 
echo "###########################################"
echo "                                           "
cd $CURRENT && yarn install && yarn documentation && yarn vuepress

# cleanup dest directories

rm -fr $DIR/demos/earthquake $DIR/demos/video-display-advanced-vuejs  $DIR/demos/video-display-vuejs  $DIR/demos/3dr-solo-uav-vuejs $DIR/demos/3dr-solo-uav-react $DIR/demos/3dr-solo-uav-react-tsx $DIR/showcase $DIR/documentation/jsdoc $DIR/doc

# copy new files
echo 
echo "###########################################"
echo "Copy new files" 
echo "###########################################"
echo 

cp -fr $CURRENT/demos/video-display/video-display-advanced-vuejs/dist $DIR/demos/video-display-advanced-vuejs 
cp -fr $CURRENT/demos/video-display/video-display-vuejs/dist $DIR/demos/video-display-vuejs 
cp -fr $CURRENT/demos/3dr-solo-uav/3dr-solo-uav-vuejs/dist $DIR/demos/3dr-solo-uav-vuejs 
cp -fr $CURRENT/demos/3dr-solo-uav/3dr-solo-uav-react/dist $DIR/demos/3dr-solo-uav-react 
cp -fr $CURRENT/demos/3dr-solo-uav/3dr-solo-uav-react-tsx/dist $DIR/demos/3dr-solo-uav-react-tsx 
cp -fr $CURRENT/demos/earthquake/dist $DIR/demos/earthquake 
cp -fr $CURRENT/showcase/dist $DIR/showcase
cp -fr $CURRENT/jsdoc/dist $DIR/jsdoc 
cp -fr $CURRENT/vuepress/docs/dist $DIR/site
```

## Build NPM
First change version contained into the package.json.

Then you have to build the content of the NPM by running the target `build-package`.

Finally, go to the output directory and run *npm publish*. Make sure that the version in the package.json is the right one.

Build dist directory:

```shell
$ yarn build-package
```

Check version and publish NPM:

```shell
$ cd ./build/osh-js && cat package.json | grep version
$ npm publish
```
