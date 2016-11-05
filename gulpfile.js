// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var moreCSS = require('gulp-more-css');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
var jade = require('gulp-jade');

// Lint Task
gulp.task('lint', function() {
  return gulp.src('src/js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// Compile Our Sass
gulp.task('sass', function() {
  return gulp.src('src/scss/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('dist/css'));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
  return gulp.src('src/js/*.js')
    .pipe(rename('common.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});

// Minify CSS
gulp.task('minifys', function() {
  return gulp.src('dist/css/*.css')
    .pipe(cssnano())
    .pipe(gulp.dest('dist/css'));
});
 
gulp.task('jade', function() {
  var YOUR_LOCALS = {};
 
  gulp.src('src/*.jade')
    .pipe(jade({
      locals: YOUR_LOCALS
    }))
    .pipe(gulp.dest('./dist/'))
});

// Minify images
gulp.task('images', function() {
  gulp.src('src/img/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/img'))
});

// Watch Files For Changes
gulp.task('watch', function() {
  gulp.watch('src/js/*.js', ['lint', 'scripts']);
  gulp.watch('src/img/*', ['images']);
  gulp.watch('src/scss/*.scss', ['sass']);
  gulp.watch('src/*.jade', ['jade']);
  gulp.watch('dist/css/*.css', ['minifys'])
});

// Default Task
gulp.task('default', ['lint', 'sass', 'scripts', 'minifys', 'jade', 'images', 'watch']);