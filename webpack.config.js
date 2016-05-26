"use strict";
const webpack = require('webpack');
const path    = require('path');

let webpackConfig = {
  entry: "./client/app.jsx",
  output: {
    path:path.resolve(__dirname, 'server/assets/client/js/'),
    filename: "bundle.js"
  },
  module:{
    loaders: [
      {
        test: /(\.jsx$|\.js$)/,
        exclude: /(node_modules|bower_components)/,
        loaders: ['babel']
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("development")
      }
    })
  ]
};

module.exports = webpackConfig;