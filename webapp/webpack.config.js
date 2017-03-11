const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const distDevPath = 'dist-dev';

module.exports = env => {
  const { dev } = env || {};

  let webpackConfig = {
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, dev ? distDevPath : 'dist')
    },
    module: {
      rules: [
        { test: /\.pug$/, loader: 'pug-loader' }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.pug',
        filetype: 'pug'
      })
    ]
  };

  if (dev) {
    webpackConfig.plugins.push(new BrowserSyncPlugin({
      host: 'localhost',
      port: 3000,
      server: { baseDir: [distDevPath] }
    }));
  }

  return webpackConfig;
};
