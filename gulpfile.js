'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass')(require('sass'));
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
const babel = require('gulp-babel');
const terser = require('gulp-terser');

// compile scss to css
gulp.task('sass', function () {
    return gulp.src('./sass/styles.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename({basename: 'styles.min'}))
        .pipe(gulp.dest('./css'));
});

// watch changes in scss files and run sass task
gulp.task('sass:watch', function () {
    gulp.watch('./sass/**/*.scss', ['sass']);
});

// minify js
gulp.task('minify-js', () => {
    return gulp.src('js/scripts.js')
        .pipe(babel({ presets: ['@babel/preset-env'] })) // Transpile ES6+ to ES5
        .pipe(terser()) // Minify the output
        .pipe(rename({ suffix: '.min' })) // Rename to scripts.min.js
        .pipe(gulp.dest('js')); // Output to dist/js folder
});

// default task
gulp.task('default', gulp.series('sass', 'minify-js'));