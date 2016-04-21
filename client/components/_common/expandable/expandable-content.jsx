import React from 'react';
import _     from 'lodash';
import Style from './style/';

export default class ExpandableContent extends React.Component{
  constructor(props, context){
    super(props, context);

    this.state = {
      expanded: this.props.expanded ? this.props.expanded : null
    };
    this.expandableType = "content";

  }

  componentWillReceiveProps(nextProps){
    if(this.props !== nextProps){
      this.setState({
        expanded: nextProps.expanded
      });
    }
  }

  render(){
    let content = Style.setStyle('content', {
      maxHeight: this.state.expanded ? this.findMaxHeight() : "0px"
    });

    return (
      <div className="expandable-content" ref={'expandableContent'} style={content}>
        {this.props.children}
      </div>
    );
  }

  findMaxHeight(){
    let content = this.refs.expandableContent;

    return content.scrollHeight + "px";
  }
}//ExpandableContent

