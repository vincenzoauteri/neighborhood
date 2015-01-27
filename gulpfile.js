//Followed tutorial at
//http://markgoodyear.com/2014/01/getting-started-with-gulp/
//Need to have npm packages installed locally
var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var jshint = require('gulp-jshint');
var minifycss = require('gulp-minify-css');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var del = require('del');
var runSequence= require('run-sequence');
var plumber = require('gulp-plumber');
var imagemin = require('gulp-imagemin');


//Pre cleaning minified files
gulp.task('pre-clean', function(cb) {
    del([
        'css/*min*css',
        'js/*min*js']);
});

//Compress images using cache, so that images already compressed are not
//affected
gulp.task('images', function() {
    return gulp.src('img/*')
    .pipe(plumber())
    .pipe(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true }))
    .pipe(gulp.dest('img'));
});


//Minify css
gulp.task('css', function() {
    return gulp.src('css/*.css')
    .pipe(plumber())
    .pipe(gulp.dest('css'))
    .pipe(rename({suffix:'.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('css'));
});


//Lint and minify js
gulp.task('js', function() {
    return gulp.src('js/*.js')
    .pipe(plumber())
    .pipe(jshint.reporter('default'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('js'));
});

gulp.task('default', ['pre-clean'], function() {
    runSequence('css',
                'js',
                'images'); 
});

// Handle the error
function errorHandler (error) {
    console.log(error.toString());
    this.emit('end');
}
