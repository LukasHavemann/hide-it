'use strict';
 
var gulp = require('gulp');
var watch = require('gulp-watch');
var sass = require('gulp-sass');
var jshint = require('gulp-jshint');
var minify = require('gulp-minify');
var webserver = require('gulp-webserver');
 

gulp.task('sass', function () {
  return gulp.src('./sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist/css'))
    .on('error', swallowError);
});
 
gulp.task('watch', function () {
  gulp.watch('./sass/**/*.scss', ['sass']);
  gulp.watch('./lib/**/*.js', ['minify']);
});

gulp.task('lint', function() {
  return gulp.src('./lib/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .on('error', swallowError);
});

gulp.task('minify', ['lint'], function() {
  return gulp.src('lib/*.js')
    .pipe(minify({
        ext : {
            min:'.min.js'
        },
        noSource : true
    }))
    .pipe(gulp.dest('dist/lib'))
    .on('error', swallowError);
});
  
gulp.task('deploy', function() {
  gulp.start('sass', 'minify');
});

gulp.task('server', function() {
  gulp.src('.')
    .pipe(webserver({
      livereload: true,
      directoryListing: true,
      open: true
    }))
    .on('error', swallowError);;
});

function swallowError (error) {
  console.log(error.toString())
  this.emit('end')
}