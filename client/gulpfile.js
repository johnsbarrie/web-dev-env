var gulp = require('gulp'),
connect = require('gulp-connect'),
exit = require('gulp-exit'),
gutil = require("gulp-util"),
plumber = require('gulp-plumber'),
notify = require('gulp-notify'),
sass = require('gulp-sass'),
changed = require('gulp-changed'),
sourcemaps = require('gulp-sourcemaps'),
clean = require('gulp-clean'),
cleanCSS=require('gulp-clean-css'),
shell = require('gulp-shell'),
runSequence = require('run-sequence'),
watch = require('gulp-watch');

var folders={
	public:"public",	
	assets:"assets",
	lib:"lib",
	css:"css"
} 

var onError = notify.onError ({
   title: 'Error',
   message: '<%= error.message %>'
});

gulp.task("html", function() {
	return gulp.src('./src/*.html')
		.pipe(gulp.dest(folders.public))
		.pipe(connect.reload());
});

gulp.task("lib", function() {
	return gulp.src('./src/'+folders.lib+'/**/*')
		.pipe(gulp.dest(folders.public+'/'+folders.lib))
		.pipe(connect.reload());
});

gulp.task("assets", function(done) {
	runSequence("copyassets" , function() {
         watch('./src/'+folders.assets+'/**/*', function (files) {
         }).pipe(gulp.dest(folders.public+'/'+folders.assets));
        done();
    });
});

gulp.task("copyassets", function() {
	return gulp.src('./src/'+folders.assets+'/**')
		.pipe(gulp.dest(folders.public+'/'+folders.assets))
		.pipe(connect.reload());
});

gulp.task("connect", function() {
	connect.server({
		base: 'http://localhost',
		port: 8080,
		root: folders.public,
		livereload: true
	});
});

gulp.task('sass', function () {
  return gulp.src('./sass/**/*.scss')
	.pipe(plumber({ errorHandler: onError }))
	.pipe(changed(folders.public+'/'+folders.css))
    .pipe(sass().on('error', sass.logError))
    /*.pipe(cleanCSS({compatibility: 'ie8'}))*/
    .pipe(gulp.dest(folders.public+'/'+folders.css))
    .pipe(connect.reload());
});

gulp.task('buildsass', function () {
  return gulp.src('./sass/**/*.scss')
	.pipe(plumber({ errorHandler: onError }))
	.pipe(changed(folders.public+'/'+folders.css))
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest(folders.public+'/'+folders.css))
});

gulp.task("clean", function() {
	return gulp.src(folders.public, {read: false})
		.pipe(clean());
});

gulp.task("watch", function(){
	gulp.watch('./src/*.html', ['html']);
	gulp.watch('./sass/**/*.scss', ['sass']);
});

gulp.task("npm:dev",  shell.task(['npm run dev']));
gulp.task("js:build",  shell.task(['npm run build']));

gulp.task("build", [], function(done) {
	return runSequence('clean', "copyassets", "lib", 'buildsass', "html" ,  "js:build", function() {
        console.log('Everything rebuilt');
        exit();
        done();
    });
});

gulp.task("js:dev",  ["assets", "lib", "sass", "html", "watch", "npm:dev" ]);
gulp.task("css:dev",  ["assets", "lib", "sass", "html", "watch", "js:build", "connect" ]);
gulp.task("default", ["js:dev"]);