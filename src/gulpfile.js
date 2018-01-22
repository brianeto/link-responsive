const
  gulp = require('gulp'),
  sass = require('gulp-sass'),
  postcss = require('gulp-postcss'),
  autoprefixer = require('autoprefixer'),
  imagemin = require('gulp-imagemin'),
  browserSync = require('browser-sync').create();

// sass tasks
gulp.task('sass', () =>
  gulp.src('scss/main.scss')
    .pipe(postcss([autoprefixer()]))
    .pipe(sass({
      sourceComments: false,
      outputStyle: 'compressed'
    }))
    .pipe(gulp.dest('../'))
    .pipe(browserSync.stream())
);


// sass lint ftw
gulp.task('sass_lint', lintCssTask = () => {
  const gulpStylelint = require('gulp-stylelint');
  return gulp
    .src('scss/**/*.scss')
    .pipe(gulpStylelint({
      reporters: [
        { formatter: 'string', console: true }
      ]
    }));
});

// images optimization
gulp.task('images', () =>
  gulp.src('images/*')
    .pipe(imagemin({ verbose: true }))
    .pipe(gulp.dest('../images/'))
);

// Static Server + watching scss/html files
gulp.task('default', ['sass'], () => {
  browserSync.init({
      server: {
        baseDir: '../'
      }
  });
  gulp.watch('scss/**/*.scss', ['sass']);
  gulp.watch('*.html').on('change', browserSync.reload);
});
