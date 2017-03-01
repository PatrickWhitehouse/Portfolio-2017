var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require("gulp-rename");
var del = require('del');
var notify = require("gulp-notify");
var cleanCSS = require('gulp-clean-css');
var browserSync = require('browser-sync').create();
var imagemin = require('gulp-imagemin');
var csscomb = require('gulp-csscomb');

// Default task
gulp.task('default', ['browser-sync']);

// Browsersync Setup
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        },
        notify: false
    });
    gulp.watch("./**/*.html").on('change', browserSync.reload);
    gulp.watch('sass/styles.scss', ['sass']).on('change', browserSync.reload);
});


// Sass Conversion

gulp.task('sass', function () {
  return gulp.src('./sass/styles.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest('./css/'))
    .pipe(notify("OOOOO Killum!"));
});


// Image Compression

gulp.task('imagemin',['minify-css'], function(){
  return gulp.src('./dist/img/*')
       .pipe(imagemin({
         progressive: true,
         optimizationLevel: 7
       }))
       .pipe(gulp.dest('./dist/img/'))
});






// Build Task

gulp.task('copy',['del-dist'], function(){
  return gulp.src('./**')
  .pipe(gulp.dest('./dist/'))
});


gulp.task('del',['copy'], function(){
  del.sync([
    './dist/node_modules',
    './dist/sass',
    './dist/gulpfile.js'
  ])
});

gulp.task('del-dist', function(){
  del.sync([
    './dist'
  ])
});

// CSS Minify once build

gulp.task('minify-css', ['del'], function() {
  return gulp.src('./dist/css/styles.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('./dist/css/'));
});

gulp.task('build', ['del-dist','copy', 'del', 'minify-css', 'imagemin']);

// CSS Comb once minified 

gulp.task('comb', function() {
  return gulp.src('build/css/styles.css')
    .pipe(csscomb())
    .pipe(gulp.dest('./build/css'));
});
