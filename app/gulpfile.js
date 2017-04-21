// variables
var gulp = require('gulp');
var del = require('del');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync').create();
var mainBowerFiles = require('main-bower-files');
var autoprefixer = require('autoprefixer');
var postcssFlexbugsFixes = require('postcss-flexbugs-fixes');
// automatically loads plugins in package.json
var plugins = require('gulp-load-plugins')();
var config = require('./config.json');


// ** DEVELOPMENT TASKS

// compile sass to css with sourcemaps
gulp.task('sass', function () {
      return gulp
            .src('src/sass/main.scss')
            .pipe(plugins.sourcemaps.init())
            .pipe(plugins.sass())
            .pipe(plugins.postcss([
                  postcssFlexbugsFixes, 
                  autoprefixer({ browsers: config.plugins.autoprefixer.browsers })
            ]))
            .pipe(plugins.sourcemaps.write())
            .pipe(gulp.dest('src/css'))
            .pipe(browserSync.stream());
});

// include header and footer into pages
gulp.task('markup', function () {
    return gulp
        .src('src/markup/*.html')
        .pipe(plugins.injectPartials({
            removeTags: true,
            end: '<!-- endpartial -->'
        }))
        .pipe(plugins.inject(gulp.src(mainBowerFiles().concat(['src/js/**/*.js', 'src/css/**/*.css']), {read: false }), { 
            removeTags: true,
            addRootSlash: false,
            ignorePath: 'src/'
        }))
        .pipe(gulp.dest('src'));
});

// initialise browserSync to serve from the src dir
gulp.task('browserSync', function () {
   browserSync.init({
      server: {
         baseDir: 'src'
      }
   });
});

// tell browserSync to refresh the browser
gulp.task('refresh', function () {
   browserSync.reload();
});

// files being watched for changes made
gulp.task('watch', function () {
   gulp.watch('src/sass/**/*.scss', ['sass']);
   gulp.watch('src/markup/**/*.html', ['markup', 'refresh']);
   gulp.watch('src/js/**/*.js', ['refresh']);
});

// copy font awesome from vendor folder to src/fonts
gulp.task('fonts:src', function() {
    return gulp
        .src('src/vendor/font-awesome/fonts/**.*')
        .pipe(gulp.dest('src/fonts'));
});


// ** DEPLOYMENT TASKS

gulp.task('clean:dist', function () {
   return del('dist');
});

// combines and minifies css and js into single file for each
gulp.task('useref', function () {
   return gulp
      .src('src/*.html')
      .pipe(plugins.useref())
      .pipe(plugins.if('*.js', plugins.uglify()))
      .pipe(plugins.if('*.css', plugins.cssnano()))
      .pipe(gulp.dest('dist'));
});

// copy and optimise images
gulp.task('images', function () {
   return gulp
      .src('src/images/**/*.+(png|jpg|gif|svg)')
      .pipe(plugins.imagemin())
      .pipe(gulp.dest('dist/images'));
});

// copy fonts
gulp.task('fonts:dist', function () {
   return gulp
      .src('src/fonts/**/*')
      .pipe(gulp.dest('dist/fonts'));
});

// copy favicon.ico files to dist
gulp.task('favicons', function () {
   return gulp
      .src(['src/*.*','!src/*.html'])
      .pipe(gulp.dest('dist'));
});

// GitHub Pages
gulp.task('ghpages', function() {
 return gulp.src('dist/**/*')
   .pipe(plugins.ghPages({
       remoteUrl: 'https://github.com/rimpey/rimpey-profile.git'
   }));
}); 


// ** RUN TASKS

// array of tasks being performed when gulp task run from cmdline
gulp.task('default', function () {
    runSequence('sass', 'markup', ['fonts:src', 'browserSync', 'watch']);
});

// deployment tasks run in specified order, one at a time
// tasks contained in square brackets can run at the same time
gulp.task('dist', function () {
   runSequence('clean:dist', 'sass', 'markup', ['useref', 'images', 'fonts:dist', 'favicons']);
});