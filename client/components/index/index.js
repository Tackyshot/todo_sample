"use strict";
import React            from 'react';

import ContentWrapper   from '../_common/contentWrapper/';
import TodoItem         from './todoItem.jsx';
import TodoActions      from '../../actions/todo-actions.jsx';
import TodoStore        from '../../stores/todo-store.jsx';

import FlatButton       from 'material-ui/lib/flat-button.js';
import AddIcon          from 'material-ui/lib/svg-icons/content/add.js';

export default class Index extends React.Component{
  constructor(props, context){
    super(props, context);

    this.state = {
      todos: []
    };

    //rebindings
    this.updateTodoState  = this.updateTodoState.bind(this);
    this.handleNewTodo    = this.handleNewTodo.bind(this);
  }

  componentWillMount(){
    TodoActions.get((err)=>{
      if(!err){
        this.updateTodoState();
      }
    });
  }

  render(){
    console.log("render function");
    return (
      <ContentWrapper wrapperClass="todos-wrapper" mainClass="todos-body" title="Kickass Todo List">
          <div>
            <FlatButton
              label="New Todo"
              icon={<AddIcon />}
              style={{color: '#D98310', marginBottom: '15px'}}
              onClick={this.handleNewTodo}
            />
          </div>
          {this.state.todos.map((todo, i) => {
            let key = "todoItem-" + todo["_id"];
            return <TodoItem key={key} todo={todo} onEdit={this.updateTodoState} onDelete={this.handleDelete} onCheck={this.updateTodoState} />
          })}
      </ContentWrapper>
    )
  }//render

  //todo: update todos state from store with single method.
  updateTodoState(){
    this.setState({
      todos: TodoStore.getState().todos
    });
  }

  handleDelete(todo){
    TodoActions.del({
      params: {
        todoId: todo['_id']
      },
      data: todo
    }, (err)=>{
      if(!err){
        this.updateTodoState();
      }
    });
  }

  handleNewTodo(e){
    TodoActions.post({
      data:{
        _id: -1,
        title: '',
        description: '',
        done: false
      }
    }, (err)=>{
      if(!err){
        this.updateTodoState();
      }
    })
  }

}