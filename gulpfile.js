const { src, dest } = require('gulp');

function copyAssets() {
  return src('nodes/**/*.svg')
    .pipe(dest('dist/'));
}

exports.build = copyAssets;