import React from 'react';
import _     from 'lodash';
import Style from './style/';

export default class Expandable extends React.Component{
  constructor(props, context){
    super(props, context);

    this.state = {
      expanded: this.props.expanded === null ? false : this.props.expanded
    };

    //rebindings
    this.handleExpansion = this.handleExpansion.bind(this);

  }

  render(){
    let style = Style.styles;

    return (
      <div className="expandable-wrapper" style={_.merge({}, style.wrapper, this.props.style)}>
        {React.Children.map(this.props.children, (child)=>{
          let newProps        = {};
          let expandableChild = child;
          let expandableType  = expandableChild.expandableType;

          newProps.expanded = this.state.expanded;

          try{
            if(expandableType = "header"){
              newProps.onClick = this.handleExpansion;
            }
            else if(expandableType = "content"){

            }
            else{
              expandableChild = null;
            }
          }
          catch(err){
            return console.error(err);
          }

          return React.cloneElement(expandableChild, newProps);
        })}
      </div>
    )
  }//render

  handleExpansion(e){
    this.setState({
      expanded: !this.state.expanded
    });
  }

}//Wrapper

Expandable.defaultProps = {
  expanded: null,
  style: {},
};