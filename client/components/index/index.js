"use strict";
import React            from 'react';
import _                from 'lodash';

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
    this.handleDelete     = this.handleDelete.bind(this);
  }

  componentWillMount(){
    TodoActions.get((err)=>{
      if(!err){
        this.updateTodoState();
      }
    });
  }

  render(){
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
            return <TodoItem key={key} todo={todo} eventCallback={this.updateTodoState}/>
          })}
      </ContentWrapper>
    )
  }//render

  updateTodoState(){
    let storedTodos = _.clone(TodoStore.getState().todos, true);

    this.setState({
      todos: storedTodos.reverse()
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
      data:{}
    }, (err)=>{
      if(!err){
        this.updateTodoState();
      }
    })
  }

}