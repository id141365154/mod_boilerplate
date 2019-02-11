var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var cleanCSS = require('gulp-clean-css');
var rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');
var fileinclude = require('gulp-file-include');
var eslint = require('gulp-eslint');
var notify = require("gulp-notify");
var rjs = require('gulp-requirejs');


var OPTIONS = {
	JS_SRC: "src/js/",
	SCSS_SRC: "src/scss/"
}


gulp.task('sass', function() {
	return gulp.src(OPTIONS.SCSS_SRC + '**/*.scss')
		.pipe(sass())
		.on("error", notify.onError(function(sass) {
			console.log('sass', sass);
			return "Message to the notifier: " + sass.message;
		}))
		.pipe(rename({
			suffix: '',
			prefix: ''
		}))
		.pipe(autoprefixer(['last 15 versions']))
		.pipe(cleanCSS())
		.pipe(gulp.dest('css'));
});



gulp.task('common_js', function() {

	return gulp.src(
			[
				//OPTIONS.JS_SRC + 'lib/**/*.js',  // OTHER COMMON LIBS
				OPTIONS.JS_SRC + 'common/css-mod/css-mod.js',
				OPTIONS.JS_SRC + 'common/js-mod/js-mod.js',
				OPTIONS.JS_SRC + 'common/common.js'
			]
		)
		.pipe(sourcemaps.init())
		.pipe(babel({
				presets: ['@babel/env'],
				highlightCode: true,

			})
			.on("error", notify.onError(function(error) {
				return "Message to the notifier: " + error.message;
			})))
		.pipe(concat('common.min.js'))
		.pipe(uglify({
			compress: {
				drop_debugger: false
			}
		}))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('js/common'));
});



gulp.task('blocks_js', function() {

	return gulp.src(
			[
				OPTIONS.JS_SRC + 'blocks/**/*.js'
			]
		)
		.pipe(sourcemaps.init())
		.pipe(babel({
				presets: ['@babel/env'],
				highlightCode: true,

			})
			.on("error", notify.onError(function(error) {
				return "Message to the notifier: " + error.message;
			})))
		//.pipe(concat('main.min.js'))
		.pipe(uglify({
			compress: {
				drop_debugger: false
			}
		}))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('js/blocks'));
});

gulp.task('lib_js', function() {

	return gulp.src(
			[
				OPTIONS.JS_SRC + 'lib/**/*.js'
			]
		)
		/*.pipe(sourcemaps.init())
		.pipe(babel({
            presets: ['@babel/env'],
            highlightCode: true,

        })
        .on("error", notify.onError(function (error) {
                return "Message to the notifier: " + error.message;
              })))
		//.pipe(concat('main.min.js'))
		.pipe(uglify({
			compress: {
				drop_debugger: false
			}
		}))*/
		//.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('js/lib'));
});

gulp.task('watch', ['sass', 'common_js', 'lib_js', 'blocks_js'], function() {
	gulp.watch(OPTIONS.SCSS_SRC + '**/*.scss', ['sass']);
	gulp.watch(OPTIONS.JS_SRC + '**/*.js', ['common_js', 'lib_js', 'blocks_js']);
});

gulp.task('default', ['watch']);