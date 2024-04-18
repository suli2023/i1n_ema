
const { src, dest, series, parallel, watch } = require('gulp');
const uglify = require('gulp-uglify');
const cleanCss = require('gulp-clean-css');
const browserSync = require('browser-sync').create();
 
function genHTML(cb) {
    console.log('HTML copying...');
    src('src/**/*.html')
    .pipe(dest('public'))
    cb();
}
 
function minifyJS(cb) {
  console.log('JavaScript minification ...');
  src('src/**/*.js')
    .pipe(uglify())
    .pipe(dest('public'));
  cb();
}
 
function minifyCSS(cb) {
  console.log('CSS minification ...');
  src('src/**/*.css')
    .pipe(cleanCss())
    .pipe(dest('public'));
  cb();
}
 
function build(cb) {
  parallel(genHTML, minifyJS, minifyCSS)(cb);
}

exports.default = build;

