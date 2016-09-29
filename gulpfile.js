'use strict';
 
const gulp = require('gulp');
const watch = require('gulp-watch');
const sass = require('gulp-sass');
const jshint = require('gulp-jshint');
const minify = require('gulp-minify');
const webserver = require('gulp-webserver');
const babel = require('gulp-babel');

gulp.task('sass', () => {
  return gulp.src('./sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist/css'))
    .on('error', swallowError);
});
 
gulp.task('watch', () => {
  gulp.watch('./sass/**/*.scss', ['sass']);
  gulp.watch('./lib/**/*.js', ['minify']);
});

gulp.task('lint', () => {
  return gulp.src('./lib/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .on('error', swallowError);
});

gulp.task('minify', ['lint'], () => {
  return gulp.src('lib/*.js')
    .pipe(babel({
        presets: ['es2015']
    }))
    .pipe(minify({
        ext : {
            min:'.min.js'
        },
        noSource : true
    }))
    .pipe(gulp.dest('dist/lib'))
    .on('error', swallowError);
});
  
gulp.task('deploy', () => {
  gulp.start('sass', 'minify');
});

gulp.task('server', () => {
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