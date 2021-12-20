const { series, src, dest, watch, task } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const autoprefixer = require("gulp-autoprefixer");
const cssmin = require("gulp-cssmin");

const isProd = process.env.NODE_ENV === "production";

function compile() {
  let temp = src("./src/theme-default/*.scss")
    .pipe(sass.sync())
    .pipe(
      autoprefixer({
        cascade: false
      })
    );
  if (isProd) temp = temp.pipe(cssmin());
  return temp.pipe(dest("./lib/theme-default"));
}

task("dev", () => {
  watch("src/theme-default/**/*.scss", { ignoreInitial: false }, compile);
});

task("build", series(compile));
