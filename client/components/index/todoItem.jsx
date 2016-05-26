"use strict";
import React, {Component} from 'react';
import _                  from 'lodash';

import Style              from './style/';

import TodoActions        from '../../actions/todo-actions.jsx';
import TodoStore          from '../../stores/todo-store.jsx';
import {
  Expandable,
  ExpandableHeader,
  ExpandableContent
  }                       from '../_common/expandable/';
import HideableMenu       from './hideableMenu/'
//material components
import Checkbox           from 'material-ui/lib/checkbox.js';
import IconButton         from 'material-ui/lib/icon-button.js';
import TextField          from 'material-ui/lib/text-field.js';
//svg icons
import ContentCreate      from 'material-ui/lib/svg-icons/content/create.js';
import ContentSave        from 'material-ui/lib/svg-icons/content/save.js';
import ActionDelete       from 'material-ui/lib/svg-icons/action/delete.js';


export default class TodoItem extends Component{
  constructor(props, context){
    super(props, context);

    this.state = {
      editable: false,
      menuVisibility: false,
      todo: {}
    };

    //rebindings
    this.toggleMenuOn             = this.toggleMenuOn.bind(this);
    this.toggleMenuOff            = this.toggleMenuOff.bind(this);
    this.toggleEditableState      = this.toggleEditableState.bind(this);
    this.toggleDone               = this.toggleDone.bind(this);
    this.handleTitleChange        = this.handleTitleChange.bind(this);
    this.handleDescriptionChange  = this.handleDescriptionChange.bind(this);
    this.handleSubmit             = this.handleSubmit.bind(this);
    this.handleDelete             = this.handleDelete.bind(this);
    this.onKeyPress               = this.onKeyPress.bind(this);
  }

  componentWillMount(){
    let todo      = this.props.todo;
    let editable  = this.state.editable;

    if((todo.title === '') && (todo.description === '') && (todo.done === false)){
      editable = true;
    }

    this.setState({
      todo: todo,
      editable: editable
    });
  }

  componentWillReceiveProps(nextProps){
    if(this.state.todo !== nextProps.todo){
      this.setState({
        todo: nextProps.todo
      });
    }
  }

  render(){
    let style               = Style.styles;
    let todoTitle           = this.getTitleArea();
    let handleSubmit        = this.handleSubmit;
    let toggleEditableState = this.toggleEditableState;
    let todoDescription     = this.getDescriptionArea();

    return (
      <div onMouseOver={this.toggleMenuOn} onMouseOut={this.toggleMenuOff}>
        <HideableMenu visible={this.state.menuVisibility} >
          <IconButton onClick={this.handleDelete} >
            <ActionDelete color={'red'} />
          </IconButton>
          <IconButton onClick={(this.state.editable ? handleSubmit : toggleEditableState)}>
            {this.state.editable ? <ContentSave /> : <ContentCreate />}
          </IconButton>
        </HideableMenu>
        <Expandable style={style.expandableStyle} >
          <ExpandableHeader actAsExpander={true} iconColor={style.expandableIconColor} >
            <div style={{display: 'inline-block', verticalAlign: 'top'}}>
              <Checkbox checked={this.state.todo.done} onCheck={this.toggleDone} style={style.cbStyle} iconStyle={style.cbIconStyle}/>
            </div>
            <div style={{width:'78%', display: 'inline-block', /*paddingLeft: '5%'*/}}>
              {todoTitle}
            </div>
          </ExpandableHeader>
          <ExpandableContent expandable={true} >
            <div style={style.contentArea}>
              {todoDescription}
            </div>
          </ExpandableContent>
        </Expandable>
      </div>
    );

  }//render

  componentDidMount(){
    if(this.state.editable){
      return this.refs[`todoTextfield-${this.state.todo._id}`].focus();
    }
  }

  //event handlers
  toggleMenuOn(){
    this.setState({
      menuVisibility: true
    })
  }

  toggleMenuOff(){
    this.setState({
      menuVisibility: false
    })
  }

  toggleEditableState(){
    this.setState({
      editable: !this.state.editable
    });
  }

  handleTitleChange(e){
    let clone = _.clone(this.state.todo, true);

    clone.title = e.target.value;

    this.setState({
      todo: clone
    });
  }

  handleDescriptionChange(e){
    let clone = _.clone(this.state.todo, true);

    clone.description = e.target.value;
    this.setState({
      todo: clone
    });
  }

  onKeyPress(e){
    console.log('KeyPress', e.charCode);
    if(e.charCode === 13){
      return this.handleSubmit();
    }
  }

  /*FLUX MUTATORS*/
  toggleDone(){
    let clone = _.clone(this.state.todo, true);

    clone.done = !this.state.todo.done;
    TodoActions.put({
      params: {
        todoId: this.state.todo['_id']
      },
      data: clone
    }, (err)=>{
      if(!err) {
        this.props.eventCallback();
      }
      else{
        console.error("Toggle Done Error: todoItem.jsx", err);
      }
    });
  }

  handleSubmit(){
    TodoActions.put({
      params: {
        todoId: this.state.todo['_id']
      },
      data: this.state.todo
    }, (err)=>{
      if(!err){
        this.toggleEditableState();
        this.props.eventCallback();
      }
      else{
        console.error("Data Submission Error: todoItem.jsx");
      }
    });
  }

  handleDelete(){
    TodoActions.del({
      params: {
        todoId: this.state.todo['_id']
      },
      data: this.state.todo
    }, (err)=>{
      if(!err) {
        this.props.eventCallback();
      }
      else{
        console.error("Toggle Done Error: todoItem.jsx", err);
      }
    });
    //this.props.onDelete(this.state.todo);
  }

  /* CONDITIONAL RENDERERS */
  getTitleArea(){
    let style = Style.styles;

    if(this.state.editable){
      return <TextField ref={`todoTextfield-${this.state.todo._id}`}
                        onKeyPress={this.onKeyPress}
                        underlineShow={true}
                        value={this.state.todo.title}
                        onChange={this.handleTitleChange}
                        fullWidth={true}
                        style={style.cbLabelStyle}/>
    }
    else {
      let cbLabelStyle = Style.setStyle('cbLabelStyle', {
        textDecoration: this.state.todo.done ? 'line-through' : 'none'
      });

      return <p style={cbLabelStyle}>{this.state.todo.title}</p>
    }
  }//getTitleArea

  getDescriptionArea(){
    if(this.state.editable){
      return <TextField value={this.state.todo.description}
                        onChange={this.handleDescriptionChange}
                        fillWidth={true}
                        multiLine={true}
                        rows={3}/>
    }
    else{
      return <p>{this.state.todo.description}</p>
    }
  }

}

TodoItem.propTypes = {
  todo: React.PropTypes.object.isRequired,
  eventCallback: React.PropTypes.func.isRequired
};

TodoItem.defaultProps = {
  todo: {_id:-1, title: "default", description: "default", done: false}
};