var gulp = require('gulp');
var gulpLoadPlugins = require('gulp-load-plugins'),
    plugins = gulpLoadPlugins();
var jshint= require("gulp-jshint");
var cleanCSS = require('gulp-clean-css');
var sourcemaps = require('gulp-sourcemaps');
var minify = require('gulp-minify');
var uglify = require('gulp-uglify');
var sort = require('gulp-sort');

gulp.task('build', ['css', 'js', 'images']);
gulp.task('build-minify', ["js-min",'css-min', 'images']);

//--------- JS -------------//
gulp.task('js', ["js-normal","copy-vendor"]);
gulp.task('js-min', ["js-minify","copy-vendor"]);

gulp.task('js-normal', function () {
    return gulp.src('Toolkit/src/**/*.js')
        .pipe(sort())
        .pipe(plugins.jshint())
        .pipe(plugins.jshint.reporter('default'))
        .pipe(plugins.concat('osh.js'))
        .pipe(gulp.dest('Toolkit/dist'));
});

gulp.task('js-minify', function() {
  gulp.src('Toolkit/src/osh/**/*.js')
    .pipe(sort())
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(plugins.concat('osh.min.js'))
    .pipe(minify({
        ext:{
            src:'-debug.js',
            min:'.js'
        },
        exclude: ['tasks'],
        ignoreFiles: ['.combo.js', '-min.js']
    }))
    /*.pipe(uglify({
          compress: {
              negate_iife: false
          }
      }))*/
    .pipe(gulp.dest('Toolkit/dist/js'))
});

gulp.task('copy-vendor', function () {
    return gulp.src('Toolkit/vendor/**/*')
        .pipe(gulp.dest('Toolkit/dist/vendor'));
});

//------- CSS -------------//
gulp.task('css', ["css-normal","copy-fonts"]);
gulp.task('css-min', ["css-minify","copy-fonts"]);

gulp.task('css-normal', function () {
    return gulp.src('Toolkit/src/css/*.css')
        .pipe(plugins.concat('osh.css'))
        .pipe(gulp.dest('Toolkit/dist/css'));
});

gulp.task('copy-fonts', function () {
    return gulp.src('Toolkit/src/css/font-awesome-4.6.3/**/*')
        .pipe(gulp.dest('Toolkit/dist/css/font-awesome-4.6.3'));
});

gulp.task('css-minify', function() {
    return gulp.src('Toolkit/src/css/*.css')
        .pipe(plugins.concat('osh.min.css'))
        .pipe(cleanCSS({compatibility: '*'}))
        .pipe(gulp.dest('Toolkit/dist/css'));
});

//--------- IMAGES -----------//
gulp.task('images', function () {
    return gulp.src('Toolkit/src/images/**/*')
        .pipe(gulp.dest('Toolkit/dist/images'));
});

//---------- TOOLS --------//