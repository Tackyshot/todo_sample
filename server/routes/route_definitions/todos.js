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
        todoItem._id = todos.length + 1;
        todos.push(todoItem);

        res(todoItem)
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

}//exports