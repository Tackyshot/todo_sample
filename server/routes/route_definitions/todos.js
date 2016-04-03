"use strict";
module.exports  = {
  method: ['GET', 'POST', 'PUT', 'DELETE'],
  path: "/api/todos/{todoId?}",
  handler: function (req, res){
    var todoList  = require(__dirname + '/../../assets/data/todos.js');
    var todos     = todoList.todos;
    let todoItem  = req.payload ? req.payload : null;
    let todoId    = req.params ? Number(req.params.todoId) : null;

    console.log("Payload:", req.payload);

    console.log("METHOD:", req.method);

    switch(req.method){
      case "get":
        res(todoList)
          .type("application/json");
        break;

      case "post":
        todos.push(todoItem);

        res(todoList)
          .type("application/json");
        break;

      case "put":
        todos.some((todo, i, arr)=>{
          console.log("todo ID:", typeof todoId, typeof todo["_id"], typeof todoItem["_id"]);
          if(todoId === todo["_id"] && todoId === todoItem["_id"]){
            console.log("pew pew!");
            todos[i] = todoItem;
            res(todoItem)
              .type("application/json");
            return;
          }
        });
      break;

      case "delete":

        todos.some((todo, i, arr)=>{
          if(todoId === todo["_id"]){
            todos.splice(i, 1);
            res(todoItem)
              .type("application/json");
            return;
          }
        });
      break;
    }

  }//handler

}/*= new class Index{
    constructor(){

        this.options = {
            method: ['GET', 'POST', 'PUT', 'DELETE'],
            path: "/api/names",
            handler: {names:{}}
        }

    }

    getHandler(){
        const fs = require('fs');

        var register = function(Server, options, next){
            var names = require(__dirname + '/../../assets/data/names.js');

            var handler = function(route, options){

                return function (req, res){

                    console.log("METHOD:", req.method);

                    switch(req.method){
                        case "get":
                            res(names)
                                .type("application/json");
                        break;

                        case "post":
                            let newName = req.payload.todo;
                            names.names.push(newName);

                            res(names)
                                .type("application/json");
                        break;
                    }

                }

            };

            Server.handler("names", handler);
            next();
        };

        register.attributes = {
            name: "handler-names",
            version: "1.0.0"
        };

        return register;

    } //handler

    getOptions(){

        return this.options;
    }

};*/