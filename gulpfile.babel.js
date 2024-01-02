import gulp from "gulp";
import htmlmin from "gulp-htmlmin";
import del from "del";
import ws from "gulp-webserver";
import image from "gulp-image";
import miniCSS from "gulp-csso";
import bro from "gulp-bro";
import babelify from "babelify";
import ghPages from "gulp-gh-pages";
import { stream as critical } from "critical";

const routes = {
  html: {
    watch: "src/*.html",
    src: "src/*.html",
    dest: "build",
  },
  xml: {
    watch: "src/*.xml",
    src: "src/*.xml",
    dest: "build",
  },
  txt: {
    watch: "src/*.txt",
    src: "src/*.txt",
    dest: "build",
  },
  favicon: {
    src: "src/favicon.ico/*",
    dest: "build/favicon.ico",
  },
  fonts: {
    src: "src/fonts/*",
    dest: "build/fonts",
  },
  img: {
    src: "src/images/*",
    dest: "build/images",
  },
  css: {
    watch: "src/css/*.css",
    src: "src/css/*.css",
    dest: "build/css",
  },
  js: {
    watch: "src/js/*.js",
    src: "src/js/*.js",
    dest: "build/js",
  },
};

const xml = () => gulp.src(routes.xml.src).pipe(gulp.dest(routes.xml.dest));

const txt = () => gulp.src(routes.txt.src).pipe(gulp.dest(routes.txt.dest));

const favicon = () =>
  gulp.src(routes.favicon.src).pipe(gulp.dest(routes.favicon.dest));

const fonts = () =>
  gulp.src(routes.fonts.src).pipe(gulp.dest(routes.fonts.dest));

const html = () =>
  gulp
    .src(routes.html.src)
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest(routes.html.dest));

const img = () =>
  gulp.src(routes.img.src).pipe(image()).pipe(gulp.dest(routes.img.dest));

const styles = () =>
  gulp.src(routes.css.src).pipe(miniCSS()).pipe(gulp.dest(routes.css.dest));

const criticalStyle = () =>
  gulp
    .src("build/index.html")
    .pipe(
      critical({
        base: "build/",
        inline: true,
        css: [
          "build/css/normalize.css",
          "build/css/reset.css",
          "build/css/common.css",
          "build/css/main.css",
          "build/css/responsive.css",
        ],
        penthouse: { timeout: 60000 },
      })
    )
    .pipe(gulp.dest("build"));

const js = () =>
  gulp
    .src(routes.js.src)
    .pipe(
      bro({
        transform: [
          babelify.configure({ presets: ["@babel/preset-env"] }),
          ["uglifyify", { global: true }],
        ],
      })
    )
    .pipe(gulp.dest(routes.js.dest));

const clean = () => del(["build/", ".publish"]);

const webserver = () =>
  gulp.src("build").pipe(ws({ livereload: true, open: true }));

const watch = () => {
  gulp.watch(routes.xml.watch, xml);
  gulp.watch(routes.txt.watch, txt);
  gulp.watch(routes.html.watch, html);
  gulp.watch(routes.img.src, img);
  gulp.watch(routes.css.watch, styles);
  gulp.watch(routes.js.watch, js);
};

const gh = () => gulp.src("build/**/*").pipe(ghPages({ branch: "main" }));

const prepare = gulp.series([clean, img]);

const assets = gulp.series([
  xml,
  txt,
  favicon,
  fonts,
  html,
  styles,
  js,
  criticalStyle,
]);

// live는 웹 서버를 실행하고, 파일의 변동 사항을 지켜본다
const live = gulp.parallel([webserver, watch]);

export const build = gulp.series([prepare, assets]);
export const dev = gulp.series([build, live]);
export const deploy = gulp.series([build, gh, clean]);
