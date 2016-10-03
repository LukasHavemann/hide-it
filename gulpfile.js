'use strict';

const fs        = require('fs');
const es        = require('event-stream');
const gulp      = require('gulp');
const sass      = require('gulp-sass');
const watch     = require('gulp-watch');
const babel     = require('gulp-babel');
const jshint    = require('gulp-jshint');
const minify    = require('gulp-minify');
const rename    = require("gulp-rename");
const template  = require('gulp-template');
const webserver = require('gulp-webserver');

gulp.task('sass', () => {
  return gulp.src('src/sass/**/*.scss')
    .pipe(sass({ outputStyle : 'compressed' })
    .on('error', sass.logError))
    .pipe(gulp.dest('dist/css'))
    .on('error', swallowError);
});
 
gulp.task('watch', () => {
  gulp.watch('sass/**/*.scss', ['sass']);
  gulp.watch('src/**/*.js', ['minify']);
});

gulp.task('lint', () => {
  return gulp.src('src/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .on('error', swallowError);
});

gulp.task('minify', ['lint'], () => {
  return gulp.src('src/*.js')
    .pipe(babel({
        presets: ['es2015']
    }))
    .pipe(minify({
        ext : {
            min:'.min.js'
        },
        noSource : true
    }))
    .pipe(gulp.dest('dist'))
    .on('error', swallowError);
});
  
gulp.task('deploy', ['minify', 'sass'], () => {
  const content = template({
    lib         : fs.readFileSync('dist/hide-it.min.js', 'utf-8').trim(),
    style       : fs.readFileSync('dist/css/master.css', 'utf-8').trim(),
    usage       : fs.readFileSync('src/example/usage.js', 'utf-8').trim(),
    hideItHtml  : fs.readFileSync('src/example/hide-it.html', 'utf-8').trim()
  });

  // merge multiple sources to one event-stream
  return es.merge(
    gulp.src('src/README.md')
      .pipe(content)
      .pipe(rename('README.md'))
      .pipe(gulp.dest('.')),

    gulp.src('src/test/index.html')
      .pipe(content)
      .pipe(rename('index.html'))
      .pipe(gulp.dest('test')),

    // buils the example file from all components
    gulp.src('src/example/index.html')
      .pipe(content)
      .pipe(rename('example.html'))
      .pipe(gulp.dest('dist')));
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
  console.error(error.toString())
  this.emit('end')
}