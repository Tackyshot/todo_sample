"use strict";
let fs    = require('fs');

class ClientTest {
  constructor(){
    const testDirs = this.findTestDirectories();
  }

  findTestDirectories(){
    //parses through FS and builds array of paths to each _test dir
    let testDirs = [];

    let dirSearch = (path, array)=>{
      let files = fs.readdirSync(path);
      files.forEach((file, index)=>{
        let stats = fs.lstatSync(`${path}/${file}`);

        if(stats.isDirectory() && file === '_test'){
          array.push(`${path}/${file}/`)
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