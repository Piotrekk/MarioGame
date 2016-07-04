const gulp = require('gulp');
const babel = require('gulp-babel');
const concat = require('gulp-concat');

gulp.task('babel', () => {
  return gulp.src('js/**')
  	.pipe(babel({
  		presets: ['es2015']
  	}))
  	.pipe(gulp.dest('dist'));
});

gulp.task('concat', () => {
  return gulp.src(['dist/run-loop.js', 'dist/mario.js', 'dist/layout.js', 'dist/game.js'])
    .pipe(concat('all.js'))
    .pipe(gulp.dest('dist'));
});

gulp.task('default', ['babel', 'concat']);

gulp.watch('js/**', (event) => {
  if (event.type === 'changed')
    gulp.run('default');
})
