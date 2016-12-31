'use strict';

var gulp = require('gulp');
var jshint = require("gulp-jshint");
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var del = require('del');
var uglifycss = require('gulp-uglifycss');

var paths = {};
paths.scripts = ["./bower_components/jquery/dist/jquery.js",
                 "./src/modules/Web/js/index.js",
                 "./src/modules/Web/js/utils.js",
                 "./src/modules/Web/js/create.js",
                 "./src/modules/Web/js/login.js"];

paths.styles = ["./bower_components/pure/pure.css",
                "./src/modules/Web/css/app.css"];

paths.templates = ["./src/modules/Web/html/index.html"];

/*jshint task*/
gulp.task("lint", function() {
  return gulp.src("./src/modules/**/*.js")
         .pipe(jshint())
         .pipe(jshint.reporter("default"));
});

gulp.task('clean', function() {
  // You can use multiple globbing patterns as you would with `gulp.src`
  return del(['public/build']);
});

gulp.task('scripts', function() {
  return gulp.src(paths.scripts)
    //.pipe(uglify())
    .pipe(concat('all.min.js'))
    .pipe(gulp.dest('public/build/js'));
});

gulp.task('styles', function() {
  return gulp.src(paths.styles)
    // .pipe(uglifycss({
    //   "maxLineLen": 80,
    //   "uglyComments": false
    // }))
    .pipe(concat('all.min.css'))
    .pipe(gulp.dest('public/build/css'));
});

gulp.task('templates', function() {
	return gulp.src(paths.templates)
	 .pipe(gulp.dest('public/build/html'));
});

gulp.task('fonts', function() {
	return gulp.src("./src/modules/Web/assets/fonts/*")
		.pipe(gulp.dest('public/build/fonts/'));
});

// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['scripts']);
  gulp.watch(paths.styles, ['styles']);
  gulp.watch(paths.templates, ['templates'])
});

gulp.task('default', ['scripts', 'styles', 'templates', 'fonts']);
