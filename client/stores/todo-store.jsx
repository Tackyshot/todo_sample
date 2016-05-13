import Alt          from '../alt.jsx';
import TodoActions  from '../actions/todo-actions.jsx';
import _            from 'lodash';

class TodoStore {
  constructor(){
    this.bindListeners({
      set: TodoActions.get,
      post: TodoActions.post,
      put: TodoActions.put,
      del: TodoActions.del
    });

    this.state = {
      todos: []
    };
  }//constructor

  set(todos){
    if(todos !== null){
      this.setState({
        todos: todos
      });
    }
  }//set

  post(todo){
    let clone = _.clone(this.state.todos, true);
    clone.push(todo);

    this.setState({
      todos: clone
    });
  }//post

  put(todo){
    if(todo !== null) {
      let clone = _.clone(this.state.todos, true);

      clone.some((item, i)=> {
        if (item['_id'] == todo['_id']) {
          clone[i] = todo;
          return;
        }
      });

      this.setState({
        todos: clone
      });
    }
  }//put

  del(todo){
    if(todo !== null) {
      let clone = _.clone(this.state.todos, true);

      clone.some((item, i)=> {
        if (item['_id'] == todo['_id']) {
          clone.splice(i, 1);
          return;
        }
      });

      this.setState({
        todos: clone
      });
    }
  }//del
}

export default Alt.createStore(TodoStore);