/**
 * Created by Mesamo on 2015/11/30.
 */
var gulp = require('gulp');
var rimraf = require('gulp-rimraf');
var es = require('event-stream');
var config = require('./config');
var inject = require('gulp-inject');
var series = require('stream-series');
//var uglify = require('gulp-uglify');

gulp.task('clean-build', function () {
    return gulp.src(config.build_dir.base, {read: false})
        .pipe(rimraf());
});

gulp.task('clean-dist', function () {
    return gulp.src(config.dist_dir.base, {read: false})
        .pipe(rimraf());
});

//复制index.html到构建目录
gulp.task('copy_index', function () {
    gulp.src(['./src/app/index.html', './src/app/app.js', './src/app/package.json'])
        .pipe(gulp.dest(config.build_dir.base))
});

//复制第三方库到构建目录
gulp.task('copy_vendor', function () {
    es.merge(
        gulp.src(config.vendor.jquery)
            .pipe(gulp.dest(config.build_dir.vendor + '/jquery')),

        gulp.src(config.vendor.marked)
            .pipe(gulp.dest(config.build_dir.vendor + '/marked')),

        gulp.src(config.vendor.bootstrap)
            .pipe(gulp.dest(config.build_dir.vendor + '/bootstrap'))
    )
});

gulp.task('copy_scripts', function(){
    gulp.src('./src/app/scripts/*.js')
        .pipe(gulp.dest(config.build_dir.script))
});


gulp.task('inject', function(){
    var vendor_series = series(
        gulp.src(config.build_dir.vendor + '/marked/**/*.js', {read: false}),
        gulp.src(config.build_dir.vendor + '/bootstrap/**/*.js', {read: false})
    );

    var css_series = series(
        gulp.src(config.build_dir.vendor + '/bootstrap/**/*.css', {read: false})
    );

    var script_series = series(
        gulp.src(config.build_dir.script + '/init.js', {read: false})
    );

    gulp.src(config.build_dir.base + '/index.html')
        .pipe(inject(css_series, {relative: true, starttag: '<!-- inject:css -->'}))
        .pipe(inject(vendor_series, {relative: true, starttag: '<!-- inject:vendor -->'}))
        .pipe(inject(script_series, {relative: true, starttag: '<!-- inject:scripts -->'}))
        .pipe(gulp.dest(config.build_dir.base))
});