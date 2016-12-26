const gulp = require('gulp');
const babel = require('gulp-babel');
const concat = require('gulp-concat');

const logError = (e) => {
  console.log(`error on line ${e.loc.line}`);
  console.log(`in ${e.fileName.substring(e.fileName.indexOf('/js') + 4, e.fileName.length)}`);
};

gulp.task('babel', () => {
  return gulp.src('js/**')
    .pipe(babel({
    	presets: ['es2015']
    }).on('error', (e) => logError(e)))
    .pipe(gulp.dest('dist'));
});

gulp.task('concat', () => {
  return gulp.src([
      'js/settings.js',
      'js/pub-sub.js',
      'js/controlls.js',
      'js/levels.js',
      'js/run-loop.js',
      'js/mario.js',
      'js/layout.js',
      'js/collision.js',
      'js/game.js'
    ])
    .pipe(concat('all.js'))
    .pipe(gulp.dest('dist'));
});

gulp.task('default', ['babel', 'concat']);

gulp.watch('js/**', (event) => {
  if (event.type === 'changed')
    gulp.run('default');
})
