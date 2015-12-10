/**
 * Created by Mesamo on 2015/11/30.
 */
var gulp = require('gulp');
var rimraf = require('gulp-rimraf');
var config = require('./config');

gulp.task('clean-build', function () {
    return gulp.src(config.build_dir.base, {read: false})
        .pipe(rimraf());
});

gulp.task('clean-dist', function () {
    return gulp.src(config.dist_dir.base, {read: false})
        .pipe(rimraf());
});