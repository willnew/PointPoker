'use strict';

const gulp = require('gulp');
const mocha = require('gulp-mocha');
const gutil = require('gulp-util');

gulp.task('test', function() {
  return gulp.src([
    'src/test/domain/*Spec.js',
    'src/test/module/*Spec.js'
  ], { read: false })
  .pipe(mocha({
    reporter: 'spec',
  }))
  .on('error', gutil.log);
});

gulp.task('watch-test', function() {
  gulp.watch([
    'src/main/**', 
    'src/test/**'
  ], ['test']);
});
