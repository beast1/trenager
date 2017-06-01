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
    babel        = require('gulp-babel');

gulp.task('sass', function() {
  return gulp.src('src/scss/main.scss')
    .pipe(sass())
    .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
    .pipe(gulp.dest('src/css'))
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('scripts', function() {
  return gulp.src('src/babel/script.js')
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

gulp.task('build', ['clean', 'img', 'sass', 'scripts'], function() {
  
  var buildCss = gulp.src('src/css/main.css')
    .pipe(cssnano())
    .pipe(gulp.dest('dist/css'));
  
  var buildFonts = gulp.src('src/fonts/**/*')
    .pipe(gulp.dest('dist/fonts'));
  
  var buildJs = gulp.src('src/js/**/*')
    .pipe(gulp.dest('dist/js'));
  
  var buildHtml = gulp.src('src/*.html')
//    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist'));
});