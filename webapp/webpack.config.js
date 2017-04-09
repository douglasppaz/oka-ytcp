const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const distDevPath = 'dist-dev';

module.exports = env => {
  const { dev } = env || {};

  let webpackConfig = {
    entry: './src/index.jsx',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, dev ? distDevPath : 'dist')
    },
    resolve: { extensions: ['.js', '.jsx'] },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          loader: 'babel-loader',
          query: { presets: ['env', 'react'] }
        },
        { test: /\.pug$/, loader: 'pug-loader' },
        {
          test: /\.scss$/,
          use: [
            { loader: 'style-loader' },
            { loader: 'css-loader' },
            { loader: 'sass-loader' }
          ]
        },
        { test: /\.(woff2)$/, loader: 'file-loader' }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.pug',
        filetype: 'pug'
      })
    ],
    node: {
      fs: 'empty',
      net: 'empty',
      tls: 'empty'
    }
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
