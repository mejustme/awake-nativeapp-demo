//引入插件
var gulp = require('gulp'),
    livereload = require('gulp-livereload'),
    less = require('gulp-less'),
    minifycss = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    browserify = require('gulp-browserify');

//less任务
gulp.task('less', function() {
  return gulp.src('less/**/*.less')
         .pipe(less())
         .pipe(rename({suffix: '.min'}))
         .pipe(gulp.dest('build/css'))
         .pipe(minifycss())
         .pipe(livereload());
});

//js任务
gulp.task('js', function() {
  return gulp.src('js/**/*.js', {})  //{read:false}
             .pipe(jshint())
             .pipe(jshint.reporter('default'))
             //.pipe(browserify())
            // .pipe(uglify())
             .pipe(rename({suffix: '.min'}))
             .pipe(gulp.dest('build/js'))
             .pipe(livereload());
});

//清理
gulp.task('clean', function() {
  return gulp.src('bulid', {read: false})
             .pipe(clean());
});

//搬运
gulp.task('remove', function () {
    gulp.src('pages/**/*.html')  //有*匹配到的路径及文件方法下面路径下
              .pipe(gulp.dest('build/pages'))
              .pipe(livereload());
});

//定义watch任务
gulp.task('watch', function() {
   livereload.listen();
   gulp.watch('less/**/*.less',['less']);
   gulp.watch('js/**/*.js',['js']);
   gulp.watch('pages/**/*.html',['remove']);
});

//gulp默认任务
//gulp.task('default', ['less', 'watch']);
gulp.task('default', ['clean'], function() {
    gulp.start('remove','less','js', 'watch');
});