const webpack = require('webpack');
const convert = require('koa-connect');
const history = require('connect-history-api-fallback');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const commonPaths = require('./paths');

module.exports = (env) => {
    const envKeys = Object.keys(env).reduce((prev, next) => {
        prev[`process.env.${next}`] = JSON.stringify(env[next]);
        return prev;
    }, {});

    return {
      entry: commonPaths.entryPath,
      module: {
          rules: [
              // {
              //   enforce: 'pre',
              //   test: /\.(js|jsx)$/,
              //   loader: 'eslint-loader',
              //   exclude: /(node_modules)/,
              //   options: {
              //     emitWarning: process.env.NODE_ENV !== 'production',
              //   },
              // },
              {
                  test: /\.(tsx|ts)?$/,
                  loader: 'awesome-typescript-loader'
              },
              {
                  test: /\.(js|jsx)$/,
                  loader: 'babel-loader',
                  exclude: /(node_modules)/,
              },
              {
                  test: /\.(png|jpg|gif|svg)$/,
                  use: [
                      {
                          loader: 'file-loader',
                          options: {
                              outputPath: commonPaths.imagesFolder,
                          },
                      },
                  ],
              },
              {
                  test: /\.(woff2|ttf|woff|eot)$/,
                  use: [
                      {
                          loader: 'file-loader',
                          options: {
                              outputPath: commonPaths.fontsFolder,
                          },
                      },
                  ],
              },
          ],
      },
      serve: {
          add: app => {
              app.use(convert(history()));
          },
          content: commonPaths.entryPath,
          dev: {
              publicPath: commonPaths.outputPath,
          },
          open: true,
      },
      resolve: {
          modules: ['src', 'node_modules'],
          extensions: ['*', '.js', '.jsx', '.css', '.scss', '.ts', '.tsx'],
      },
      plugins: [
          new webpack.ProgressPlugin(),
          new HtmlWebpackPlugin({
              template: commonPaths.templatePath,
          }),
          new webpack.DefinePlugin(envKeys),
          new ScriptExtHtmlWebpackPlugin({
              defaultAttribute: 'async',
          }),
      ],
  }
};
