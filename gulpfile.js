// Load plugins
const { src, dest, watch, parallel, series } = require("gulp");
const browsersync = require("browser-sync").create();
const fileinclude = require("gulp-file-include");
const useref = require("gulp-useref");
const cached = require("gulp-cached");
const gulpIf = require("gulp-if");
const del = require("del");
const npmDist = require("gulp-npm-dist");
const postcss = require("gulp-postcss");
const cssnano = require("cssnano");
const autoprefixer = require("autoprefixer");
const replace = require("gulp-replace");
const gulpTerser = require("gulp-terser");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const tailwindcss = require("tailwindcss");
const TAILWIND_CONFIG = "./tailwind.config.js";
const imagemin = require("gulp-imagemin");
const jpegrecompress = require("imagemin-jpeg-recompress");
const pngquant = require("imagemin-pngquant");

// Paths to project folders

const paths = {
   base: {
      base: "./",
      node: "./node_modules",
   },
   src: {
      basesrc: "./src",
      basesrcfiles: "./src/**/*",
      css: "./src/assets/css",
      tailwind: "./src/assets/tailwind/**/*.css",
      js: "./src/assets/js/**/*.js",
      vendorJs: "./src/assets/js/vendors/*.js",
      html: "./src/**/*.html",
      images: "./src/assets/images/**/*",
      fonts: "./src/assets/fonts/**/*",
      assets: "./src/assets/**/*",
      partials: ".src/partials/**/*",
   },
   temp: {
      basetemp: "./.temp",
   },
   dist: {
      basedist: "./dist",
      js: "./dist/assets/js",
      vendorJs: "./dist/assets/js/vendors",
      images: "./dist/assets/images",
      css: "./dist/assets/css",
      fonts: "./dist/assets/fonts",
      libs: "./dist/assets/libs",
   },
};

// Tailwind css  to CSS
function css(callback) {
   return src(paths.src.tailwind)
      .pipe(postcss([tailwindcss(TAILWIND_CONFIG), require("autoprefixer")]))
      .pipe(concat({ path: "theme.css" }))
      .pipe(dest(paths.src.css))
      .pipe(browsersync.stream());
   callback();
}

// vendor js
function vendorJs(callback) {
   return src(paths.src.vendorJs).pipe(uglify()).pipe(dest(paths.dist.vendorJs));
   callback();
}

// Image
function images(callback) {
   return src(paths.src.images)
      .pipe(
         imagemin([
            imagemin.gifsicle({ interlaced: true }),
            jpegrecompress({
               progressive: true,
               max: 90,
               min: 80,
            }),
            pngquant(),
            imagemin.svgo({ plugins: [{ removeViewBox: false }] }),
         ]),
      )
      .pipe(dest(paths.dist.images));
   callback();
}

// Font task
function fonts(callback) {
   return src(paths.src.fonts).pipe(dest(paths.dist.fonts));
   callback();
}

// HTML
function html(callback) {
   return src([paths.src.html, "!./src/partials/**/*"])
      .pipe(
         fileinclude({
            prefix: "@@",
            basepath: "@file",
         }),
      )
      .pipe(replace(/src="(.{0,10})node_modules/g, 'src="$1assets/libs'))
      .pipe(replace(/href="(.{0,10})node_modules/g, 'href="$1assets/libs'))
      .pipe(useref())
      .pipe(cached())
      .pipe(gulpIf("*.css", postcss([autoprefixer(), cssnano()]))) // PostCSS plugins with cssnano
      .pipe(gulpIf("*.js", gulpTerser()))
      .pipe(dest(paths.dist.basedist))
      .pipe(browsersync.stream());
   callback();
}

// File include task for temp
function fileincludeTask(callback) {
   return src([paths.src.html, "!./src/partials/**/*"])
      .pipe(
         fileinclude({
            prefix: "@@",
            basepath: "@file",
         }),
      )
      .pipe(cached())
      .pipe(dest(paths.temp.basetemp));
   callback();
}

// Copy libs file from nodemodules to dist
function copyLibs(callback) {
   return src(npmDist(), { base: paths.base.node }).pipe(dest(paths.dist.libs));
   callback();
}

// Clean .temp folder
function cleanTemp(callback) {
   del.sync(paths.temp.basetemp);
   callback();
}

// Clean Dist folder
function cleanDist(callback) {
   del.sync(paths.dist.basedist);
   callback();
}

// Browser Sync Serve
function browsersyncServe(callback) {
   browsersync.init({
      port: 3200,
      server: {
         baseDir: [paths.temp.basetemp, paths.src.basesrc, paths.base.base],
      },
   });
   callback();
}

// SyncReload
function syncReload(callback) {
   browsersync.reload();
   callback();
}

// Watch Task
function watchTask() {
   watch(paths.src.html, series(fileincludeTask, syncReload));
   watch([paths.src.images, paths.src.fonts, paths.src.vendorJs], series(images, fonts, vendorJs));
   watch([paths.src.tailwind, paths.src.html, TAILWIND_CONFIG], series(css, syncReload));
}

// Default Task Preview
exports.default = series(fileincludeTask, browsersyncServe, watchTask);

// Build Task for Dist
exports.build = series(parallel(cleanDist), html, images, fonts, vendorJs, copyLibs, cleanTemp);

// export tasks

exports.css = css;
exports.vendorJs = vendorJs;
exports.images = images;
exports.fonts = fonts;
exports.html = html;
exports.fileincludeTask = fileincludeTask;
exports.copyLibs = copyLibs;
exports.cleanTemp = cleanTemp;
exports.cleanDist = cleanDist;
