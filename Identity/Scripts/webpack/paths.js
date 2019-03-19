const path = require('path');

module.exports = {
  root: path.resolve(__dirname, '../'),
  outputPath: path.resolve(__dirname, '../', 'build'),
  entryPath: {
    // default: [path.resolve(__dirname, '../', 'src/index.jsx'), 'webpack/hot/only-dev-server'],
    app: [path.resolve(__dirname, '../', 'src/components/index.tsx'), 'webpack/hot/only-dev-server'],
  },
  templatePath: path.resolve(__dirname, '../', 'src/template.html'),
  imagesFolder: 'images',
  fontsFolder: 'fonts',
  cssFolder: 'css',
  jsFolder: 'js',
};
