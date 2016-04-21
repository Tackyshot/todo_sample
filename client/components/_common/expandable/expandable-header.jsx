"use strict";
import React      from 'react';
//import _          from 'lodash';
import Style      from './style/';

//import OpenIcon   from 'material-ui/lib/svg-icons/hardware/keyboard-arrow-up.js';
import RightIcon  from 'material-ui/lib/svg-icons/hardware/keyboard-arrow-right.js'
import IconButton from 'material-ui/lib/icon-button.js';

export default class ExpandableHeader extends React.Component{
  constructor(props, context){
    super(props, context);

    this.state = {
      expanded: typeof this.props.expanded == 'boolean' ? this.props.expanded : null
    };

    this.expandableType = "header";

    //rebindings
    this.renderExpanderButton = this.renderExpanderButton.bind(this);
  }

  componentWillReceiveProps(nextProps){
    if(this.props !== nextProps){
      this.setState({
        expanded: nextProps.expanded
      });
    }
  }

  render(){
    let style = Style.styles;

    let headerTitle = Style.setStyle('headerTitle',{
      width: this.props.actAsExpander ? "75%" : "100%",
      float: this.props.actAsExpander ? "left" : "none"
    });

    return (
      <div className="expandable-header" style={style.header}>
        <div className="expandable-header-title" style={headerTitle}>
          {this.props.children}
        </div>
        {this.renderExpanderButton()}
      </div>
    );
  }//render

  renderExpanderButton(){
    let style = Style.styles;
    let to_return = null;

    let headerIcon = Style.setStyle('headerIcon', {
      transform: this.props.expanded ? 'rotate(90deg)' : 'rotate(0deg)'
    });

    if(this.props.actAsExpander){
      to_return = (
        <div className="expandable-header-button" style={style.headerButton}>
          <IconButton
            onClick={this.props.onClick}
            style={headerIcon}
            >
            <RightIcon color={this.props.iconColor}/>
          </IconButton>
        </div>
      );
    }

    return to_return
  }//renderExpanderButton

}//ExpandableHeader

ExpandableHeader.propTypes = {
  type: React.PropTypes.string,
  actAsExpander: React.PropTypes.bool,
  expanded: React.PropTypes.bool.isRequired,
  onClick: React.PropTypes.func
};

ExpandableHeader.defaultProps = {
  type: "header",
  actAsExpander: true,
  expanded: false
};
