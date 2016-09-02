var gulp = require('gulp');
var connect = require('gulp-connect');
var gutil = require("gulp-util");
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var sass = require('gulp-sass');
var changed = require('gulp-changed');
var sourcemaps = require('gulp-sourcemaps');
var clean = require('gulp-clean');
var cleanCSS=require('gulp-clean-css');
var shell = require('gulp-shell');
var runSequence = require('run-sequence');
var watch = require('gulp-watch');

var assetPath

var onError = notify.onError ({
   title: 'Error',
   message: '<%= error.message %>'
});

gulp.task("html", function() {
	return gulp.src('./src/*.html')
		.pipe(gulp.dest('./build'))
		.pipe(connect.reload());
});

gulp.task("assets", function(done) {
	runSequence('clean', "copyassets" , function() {
         watch('./src/assets/**/*', function (files) {
         	
         }).pipe(gulp.dest('build/assets'));
        done();
    });
});

gulp.task("copyassets", function() {
	return gulp.src('./src/assets/**')
		.pipe(gulp.dest('./build/assets'))
		.pipe(connect.reload());
});

gulp.task("connect", function() {
	connect.server({
		base: 'http://localhost',
		port: 8080,
		root: './build',
		livereload: true
	});
});

gulp.task('sass', function () {
  return gulp.src('./sass/**/*.scss')
	.pipe(plumber({ errorHandler: onError }))
	.pipe(changed('build/css'))
    .pipe(sass().on('error', sass.logError))
    /*.pipe(cleanCSS({compatibility: 'ie8'}))*/
    .pipe(gulp.dest('./build/css'))
    .pipe(connect.reload());
});

gulp.task("clean", function() {
	return gulp.src('build', {read: false})
		.pipe(clean());
});

gulp.task("webpack:dev",  shell.task(['npm run dev']));
gulp.task("webpack:build",  shell.task(['npm run build']));

gulp.task("default", ["build", "connect"], function() {
	gulp.watch('./assets/**/*', ['assets']);
	gulp.watch('./src/*.html', ['html']);
	gulp.watch('./sass/**/*.scss', ['sass']);
});

gulp.task("build", [], function(done) {
	runSequence('clean', "webpack:build", "assets", 'sass', "html" , function() {
        console.log('Everything clean and running');
        done();
    });
});

