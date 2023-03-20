// Main module
import gulp from "gulp";

//  Import Path
import { path } from "./gulp/config/path.js";

//  Import common plugins
import { plugins } from "./gulp/config/plugins.js";

// Passing the values to a global variable
global.app = {
  isBuild: process.argv.includes("--build"), //production mode
  isDev: !process.argv.includes("--build"), //developer mode
  path: path,
  gulp: gulp,
  plugins: plugins,
};

//  Import Tasks
import { copy } from "./gulp/tasks/copy.js";
import { reset } from "./gulp/tasks/reset.js";
import { html } from "./gulp/tasks/html.js";
import { php } from "./gulp/tasks/php.js";
import { server } from "./gulp/tasks/server.js";
import { scss } from "./gulp/tasks/scss.js";
import { js } from "./gulp/tasks/js.js";
import { images } from "./gulp/tasks/images.js";
import { otfToTtf, ttfToWoff, fontsStyle } from "./gulp/tasks/fonts.js";
import { svgSprites } from "./gulp/tasks/svgSprites.js";
import { zip } from "./gulp/tasks/zip.js";


// File change observer
function watcher() {
  gulp.watch(path.watch.files, copy);
  gulp.watch(path.watch.html, html);
  gulp.watch(path.watch.php, php);
  gulp.watch(path.watch.scss, scss);
  gulp.watch(path.watch.js, js);
  gulp.watch(path.watch.images, images);
}

export { svgSprites };

// Последовательность обработки шрифтов
const fonts = gulp.series(otfToTtf, ttfToWoff, fontsStyle);
// Основные задачи
const mainTasks = gulp.series(
  fonts,
  gulp.parallel(copy, html, php, scss, js, images)
);

/**
 * Building task execution scenarios (reset first, then copy, then watch)
 */
// For dev
const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));
// For prod
const build = gulp.series(reset, mainTasks);
// Archiving the project
const deployZip = gulp.series(reset, mainTasks, zip);

// Export scenaries
export { dev };
export { build };
export { deployZip };

// Выполнение сценария по умолчанию
gulp.task("default", dev);
