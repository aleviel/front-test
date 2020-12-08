const gulp = require('gulp'),
    browserSync = require('browser-sync'),
    sass = require('gulp-sass'),
    cleanCSS = require('gulp-clean-css'),
    rename = require("gulp-rename"),
    autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps');

/* sass.compiler = require('node-sass'); */

// Static server
gulp.task('server', function () {
    browserSync.init({
        server: {
            baseDir: "dist"
        }
    });
});

// scss => dist + min + prefix
gulp.task('styles', function () {
    return gulp.src('src/scss/*.+(sass|scss)')
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(rename({
            prefix: "",
            suffix: ".min",
        }))
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 11'],
            { cascade: false }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream());
});

//js => dist + min
gulp.task('scripts', function () {
    return gulp.src(['src/js/*.js'])
        .pipe(sourcemaps.init())
        .pipe(concat('scripts.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/js'));
});

//index.html => dist
gulp.task('index', function () {
    return gulp.src(['src/index.html'])
        .pipe(gulp.dest('dist'));
});

//watcher
gulp.task('watch', function () {
    gulp.watch('src/scss/**/*.+(sass|scss)', gulp.parallel('styles'));
    gulp.watch('src/js/*.js', gulp.parallel('scripts'));
    gulp.watch('src/index.html', gulp.parallel('index'));
    gulp.watch('src/*.html').on('change', browserSync.reload);

});

//watcher + server
gulp.task('start', gulp.parallel('watch', 'server'));

//build project + server
gulp.task('build', gulp.parallel('index', 'scripts', 'styles', 'server'));
