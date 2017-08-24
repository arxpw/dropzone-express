var gulp   = require('gulp');
var sass   = require('gulp-sass');

var uncss  = require('gulp-uncss');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var gutil  = require('gulp-util');
var rename = require('gulp-rename');
var gimpts = require('gulp-imports');

gulp.task('css-minify', function() {
  gulp.src('./src/scss/main.scss')
      .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
      .pipe(concat('production.css'))
      .pipe(gulp.dest('./public/dist/css/'));
});

gulp.task('js-minify', function(){
  return gulp.src(
    [
      './src/js/libs/jquery.js',
      './src/js/libs/dropzone.js',
      './src/js/javascript.js'
    ])
    .pipe(gimpts())
    .pipe(concat('concat.js'))
    .pipe(gulp.dest('./public/dist/js'))
    .pipe(rename('production.js'))
    .pipe(uglify().on('error', function(err) {
      gutil.log(gutil.colors.red('[Error]'), err.toString());
      this.emit('end');
    }))
    .pipe(gulp.dest('./public/dist/js'));
});

// watch
gulp.task('default',function() {
    gulp.watch('src/scss/**/**.scss',['css-minify']);
    gulp.watch('src/js/**/*.js',['js-minify']);
});