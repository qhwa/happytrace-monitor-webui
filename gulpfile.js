var gulp        = require('gulp');
var sass        = require('gulp-ruby-sass');
var browserSync = require('browser-sync');
var reload      = browserSync.reload;
var jade        = require('gulp-jade');
var sourcemaps  = require('gulp-sourcemaps');
var coffee      = require('gulp-coffee');
var gutil       = require('gulp-util');
var bowerSrc    = require('gulp-bower-src');

gulp.task('default', ['sass', 'jade', 'coffee', 'bower', 'server'], function() {

  gulp.watch('**/*.scss', ['sass', reload]);
  gulp.watch('**/*.jade', ['jade', reload]);

});

/**
 * @task jade
 * compile jade template into html
 */
gulp.task('jade', function() {
  return gulp.src('app/templates/*.jade')
    .pipe(jade())
    .on('error', gutil.log )
    .pipe(gulp.dest('public/'));
});

/**
 * @task sass
 * compile sass into css
 */
gulp.task('sass', function() {
  return gulp.src('app/stylesheets/*.scss')
    .pipe(sass({
      loadPath: ['app/stylesheets', 'bower_components']
    }))
    .on('error', gutil.log )
    .pipe(gulp.dest('public/stylesheets'));
});

/**
 * @task coffee
 * compile coffescript into javascript
 */
gulp.task('coffee', function() {
  return gulp.src('app/scripts/*.coffee')
    .pipe(sourcemaps.init())
    .pipe(coffee({ bare: true })).on('error', gutil.log)
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./public/scripts'));
});

/**
 * @task server
 * run a http server listening 3000 port
 */
gulp.task('server', function() {
  browserSync({
    server: {
      baseDir: 'public'
    }
  });
});



gulp.task('bower', function () {
  bowerSrc()
    .pipe(gulp.dest('public/lib'));
});
