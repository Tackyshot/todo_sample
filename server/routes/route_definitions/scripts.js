"use strict";
module.exports  = {
  method: ['GET'],
  path: "/js/{script}",
  handler: (req, res)=>{
    const fs = require('fs');

    let file = fs.readFileSync(__dirname + '/../../assets/client/js/' + req.params.script);

    res(file).type("application/javascript");

  }//handler
}
