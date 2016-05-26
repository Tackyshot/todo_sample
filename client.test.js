"use strict";
let fs  = require('fs');
let cp  = require('child_process');


class ClientTest {
  constructor(){
    return this.builderFn();
  }

  builderFn(){
    let testDirs      = this.findTestDirectories();

    this.checkTestReceiverDir((hasTestDir)=>{
      if(hasTestDir){
        testDirs.forEach((file, index)=>{
          let split     = file.split('/');
          let filename  = split[split.length -1];

          //Copy test files to the test directory.
          fs.createReadStream(file).pipe(fs.createWriteStream(`./.test/client/${index}-${filename}`));
        });
      }
    })

  }

  findTestDirectories(){
    //parses through FS and builds array of paths to each _test dir
    let testDirs = [];
    let dirSearch = (path, array)=>{
      let dirs = fs.readdirSync(path);
      dirs.forEach((subdir, index)=>{
        let dirPath = `${path}/${subdir}`;
        let stats   = fs.lstatSync(dirPath);

        if(stats.isDirectory() && subdir === '_test'){
          let testFiles = fs.readdirSync(dirPath);

          testFiles.forEach((file)=>{
            let filePath  = `${path}/${subdir}/${file}`;

            array.push(filePath);
          });
        }
        else if(stats.isDirectory() && subdir !== '_test'){
          dirSearch(dirPath, array);
        }
      });//forEach

    };//dirSearch

    dirSearch('./client/components', testDirs);
    return testDirs;
  }

  checkTestReceiverDir(cb){
    let currentDir    = fs.readdirSync(__dirname);
    let testDirExist  = false;

    currentDir.forEach((dir, index)=>{
      let stats = fs.lstatSync(dir);

      if(stats.isDirectory() && dir == '.test'){
        let testDirs        = fs.readdirSync(`${__dirname}/.test`);
        let clientDirExist  = false;

        testDirs.forEach((subDir, i)=>{
          let subStats = fs.lstatSync(subDir);

          if(subStats.isDirectory() && subDir === 'client'){
            clientDirExist = true;
            return cb(testDirExist = true);
          }
          else if(i === (testDirs.length - 1) && !clientDirExist){
            fs.mkdirSync('./.test/client');
            return cb(testDirExist = true);
          }
        });

      }
      else if(index === (currentDir.length - 1) && !testDirExist){
        fs.mkdirSync('./.test');
        fs.mkdirSync('./.test/client');
        fs.mkdirSync('./.test/server');
        return cb(testDirExist = true);
      }
    });
  }//checkTestReceiverDir
}//ClientTest

new ClientTest();