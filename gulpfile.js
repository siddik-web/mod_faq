const gulp = require("gulp");
const zip = require("gulp-zip");
const clean = require("gulp-clean");


const VERSION = "1.0.2";
const ZIP_NAME = `mod_faq_v${VERSION}.zip`;

gulp.task("copy_module_faq", function () {
  return gulp.src("./modules/mod_faq/**/*.*").pipe(gulp.dest("build/mod_faq"));
});


gulp.task("copy_lang_mod", function () {
  return gulp.src(["./language/en-GB/mod_faq.ini", "./language/en-GB/mod_faq.sys.ini"])
  .pipe(gulp.dest("build/mod_faq/language/en-GB/"));
});


gulp.task(
  "copy",
  gulp.series(
    "copy_module_faq",
    "copy_lang_mod",
  ),
);

gulp.task("zip_it", function () {
  return gulp.src("./build/**/*.*").pipe(zip(ZIP_NAME)).pipe(gulp.dest("./build"));
});

gulp.task("clean_build", function () {
  return gulp.src("./build", { read: false, allowEmpty: true }).pipe(clean());
});

gulp.task(
  "default",
  gulp.series("clean_build", "copy","zip_it", function () {
    return gulp.src("./build/**/*.*").pipe(zip(ZIP_NAME)).pipe(gulp.dest("./build"));
  }),
);