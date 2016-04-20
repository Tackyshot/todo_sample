"use strict";
import React            from 'react';

import ContentWrapper   from '../_common/contentWrapper/';
import TodoItem         from './todoItem.jsx';
import TodoActions      from '../../actions/todo-actions.jsx';
import TodoStore        from '../../stores/todo-store.jsx';

export default class Index extends React.Component{
  constructor(props, context){
    super(props, context);

    this.state = {
      todos: []
    };

    this.updateTodoState = this.updateTodoState.bind(this);
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

}