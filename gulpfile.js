const gulp = require('gulp');

const autoprefixer = require('gulp-autoprefixer');
const jshint = require('gulp-jshint');
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const cssnano = require('gulp-cssnano');
const jade = require('gulp-jade');


// Lint Task
gulp.task('lint', function() {
  return gulp.src('src/js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// Compile SASS
gulp.task('sass', function() {
  return gulp.src('src/scss/*.scss')
    .pipe(sass())
    .pipe(cssnano())
    .pipe(autoprefixer({
      browsers: ['last 10 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('dist/css'));
});

// Minify JS
gulp.task('scripts', function() {
  return gulp.src('src/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});

// Compile Jade
gulp.task('jade', function() {
  var locals = {};

  gulp.src('src/*.jade')
    .pipe(jade({
      locals: locals
    }))
    .pipe(gulp.dest('dist/'));
});

// Watch Files For Changes
gulp.task('watch', function() {
  gulp.watch('src/js/*.js', ['lint', 'scripts']);
  gulp.watch('src/scss/*.scss', ['sass']);
  gulp.watch('src/*.jade', ['jade']);
});

// Default Task
gulp.task('default', ['lint', 'sass', 'scripts', 'jade', 'watch']);
