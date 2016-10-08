'use strict';

const fs        = require('fs');
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
  gulp.watch('src/sass/**/*.scss', ['sass']);
  gulp.watch('src/**/*.js', ['minify']);
  gulp.watch('src/example/*.*', ['deploy']);
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
        mangle: {
          except: ['hide', 'this']
        },
        noSource : true
    }))
    .pipe(gulp.dest('dist'))
    .on('error', swallowError);
});

gulp.task('deploy', ['minify', 'sass'], () => {
  const content = {
    lib         : fs.readFileSync('dist/hide-it.min.js', 'utf-8').trim(),
    style       : fs.readFileSync('dist/css/master.css', 'utf-8').trim(),
    usage       : fs.readFileSync('src/example/usage.js', 'utf-8').trim(),
    hideItHtml  : fs.readFileSync('src/example/hide-it.html', 'utf-8').trim()
  };

  gulp.src('src/README.md')
    .pipe(template(content))
    .pipe(gulp.dest('.', { overwrite : true }));

  gulp.src('src/example/index.html')
    .pipe(template(content))
    .pipe(rename('example.html'))
    .pipe(gulp.dest('dist', { overwrite : true }));

  gulp.src('src/test/index.html')
    .pipe(template(content))
    .pipe(gulp.dest('test', { overwrite : true }));
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