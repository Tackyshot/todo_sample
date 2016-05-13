"use strict";
import Alt      from '../alt.jsx';
import request  from 'superagent';

class TodoActions {

  get(callback){
    const route   = '/api/todos';

    return (dispatch)=>{
      request
        .get(route)
        .set('Accept', 'application/json')
        .end((err, res)=>{
          let toDispatch = !err ? JSON.parse(res.text).todos : null;
          dispatch(toDispatch);
          callback(err);
        });
    }
  }//load

  post(options, callback){
    const data  = options.data;
    const route = '/api/todos';

    return (dispatch)=>{
      request
        .post(route)
        .send(data)
        .set('Accept', 'application/json')
        .end((err, res)=>{
          let toDispatch = !err ? JSON.parse(res.text) : null;
          dispatch(toDispatch);
          callback(err);
        });
    }
  }//post

  put(options, callback){
    const params  = options.params;
    const data    = options.data;
    const route   = '/api/todos/' + params.todoId;

    return (dispatch)=>{
      request
        .put(route)
        .send(data)
        .set('Accept', 'application/json')
        .end((err, res)=>{
          let toDispatch = !err ? JSON.parse(res.text) : null;
          dispatch(toDispatch);
          callback(err);
        });
    }
  }//put

  del(options, callback){
    const params  = options.params;
    const data    = options.data;
    const route   = '/api/todos/' + params.todoId;

    return (dispatch)=>{
      request
        .del(route)
        .send(data)
        .set('Accept', 'application/json')
        .end((err, res)=>{
          let toDispatch = !err ? JSON.parse(res.text) : null;
          dispatch(toDispatch);
          callback(err);
        });
    }
  }//del

}

export default Alt.createActions(TodoActions);