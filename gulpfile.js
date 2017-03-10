var gulp = require('gulp');

gulp.task('moveFile' , function(){
	return gulp.src('bower_components/*')
    .pipe(gulp.dest('public/libs/'));
})


gulp.task('default', function() {
  
});