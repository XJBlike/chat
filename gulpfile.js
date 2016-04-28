var gulp = require('gulp');
var gutil = require('gulp-util');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var clean = require('gulp-clean');

var paths = {
  sass: ['./scss/**/*.scss']
};


gulp.task('sass',['cleanCss','minCss'], function (done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass())
    .pipe(gulp.dest('./www/distCss/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({extname: '.min2016040701.css'}))
    .pipe(gulp.dest('./www/distCss/'))
    .on('end', done);
});


gulp.task('minCss',function(done){
  gulp.src('./www/css/*.css')
    .pipe(concat('all.css'))
    .pipe(gulp.dest('./www/distCss/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({extname: '.min2016040701.css'}))
    .pipe(gulp.dest('./www/distCss/'))
    .on('end', done);
});


//gulp.task('watch', function () {
//    gulp.watch(paths.sass, ['sass']);
//});

gulp.task('cleanCss',function(){
  return gulp.src(['www/distCss'],{read: false}).pipe(clean());
});

gulp.task('clean', function() {
  return gulp.src(['www/distJS'],{read: false}).pipe(clean());
});

gulp.task('default',['sass','minjs'],function() {
});

//
gulp.task('minjs',['clean'], function () {
  // 源地址
  gulp.src(['./www/lib/**/*.js','!./www/lib/ionic/js/**/*.js',
      './www/js/**/*.js', './www/user/**/*.js',
      './www/download/**/*.js'])
    .pipe(concat('all.js'))
    .pipe(gulp.dest('./www/distJS/'))
    // 压缩
    .pipe(uglify({
      // 保留部分注释
      preserveComments: 'some'
    }))
    // 重命名
    .pipe(rename({
      // 文件后缀
      extname: '.min2016040701.js'
    }))
    // 目标地址
    .pipe(gulp.dest('./www/distJS/'));
});



