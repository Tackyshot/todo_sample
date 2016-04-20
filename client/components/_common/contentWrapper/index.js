"use strict";
import React from 'react';

export default class ContentWrapper extends React.Component{
  constructor(props, context){
    super(props, context);

    this.state = {};
  }

  render(){
    return (
      <div className={"content-wrapper " + this.props.wrapperClass}>
        {/*<h3>{this.props.title}</h3>*/}
        <div className={"content-main " + this.props.mainClass}>
          {this.props.children}
        </div>
      </div>
    )
  }

}

ContentWrapper.propTypes = {
  wrapperClass: React.PropTypes.string,
  mainClass: React.PropTypes.string,
  title: React.PropTypes.string
};

ContentWrapper.defaultProps = {
  wrapperClass: "",
  mainClass: "",
  title: "Content Title"
};