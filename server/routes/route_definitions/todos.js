"use strict";
module.exports  = {
  method: ['GET', 'POST', 'PUT', 'DELETE'],
  path: "/api/todos/{todoId?}",
  handler: function (req, res){
    var todoList  = require(__dirname + '/../../assets/data/todos.js');
    var todos     = todoList.todos;
    let todoItem  = req.payload ? req.payload : null;
    let todoId    = req.params ? Number(req.params.todoId) : null;

    switch(req.method){
      case "get":
        res(todoList)
          .type("application/json");
        break;

      case "post":
        let todo = {
          _id: (todos[todos.length-1]._id + 1),
          title: '',
          description: '',
          done: false
        };

        todos.push(todo);

        res(todo)
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