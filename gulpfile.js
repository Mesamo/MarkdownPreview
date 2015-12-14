/**
 * Created by Mesamo on 2015/11/30.
 */
var config = require('./config');
var gulp = require('gulp');
var rimraf = require('gulp-rimraf');
var event_stream = require('event-stream');
var inject = require('gulp-inject');
var series = require('stream-series');
var run_sequence = require('run-sequence');
var sass = require('gulp-sass');

gulp.task('clean-build', function () {
    gulp.src(config.build_dir.base, {read: false})
        .pipe(rimraf());
});

gulp.task('clean-dist', function () {
    gulp.src(config.dist_dir.base, {read: false})
        .pipe(rimraf());
});

//复制index.html到构建目录
gulp.task('copy_index', function () {
    return gulp.src(['./src/app/index.html', './src/app/app.js', './src/app/package.json'])
        .pipe(gulp.dest(config.build_dir.base))
});

//复制第三方库到构建目录
gulp.task('copy_vendor', function () {
    return event_stream.merge(
        gulp.src(config.vendor.jquery)
            .pipe(gulp.dest(config.build_dir.vendor + '/jquery')),

        gulp.src(config.vendor.marked)
            .pipe(gulp.dest(config.build_dir.vendor + '/marked')),

        gulp.src(config.vendor.bootstrap)
            .pipe(gulp.dest(config.build_dir.vendor + '/bootstrap'))
    )
});

//复制js文件到构建目录
gulp.task('copy_scripts', function () {
    return gulp.src('./src/app/scripts/*.js')
        .pipe(gulp.dest(config.build_dir.script))
});

//编译sass
gulp.task('sass', function () {
    return gulp.src('./src/themes/mdpstyle.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(config.build_dir.themes))
});

//监视sass文件，如果有改动就重新编译
gulp.task('sass:watch', function () {
    gulp.watch('./src/themes/*.scss', ['sass'])
});

//index.html中注入scripts和css
gulp.task('inject', function () {
    var vendor_series = series(
        gulp.src(config.build_dir.vendor + '/marked/**/*.js', {read: false}),
        gulp.src(config.build_dir.vendor + '/bootstrap/**/*.js', {read: false})
    );

    var css_series = series(
        gulp.src(config.build_dir.vendor + '/bootstrap/**/*.css', {read: false}),
        gulp.src(config.build_dir.themes + '/*.css', {read: false})
    );

    var script_series = series(
        gulp.src(config.build_dir.script + '/init.js', {read: false})
    );

    return gulp.src(config.build_dir.base + '/index.html')
        .pipe(inject(css_series, {relative: true, starttag: '<!-- inject:css -->'}))
        .pipe(inject(vendor_series, {relative: true, starttag: '<!-- inject:vendor -->'}))
        .pipe(inject(script_series, {relative: true, starttag: '<!-- inject:scripts -->'}))
        .pipe(gulp.dest(config.build_dir.base))
});

gulp.task('default', function () {
    run_sequence('copy_index', 'copy_vendor', 'copy_scripts', 'sass', 'inject')
});