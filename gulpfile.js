var gulp         = require('gulp'),
    sass         = require('gulp-sass'),
    browserSync  = require('browser-sync'),
    concat       = require('gulp-concat'),
    uglify       = require('gulp-uglifyjs'),
    cssnano      = require('gulp-cssnano'),
    rename       = require('gulp-rename'),
    del          = require('del'),
    imagemin     = require('gulp-imagemin'),
    pngquant     = require('imagemin-pngquant'),
    cache        = require('gulp-cache'),
    autoprefixer = require('gulp-autoprefixer'),
    babel        = require('gulp-babel'),
    cleanCSS     = require('gulp-clean-css'),
    htmlmin      = require('gulp-htmlmin'),
    pump         = require('pump');

gulp.task('sass', function() {
  return gulp.src('src/scss/main.scss')
    .pipe(sass())
    .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
    .pipe(gulp.dest('src/css'))
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('scripts', function() {
  return gulp.src('src/babel/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
    // .pipe(uglify())
    .pipe(gulp.dest('src/js'))
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: 'src'
    },
    notify: false
  });
});

gulp.task('clean', function() {
  return del.sync('dist');
});

gulp.task('clear', function() {
  return cache.clearAll();
});

gulp.task('img', function() {
  return gulp.src('src/img/**/*')
  .pipe(cache(imagemin({
    interlaced: true,
    progressive: true,
    svgoPlugins: [{removeViewBox: false}],
    use: [pngquant()]
  })))
  .pipe(gulp.dest('dist/img'));
});

gulp.task('watch', ['browser-sync', 'sass', 'scripts'], function() {
  gulp.watch('src/scss/**/*.scss', ['sass'], browserSync.reload);
  gulp.watch('src/*.html', browserSync.reload);
  gulp.watch('src/babel/**/*.js', ['scripts'], browserSync.reload);
  // gulp.watch('src/js/**/*.js', browserSync.reload);
});

gulp.task('createInlineCSS', function() {
  return gulp.src('src/scss/inline.scss')
    .pipe(sass())
    .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('src/css'))
});

gulp.task('compressJS', function (cb) {
  pump([
        gulp.src('src/js/**/*.js'),
        uglify(),
        gulp.dest('dist/js')
    ],
    cb
  );
});

gulp.task('compressCSS', function() {
  return gulp.src('src/css/**/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('compressHTML', function() {
  return gulp.src('src/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist'));
});

gulp.task('build', ['clean', 'createInlineCSS', 'img', 'sass', 'scripts', 'compressCSS', 'compressJS', 'compressHTML'], function() {
  var buildFiles = gulp.src([
    'src/*.htaccess',
    ]).pipe(gulp.dest('dist'));
});