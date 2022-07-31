const { src, dest, watch, series } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const babel = require("gulp-babel");
const terser = require("gulp-terser");
const browserSync = require("browser-sync").create();

/* dart sass for @use in sass */
sass.compiler = require("dart-sass");

/* sass task */
function scssTask() {
  return src("app/scss/index.scss", { sourcemaps: true })
    .pipe(sass())
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(dest("dist", { sourcemaps: "." }));
}

/* js task */
function jsTask() {
  return src("app/js/index.js", { sourcemaps: true })
    .pipe(babel({ presets: ["@babel/preset-env"] }))
    .pipe(terser())
    .pipe(dest("dist", { sourcemaps: "." }));
}

/* browsersync task */
function brwsrSync(cb) {
  browserSync.init({
    server: {
      baseDir: ".",
    },
    notify: {
      styles: {
        top: "auto",
        bottom: "0",
      },
    },
  });
  cb();
}

/* reload */
function brwsrSyncRld(cb) {
  browserSync.reload();
  cb();
}

/* watch task */
function watchTask() {
  watch("*.html", brwsrSyncRld);
  watch(
    ["app/scss/**/*.scss", "app/**/*.js"],
    series(scssTask, jsTask, brwsrSyncRld)
  );
}

/* default task */
exports.default = series(scssTask, jsTask);
