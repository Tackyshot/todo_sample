"use strict";
let fs    = require('fs');

class ClientTest {
  constructor(){
    const testDirs = this.findTestDirectories();
    console.log('testDirs', testDirs);

    /*testDirs.forEach((dir, index)=>{
      return require(`${dir}index.js`)
    });*/
  }

  findTestDirectories(){
    //parses through FS and builds array of paths to each _test dir
    let testDirs = [];
    let firstFound = false; //TODO: remember to takeout first found when done testing
    let dirSearch = (path, array)=>{
      let files = fs.readdirSync(path);
      files.forEach((file, index)=>{
        let stats = fs.lstatSync(`${path}/${file}`);

        if(stats.isDirectory() && file === '_test' && !firstFound){ //TODO: remember to takeout first found when done testing
          firstFound = true; //TODO: remember to takeout first found when done testing
          array.push(`${path}/${file}/`);
        }
        else if(stats.isDirectory() && file !== '_test'){
          dirSearch(`${path}/${file}`, array);
        }
      });//forEach

    };//dirSearch

    dirSearch('./client/components', testDirs);
    return testDirs;
  }
}//ClientTest

module.exports = new ClientTest();