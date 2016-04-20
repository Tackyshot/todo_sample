"use strict";
import React            from 'react';
import _                from 'lodash';

import Style            from './style/';

import TodoActions      from '../../actions/todo-actions.jsx';
import TodoStore        from '../../stores/todo-store.jsx';
import {
  Expandable,
  ExpandableHeader,
  ExpandableContent
  }                     from '../_common/expandable/';
import HideableMenu     from './hideableMenu/'
//material components
import Checkbox         from 'material-ui/lib/checkbox.js';
import IconButton       from 'material-ui/lib/icon-button.js';
import TextField        from 'material-ui/lib/text-field.js';
//svg icons
import ContentCreate    from 'material-ui/lib/svg-icons/content/create.js';
import ContentSave      from 'material-ui/lib/svg-icons/content/save.js';
import ActionDelete     from 'material-ui/lib/svg-icons/action/delete.js';


export default class TodoItem extends React.Component{
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
  }

  componentWillMount(){
    this.setState({
      todo: this.props.todo
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

    /*<div>
     <IconButton >
     {this.state.editable ? <ContentSave onClick={this.handleSubmit} /> : <ContentCreate onClick={this.toggleEditableState}/>}
     </IconButton>

     <IconButton onClick={this.handleDelete} >
     <ActionDelete color={'red'} />
     </IconButton>
     </div>*/

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
            <Checkbox checked={this.state.todo.done} onCheck={this.toggleDone} style={style.cbStyle} iconStyle={style.cbIconStyle}/>
            {todoTitle}
          </ExpandableHeader>
          <ExpandableContent expandable={true} >
            <div style={style.contentArea}>
              <p>{this.state.todo.description}</p>
            </div>
          </ExpandableContent>
        </Expandable>
      </div>
    );

  }//render

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
    console.log('toggle editable');
    this.setState({
      editable: !this.state.editable
    });
  }

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
        this.props.onEdit();
      }
      else{
        console.error("Toggle Done Error: todoItem.jsx", err);
      }
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

  handleSubmit(){
    TodoActions.put({
      params: {
        todoId: this.state.todo['_id']
      },
      data: this.state.todo
    }, (err)=>{
      if(!err){
        this.toggleEditableState();
        this.props.onEdit();
      }
      else{
        console.error("Data Submission Error: todoItem.jsx");
      }
    });
  }

  handleDelete(){

    this.props.onDelete(this.state.todo);
  }

  //conditional renderers
  getTitleArea(){
    let style = Style.styles;

    if(this.state.editable){
      return <TextField value={this.state.todo.title}
                        onChange={this.handleTitleChange}
                        fullWidth={true}
                        style={style.cbLabelStyle}/>
    }
    else {
      return <p style={style.cbLabelStyle}>{this.state.todo.title}</p>
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
      return this.state.todo.description
    }
  }

}

TodoItem.propTypes = {
  todo: React.PropTypes.object.isRequired,
  onEdit: React.PropTypes.func.isRequired,
  onDelete: React.PropTypes.func.isRequired,
  onCheck: React.PropTypes.func.isRequired
};

TodoItem.defaultProps = {
  todo: {_id:-1, title: "default", description: "default", done: false}
};