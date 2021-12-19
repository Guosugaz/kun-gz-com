const { series, src, dest } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const autoprefixer = require("gulp-autoprefixer");
const cssmin = require("gulp-cssmin");

function compile() {
  return src("./src/theme-default/*.scss")
    .pipe(sass.sync())
    .pipe(
      autoprefixer({
        cascade: false
      })
    )
    .pipe(cssmin())
    .pipe(dest("./lib/theme-default"));
}

exports.build = series(compile);
