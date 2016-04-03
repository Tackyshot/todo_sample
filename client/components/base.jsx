"use strict";
import AppBar   from 'material-ui/lib/app-bar';

export default class Base extends React.Component{
  constructor(props, context){
    super(props, context);

    this.state = {}
  }

  render(){
    return(
      <div className="baseComponent">
        <div className="header-area" style={{width: "100%"}}>
          <AppBar title="Todo App" showMenuIconButton={false}/>
        </div>
        <div className="body-area" style={{width: "100%"}} >
          <div className="content-area" style={{width:"50%", margin: "0px auto"}} >
            {this.props.children}
          </div>
        </div>

      </div>
    )
  }
}