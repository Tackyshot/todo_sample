"use strict";
import React    from 'react';
import _        from 'lodash';
import Style    from './style/'

export default class HideableMenu extends React.Component{
  constructor(props, context){
    super(props, context);

    this.state = {
      visible: this.props.visible || false
    };

  }

  componentWillMount(){
  }

  componentWillReceiveProps(nextProps){
    if(this.props !== nextProps){
      this.setState({
        visible: nextProps.visible
      })
    }
  }

  render(){
    let style       = Style.styles;
    //let visibility  = this.state.visible ? style.visibleMenu : style.hiddenMenu;
    let hideableMenu = Style.setStyle('hideableMenu', this.state.visible ? style.visibleMenu : style.hiddenMenu);

    return (
      <div style={hideableMenu}>
        <div style={style.menuContent}>
          {this.props.children}
        </div>
        <div style={style.menuArrow} ></div>
      </div>
    )
  }//render

}//HideableMenu

HideableMenu.defaultProps = {
  visible: false
};

HideableMenu.propTypes = {
  visible: React.PropTypes.bool
};
