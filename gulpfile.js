var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var nunjucksRender = require('gulp-nunjucks-render');
var pump = require('pump');

const PATHS = {
    output: 'dist',
    templates: 'src/templates',
    pages: 'src/pages'
};

gulp.task('styles', function () {
    var processors = [
        require('autoprefixer')({browsers: ['last 1 version']}),
        require('postcss-opacity'),
        require('pixrem')
    ];

    return gulp.src('src/scss/ea.scss')
        .pipe($.sass().on('error', $.sass.logError))
        .pipe($.postcss(processors))
        .pipe($.minifyCss())
        .pipe($.rename({suffix: '.min'}))
        .pipe(reload({stream: true}))
        .pipe($.size({showFiles: true}))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('templates', function() {
    return gulp.src(PATHS.pages + '/**/*.+(html|js|css)')
        .pipe(nunjucksRender({
            path: [PATHS.templates],
            watch: true
        }))
        .pipe(gulp.dest(PATHS.output));
});

gulp.task('scripts', function (cb) {
    pump([
            gulp.src('src/js/*.js'),
            $.uglify(),
            $.rename({suffix: '.min'}),
            gulp.dest('dist/js')
        ],
        cb
    );
});

gulp.task('copy', function() {
    gulp.src(['src/fonts/**/*']).pipe(gulp.dest('dist/fonts'));
    gulp.src(['src/images/**/*']).pipe(gulp.dest('dist/images'));
});

gulp.task('dev', function () {
    browserSync({
        notify: false,
        port: 9000,
        server: {
            baseDir: "./dist"
        }
    });

    // trigger Nunjucks render when pages or templates changes
    gulp.watch([PATHS.pages + '/**/*.+(html|js|css)', PATHS.templates + '/**/*.+(html|js|css)'], ['templates']);

    gulp.watch([
        'dist/**/*.html',
        'dist/**/*.js',
        'dist/images/**/*'
    ]).on('change', reload);

    gulp.watch(['src/scss/**/*.{css,scss}'], ['styles']);
    gulp.watch(['src/js/*.js'], ['scripts']);
    gulp.watch(['src/images/**/*', 'src/fonts/**/*'], ['copy']);
});

//default task to be run with gulp
gulp.task('default', ['styles' ,'scripts', 'copy', 'templates']);


