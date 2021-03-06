var gulp = require('gulp');
var del = require('del');
var webserver = require('gulp-webserver');
var util = require('util');
var mocha = require('gulp-mocha');
var gutil = require('gulp-util');
var ts = require("gulp-typescript");
var changed = require('gulp-changed');

var tsDistProject = ts.createProject("tsconfig.json");
var tsTestProject = ts.createProject("tsconfig-test.json");

gulp.task('cleanDist', function() { return del([tsDistProject.config.compilerOptions.outDir]); });

gulp.task('cleanTest', function() { return del([tsTestProject.config.compilerOptions.outDir]); });

gulp.task('cleanAll', ['cleanDist', 'cleanTest']);

gulp.task('startWebServer', function() {
    gulp.src('.').pipe(webserver({
            livereload: true,
            directoryListing: true,
            open: true,
            port: 8085
        }));
});

gulp.task('stopWebServer', function() {
    var stream = gulp.src('.').pipe(webserver());
    stream.emit('kill');
});

gulp.task('buildDist', function() {
    return tsDistProject.src()
        .pipe(tsDistProject())
        .pipe(gulp.dest(tsDistProject.config.compilerOptions.outDir));
});

gulp.task('rebuildDist', ['cleanDist'], function() {
    return tsDistProject.src()
        .pipe(tsDistProject())
        .pipe(gulp.dest(tsDistProject.config.compilerOptions.outDir));
});

gulp.task('buildTest', function() {
    return tsTestProject.src()
        .pipe(tsTestProject())
        .pipe(gulp.dest(tsTestProject.config.compilerOptions.outDir));
});

gulp.task('rebuildTest', ['cleanTest'], function() {
    return tsTestProject.src()
        .pipe(tsTestProject())
        .pipe(gulp.dest(tsTestProject.config.compilerOptions.outDir));
});

gulp.task('buildAll', ['buildDist', 'buildTest']);

gulp.task('rebuildAll', ['rebuildDist', 'rebuildTest']);

gulp.task('runTests', function() {
    return gulp.src(['test/**/+(test.js|test-)*.js'], { read: false })
      .pipe(mocha({
        reporter: 'spec'
      }));
  });