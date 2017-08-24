var gulp = require('gulp'),
// Requires the gulp-sass plugin
sass = require('gulp-sass'),
browserSync = require('browser-sync').create(),
cleanCSS = require('gulp-clean-css'),
uglify = require('gulp-uglify'),
imagemin = require('gulp-imagemin'),
concat = require('gulp-concat'),
javascriptObfuscator = require('gulp-javascript-obfuscator'),
htmlmin = require('gulp-htmlmin');

gulp.task('sass', function(){
  return gulp.src('source/scss/style.scss')
    .pipe(sass()) // Using gulp-sass
    .pipe(gulp.dest('dest/css'))
	.pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'dest'
    },
  })
})

gulp.task('minify-css', () => {
  return gulp.src(['dest/css/*.css','source/css/*.css'])
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('dest/css'));
});


gulp.task('compress', function () {
	return gulp.src('source/js/*.js')
		.pipe(uglify())
		.pipe(gulp.dest('dest/js'));
});

gulp.task('scripts', function() {
  return gulp.src(['dest/js/jquery-1.11.3.min.js','dest/js/TweenMax.min.js','dest/js/jquery-parallax.js','dest/js/script.js'])
    .pipe(concat('kscripts.js'))
	.pipe(javascriptObfuscator())
    .pipe(gulp.dest('dest/js/'))
	.pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('images', function(){
  return gulp.src('source/img/*.+(png|jpg|jpeg|gif|svg)')
  .pipe(imagemin({
      // Setting interlaced to true
      interlaced: true
    }))
  .pipe(gulp.dest('dest/img'))
});

gulp.task('minify-html', function() {
  return gulp.src('source/*.html')
    .pipe(htmlmin({
		collapseWhitespace: true
	}))
    .pipe(gulp.dest('dest'))
	.pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('watch',['browserSync', 'sass'], function(){
	gulp.watch('source/scss/style.scss', ['sass']); 
	gulp.watch('dest/css/*.css', ['minify-css']);  
	gulp.watch('source/js/*.js', ['compress']); 
	gulp.watch(['dest/js/jquery-1.11.3.min.js','dest/js/TweenMax.min.js','dest/js/jquery-parallax.js','dest/js/script.js'], ['scripts']); 
	gulp.watch('source/img/*.+(png|jpg|jpeg|gif|svg)', ['images']); 
	gulp.watch('source/*.html', ['minify-html']); 
	// Reloads the browser whenever HTML or JS files change
	//gulp.watch('dest/*.html', browserSync.reload); 
	//gulp.watch('dest/js/*.js', browserSync.reload); 
})