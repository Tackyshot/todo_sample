"use strict";
import OpenIcon   from 'material-ui/lib/svg-icons/hardware/keyboard-arrow-up.js';
import CloseIcon  from 'material-ui/lib/svg-icons/hardware/keyboard-arrow-down.js';
import IconButton from 'material-ui/lib/icon-button.js';

export default class ExpandableHeader extends React.Component{
  constructor(props, context){
    super(props, context);

    this.state = {
      expanded: typeof this.props.expanded == 'boolean' ? this.props.expanded : null
    };

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
    let headerStyle = {
      width: "100%",
      display: this.state.expanded ? "block" : "none"
    };

    let headerTitleStyle = {
      width: this.props.actAsExpander ? "80%" : "100%",
      float: this.props.actAsEpander ? "left" : "none",
      padding: "2%"
    };

    return (
      <div className="expandable-header" style={headerStyle}>
        <div className="expandable-header-title" style={headerTitleStyle}>
          {this.props.children}
        </div>
        {this.renderExpanderButton()}
      </div>
    );
  }//render

  renderExpanderButton(){
    let to_return = null;
    let headerButtonStyle = {
      width: "20%",
      float: "left"
    };

    if(this.props.actAsExpander){
      to_return = (
        <div className="expandable-header-button" style={headerButtonStyle}>
          <IconButton
            onClick={this.props.onClick}
            >
            {this.state.expanded ? <OpenIcon /> : <CloseIcon />}
          </IconButton>
        </div>
      );
    }

    return to_return
  }//renderExpanderButton

}//ExpandableHeader

ExpandableHeader.propTypes = {
  isOpen: React.PropTypes.bool,
  actAsExpander: React.PropTypes.bool,
  expanded: React.PropTypes.bool.isRequired,
  title: React.PropTypes.string
};

ExpandableHeader.defaultProps = {
  isOpen: false,
  actAsExpander: true,
  expanded: false,
  title: ""
};
