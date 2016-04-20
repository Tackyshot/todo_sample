"use strict";
import AppBar   from 'material-ui/lib/app-bar';
import Style    from './_common/_baseStyle/'
import React    from 'react';

export default class Base extends React.Component{
  constructor(props, context){
    super(props, context);

    this.state = {}
  }

  render(){
    let style = Style.styles;

    return(
      <div className="baseComponent" style={style.baseComponent} >
        <div className="header-area" style={style.headerArea}>
          {/*<AppBar title="Todo App" showMenuIconButton={false}/>*/}
          <p style={style.headerTitle}>KickAss ToDo List</p>
        </div>
        <div className="body-area" style={style.bodyArea} >
          <div className="content-area" style={style.contentArea} >
            {this.props.children}
          </div>
        </div>

      </div>
    )
  }
}