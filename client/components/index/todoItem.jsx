"use strict";
import TodoActions      from '../../actions/todo-actions.jsx';
import TodoStore        from '../../stores/todo-store.jsx';

//material components
import Card             from 'material-ui/lib/card/card.js';
import CardTitle        from 'material-ui/lib/card/card-title.js';
import CardText         from 'material-ui/lib/card/card-text.js';
import CardActions      from 'material-ui/lib/card/card-actions.js';
import Checkbox         from 'material-ui/lib/checkbox.js';
import IconButton       from 'material-ui/lib/icon-button.js';
import TextField        from 'material-ui/lib/text-field.js';

import {
  ExpandableWrapper,
  ExpandableHeader,
  ExpandableContent
  }                     from '../_common/expandable/';

import ListItem         from 'material-ui/lib/lists/list-item';
import CardHeader       from 'material-ui/lib/card/card-header.js';
import FlatButton       from 'material-ui/lib/flat-button';

//svg icons
import ContentCreate    from 'material-ui/lib/svg-icons/content/create.js';
import ContentSave      from 'material-ui/lib/svg-icons/content/save.js';
import ActionDelete     from 'material-ui/lib/svg-icons/action/delete.js';


export default class TodoItem extends React.Component{
  constructor(props, context){
    super(props, context);

    this.state = {
      editable: false,
      expanded: false,
      todo: {}
    };

    //rebindings
    this.toggleExpansion          = this.toggleExpansion.bind(this);
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
    let todoTitle         = this.getTitleArea();
    let todoDescription   = this.getDescriptionArea();

    /*return(
      <li>
        <Card
          onExpandChange={this.toggleExpansion}
          >
          <CardTitle
            actAsExpander={true}
            showExpandableButton={true}>
            <Checkbox checked={this.state.todo.done} onCheck={this.toggleDone} label={todoTitle} style={{width:"80%"}} />
          </CardTitle>
          <CardText expandable={true}>
            {todoDescription}
          </CardText>
          <CardAction expandable={true}>
            <IconButton >
              {this.state.editable ? <ContentCreate onClick={this.toggleEditableState}/> : <ContentSave onClick={this.handleSubmit} />}
            </IconButton>

            <IconButton onClick={this.handleDelete} >
              <ActionDelete />
            </IconButton>
          </CardAction>
        </Card>
      </li>
    );*/

    /*return (
      <Card initiallyExpanded={true} expanded={false}>
        <CardHeader
          title="Without Avatar"
          subtitle="Subtitle"
          actAsExpander={true}
          showExpandableButton={true}
          onExpandChange={()=>{
            console.log("Change Expanded State");
          }}
          />
        <CardText expandable={true}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
          Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
          Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
        </CardText>
        <CardActions expandable={true}>
          <FlatButton label="Action1"/>
          <FlatButton label="Action2"/>
        </CardActions>
      </Card>
    );*/

    return (
      <ExpandableWrapper>
        <ExpandableHeader actAsExpander={true} >
          <Checkbox checked={this.state.todo.done} onCheck={this.toggleDone} label={todoTitle} style={{width:"80%"}} />
          <p>{this.state.todo.title}</p>
        </ExpandableHeader>
        <ExpandableContent expandable={true}>
          <div>
            <p>{this.state.todo.description}</p>
          </div>
          <div>
            <IconButton >
              {this.state.editable ? <ContentCreate onClick={this.toggleEditableState}/> : <ContentSave onClick={this.handleSubmit} />}
            </IconButton>

            <IconButton onClick={this.handleDelete} >
              <ActionDelete />
            </IconButton>
          </div>
        </ExpandableContent>
      </ExpandableWrapper>
    )

    /*<div><Checkbox checked={this.state.todo.done} onCheck={this.props.onCheck} /></div>
     <div>{titleArea}</div>
     <div>edit and delete bttns</div>
     <div>dropdown description</div>*/

  }

  //event handlers
  toggleExpansion(){
    console.log("ON EXPAND CHANGE");
    this.setState({
      expanded: !this.state.expanded
    });
  }

  toggleEditableState(){
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
    });
  }

  handleDelete(){

    this.props.onDelete(this.state.todo);
  }

  //conditional renderers
  getTitleArea(){
    if(this.state.editable){
      return <TextField value={this.state.todo.title}
                        onChange={this.handleTitleChange}
                        fullWidth={true}/>
    }
    else {
      return this.state.todo.title
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