"use strict";
const fs = require('fs');

/*class Routes {
  constructor(){
    this.state = {
      server: null,
      options: null
    };

    this.initializeRoutes.attributes = {
      name: "router",
      version: "1.0.0"
    };


  }

  initializeRoutes(Server, options, next){
    this.state.server = Server;
    this.state.options = options;

    var files = fs.readdirSync(__dirname + '/route_definitions/');

    files.forEach(function (filename) {

      if (~filename.indexOf('.js')) {
        let route = require(__dirname + '/route_definitions/' + filename);
        console.log("Initialize Route:", route.path);
        Server.route(route);
      }

    });

    next();

  }

}//Routes class*/

let register = function (Server, options, next) {

  var files = fs.readdirSync(__dirname + '/route_definitions/');

  files.forEach(function (filename) {

    /*if (~filename.indexOf('.js')) {
      let route = require(__dirname + '/route_definitions/' + filename);

      Server.register(route.getHandler(), function (err) {
        if (err) console.log(err);
        console.log("Register route handler:" , filename);
      });

      Server.route(route.getOptions());

    }*/

    if (~filename.indexOf('.js')) {
      let route = require(__dirname + '/route_definitions/' + filename);
      console.log("Initialize Route:", route.path);
      Server.route(route);
    }

  });

  next();

};

register.attributes = {
  name: "router",
  version: "1.0.0"
};

module.exports = register; //new Routes();