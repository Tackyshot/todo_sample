"use strict";
var webpack = require('webpack');

let webpackConfig = {
  entry: "./client/app.jsx",
  output: {
    filename: "./server/assets/client/js/bundle.js"
  },
  module:{
    loaders: [
      {
        test: /\.jsx$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel'
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("development")
      },
      "React": 'react',
      'ReactDOM': 'react-dom',
      "_": 'lodash'
    })
  ]
};

module.exports = webpackConfig;