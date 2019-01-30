'use strict';

var browserSync = require('browser-sync').create(),
  gulp = require('gulp'),
  nodemon = require('gulp-nodemon'),
  reload = browserSync.reload;

gulp.task('browser-sync',
  [
    'nodemon'
  ],
  function() {
    browserSync.init(null, {
      proxy: 'http://localhost:8080/',
      browser: 'google-chrome',
      port: 5000,
      notify: false
    });
  }
);

gulp.task('nodemon',
  [],
  function (done) {
    var running = false;

    return nodemon({
      script: 'main.js',
      watch: ['database.db']
    })
    .on('start', function () {
      if (!running) {
        done();
      }
      running = true;
    })
    .on('restart', function () {
      setTimeout(function () {
        reload();
      }, 500);
    });
  }
);