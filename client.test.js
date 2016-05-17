"use strict";
let fs    = require('fs');

class ClientTest {
  constructor(){

    this.findTestDirectories();
  }

  findTestDirectories(){
    //parses through FS and builds array of paths
    let testDirs = [];

    let dirSearch = (path)=>{
      fs.readdir(path, (err, files)=>{
        //console.log("FILES", files);
        files.forEach((file, index)=>{
          //console.log("FILE,", file);
          let stats = fs.lstatSync(`${path}/${file}`);

          if(stats.isDirectory() && file === '_test'){
            //console.log("push");
            testDirs.push(`${path}/${file}`);
            console.log('testDirs', testDirs);
          }
          else if(stats.isDirectory() && file !== '_test'){
            //console.log("recusion")
            dirSearch(`${path}/${file}`);
          }
        });//forEach
      });//readdir
    }//dirSearch

    dirSearch('./client/components');
    console.log("TEST DIRS:", testDirs);
    return testDirs;

  }
}//ClientTest

module.exports = new ClientTest();