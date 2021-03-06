var gulp = require('gulp');
var postcss = require('gulp-postcss');
var cssnext = require('postcss-cssnext');
var cssnested = require('postcss-nested');
var mixins = require('postcss-mixins');
var atImport = require('postcss-import');
var browserSync = require('browser-sync').create();
var mqpacker = require("css-mqpacker");
var lost = require("lost");
var cssnano = require('gulp-cssnano');

var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

var nodemon = require('gulp-nodemon');


var jsFiles = './development/js/**/*.js';
var jsDest = './public/javascripts/';

var cssFiles = './development/**/*.css';
var cssDest = './public/stylesheets/';

//Nodemon included for Backend

gulp.task('nodemon', function (cb) {

	var started = false;

	return nodemon({
		script: './bin/www'
	}).on('start', function () {
		// to avoid nodemon being started multiple times
		// thanks @matthisk
		if (!started) {
			cb();
			started = true;
		}
	});
});

// Servidor de desarrollo
gulp.task('serve', ['nodemon'], function(){
  browserSync.init(null, {
		proxy: "http://localhost:3000",
        files: ["./public/**/*.*"],
        browser: "google chrome",
        port: 7000,
	});
});

// Tarea para procesar los JS

gulp.task('scripts', function() {

    return gulp.src(jsFiles)
        .pipe(concat('main.js'))
        .pipe(gulp.dest(jsDest))
        .pipe(rename('main.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(jsDest));
});

// Tarea para procesar el CSS
gulp.task('css', function(){

	var processors = [
		atImport(),
		mixins(),
		cssnested,
		lost(),
		cssnext({browsers: ['> 5%', 'ie 8']}),
		mqpacker(),
	];

	return gulp.src('./development/css/main.css')
		.pipe(postcss(processors))
		.pipe(gulp.dest(cssDest))
    .pipe(rename('main.min.css'))
    .pipe(cssnano())
    .pipe(gulp.dest(cssDest))
		.pipe(browserSync.stream());
});

// Watch para vigilar los cambios
gulp.task('watch', function(){
	gulp.watch(cssFiles, ['css']);
  gulp.watch(jsFiles, ['scripts']);
  gulp.watch('./views/**/*.ejs').on('change', browserSync.reload);
	gulp.watch('./dist/*.html').on('change', browserSync.reload);
	gulp.watch(jsDest + '**/*.js').on('change', browserSync.reload);
});

gulp.task('default', ['watch', 'serve']);
