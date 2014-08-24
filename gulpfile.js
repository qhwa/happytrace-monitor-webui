var gulp        = require('gulp');
var sass        = require('gulp-ruby-sass');
var browserSync = require('browser-sync');
var reload      = browserSync.reload;
var jade        = require('gulp-jade');
var sourcemaps  = require('gulp-sourcemaps');
var coffee      = require('gulp-coffee');
var gutil       = require('gulp-util');
var bowerSrc    = require('gulp-bower-src');
var watch       = require('gulp-watch');
var modRewrite  = require('connect-modrewrite');

gulp.task('default', ['watch', 'sass', 'jade', 'coffee', 'bower', 'server']);

gulp.task('watch', function() {
  watch({ glob: 'app/**/*.scss',   name: 'sass'}, ['sass', reload]);
  watch({ glob: 'app/**/*.jade',   name: 'jade'}, ['jade', reload]);
  watch({ glob: 'app/**/*.coffee', name: 'coffee'}, ['coffee', reload]);
});

/**
 * @task jade
 * compile jade template into html
 */
gulp.task('jade', function() {
  return gulp.src('app/views/**/*.jade')
    .pipe(jade())
    .on('error', gutil.log )
    .pipe(gulp.dest('public/'));
});

/**
 * @task sass
 * compile sass into css
 */
gulp.task('sass', function() {
  return gulp.src('app/styles/**/*.scss')
    .pipe(sass({
      loadPath: ['app/styles', 'bower_components']
    }))
    .on('error', gutil.log )
    .pipe(gulp.dest('public/styles'));
});

/**
 * @task coffee
 * compile coffescript into javascript
 */
gulp.task('coffee', function() {
  return gulp.src('app/scripts/**/*.coffee')
    .pipe(sourcemaps.init())
    .pipe(coffee()).on('error', gutil.log)
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
      baseDir: ['public', './'],
      port: 3001,
      middleware: [
        modRewrite([
          '^/(api/.*)$ http://localhost:3000/$1 [P]'
        ])
      ]
    }
  });
});



gulp.task('bower', function () {
  bowerSrc()
    .pipe(gulp.dest('public/lib'));
});
