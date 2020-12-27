const gulp = require("gulp");

const $gp = require("gulp-load-plugins")();
let cleanCSS = require('gulp-clean-css')

const browserSync = require("browser-sync").create();
const reload = browserSync.reload;
const $webpack = require("webpack-stream");
const webpack = require("webpack");
const del = require("del");
const srcdir = 'src'
const distdir = 'build'

gulp.task("styles", () => {
    return gulp
        .src(`${srcdir}/assets/css/style.scss`)
        .pipe($gp.sourcemaps.init())
        .pipe($gp.plumber())
        .pipe($gp.sassGlob())
        .pipe($gp.sass({ style: 'compressed' }).on("error", $gp.sass.logError))
        .pipe($gp.groupCssMediaQueries())
        .pipe(
            $gp.pxtorem({
                rootValue: 16,
                propList: ["*", "!*border*"],
                selectorBlackList: [/^html$/]
            })
        )
        .pipe(cleanCSS())
        .pipe($gp.rename("main.min.css"))
        .pipe($gp.if(1 === 0, $gp.sourcemaps.write()))
        .pipe(gulp.dest(`${distdir}/assets/css/`))
        .pipe(reload({ stream: true }));
});

gulp.task("clean", () => {
    return del(distdir);
});

gulp.task("scripts", () => {
    return gulp
        .src(`${srcdir}/assets/js/*.js`)
        .pipe($gp.plumber())
        .pipe(
            $webpack({
                    ...require("./webpack.config"),
                    mode: "development"
                },
                webpack
            )
        )
        .pipe(gulp.dest(`${distdir}/assets/js/`))
        .pipe(reload({ stream: true }));
});

gulp.task("server", () => {
    browserSync.init({
        server: {
            baseDir: `${distdir}`
        },
        open: false
    });
});

gulp.task("images", () => {
    return gulp
        .src([
            `${srcdir}/assets/img/**/*.*`
        ])
        .pipe(gulp.dest(`${distdir}/assets/img/`));
});

gulp.task("video", () => {
    return gulp
        .src([
            `${srcdir}/assets/video/**/*.*`
        ])
        .pipe(gulp.dest(`${distdir}/assets/video/`));
});

gulp.task("html", () => {
    return gulp
        .src([
            `${srcdir}/*.html`
        ])
        .pipe(gulp.dest(`${distdir}/`));
});

gulp.task("touch", () => {
    return gulp
        .src([
            `${srcdir}/assets/js/jquery.touchSwipe.min.js`
        ])
        .pipe(gulp.dest(`${distdir}/assets/js/`));
});

gulp.task("watch", () => {
    gulp.watch(`${srcdir}/assets/css/**/*.scss`, gulp.series("styles"));
    gulp.watch(`${srcdir}/assets/js/**/*.js`, gulp.series("scripts"));
    gulp.watch(`${srcdir}/assets/img/**/*.*`, gulp.series("images"));
    gulp.watch(`${srcdir}/*.html`, gulp.series("html"));
});

gulp.task(
    "default",
    gulp.series(
        "clean",
        gulp.parallel("styles", "images", "scripts", "video", "html", "touch"),
        gulp.parallel("watch", "server")
    )
);

gulp.task(
    "build",
    gulp.series(
        "clean",
        gulp.parallel("styles", "images", "scripts", "video", "html", "touch")
    )
);