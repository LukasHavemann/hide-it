'use strict';
 
var gulp = require('gulp');
var watch = require('gulp-watch');
var sass = require('gulp-sass');
var jshint = require('gulp-jshint');
var minify = require('gulp-minify');
 

gulp.task('sass', function () {
  return gulp.src('./sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist/css'));
});
 
gulp.task('watch', function () {
  gulp.watch('./sass/**/*.scss', ['sass']);
  gulp.watch('./lib/**/*.ja', ['lint']);
});

gulp.task('lint', function() {
  return gulp.src('./lib/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('compress', function() {
  gulp.src('lib/*.js')
    .pipe(minify({
        ext : {
            min:'.min.js'
        },
        noSource : true
    }))
    .pipe(gulp.dest('dist/lib'))
});
  
gulp.task('deploy', function() {
  gulp.start('lint', 'sass', 'compress');
});