"use strict";
let fs      = require('fs');
var webpack = require('webpack');

class ClientTest {
  webpackConfig(){
    return {
      entry: this.constructor.findTests(),
      output: {
        filename: "./test/client.test.js"
      },
      /*module:{
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
       },*/
      plugins: [
        new webpack.DefinePlugin({
          "process.env": {
            NODE_ENV: JSON.stringify("development")
          },
          "React": 'react',
          "react": 'react',
          'ReactDOM': 'react-dom',
          "_": 'lodash'
        })
      ]
    };
  }

  static findTests(){
    //parses through FS and builds array of paths to each _test dir
    let testDirs = [];

    let dirSearch = (path, array)=>{
      let files = fs.readdirSync(path);
      files.forEach((file, index)=>{
        let stats = fs.lstatSync(`${path}/${file}`);

        if(stats.isDirectory() && file === '_test'){
          array.push(`${path}/${file}/index.js`);
        }
        else if(stats.isDirectory() && file !== '_test'){
          dirSearch(`${path}/${file}`, array);
        }
      });//forEach
    };//dirSearch

    dirSearch('./client/components', testDirs);
    return testDirs;
  }//findTestDirectories

}//ClientTest

module.exports = new ClientTest().webpackConfig();

/*let webpackConfig = {
  entry: "./client/app.jsx",
  output: {
    filename: "./server/assets/client/js/bundle.js"
  },
  /!*module:{
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
  },*!/
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("development")
      },
      "React": 'react',
      "react": 'react',
      'ReactDOM': 'react-dom',
      "_": 'lodash'
    })
  ]
};*/

//module.exports = webpackConfig;