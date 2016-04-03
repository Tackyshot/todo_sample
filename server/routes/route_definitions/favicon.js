"use strict";
module.exports  = {
  method: ['GET'],
  path: "/favicon.ico",
  handler: (req, res)=>{
    const fs = require('fs');

    let file = fs.readFileSync(__dirname + '/../../assets/client/img/favicon.ico');

    res(file).type("application/javascript");

  }//handler
}//route optionss