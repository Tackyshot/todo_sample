export default class ExpandableWrapper extends React.Component{
  constructor(props, context){
    super(props, context);

    this.state = {
      expanded: this.props.expanded === null ? false : this.props.expanded
    };

    //rebindings
  }

  render(){
    return (
      <div className="expandable-wrapper" style={this.getStyle().wrapper}>
        {React.Children.map(this.props.children, (child)=>{
          let newProps = {};
          let doClone = false;

          if(!child || !child.props){
            return null;
          }
          if(!this.state.expanded && child.props.expandable){
            return;
          }

          if(child.props.actAsExpander){
            doClone = true;
            newProps.onClick = this.handleExpansion;
            newProps.expanded = this.state.expanded;
          }
          if(child.props.expandable){
            newProps.expanded = this.state.expanded;
          }

          return React.cloneElement(child, newProps);
        })}
      </div>
    )
  }//render

  handleExpansion(e){
    this.setState({
      expanded: !this.state.expanded
    });
  }

  getStyle(){
    return {
      "wrapper":{

      }
    }
  }//getStyle()
}//Wrapper

ExpandableWrapper.defaultProps = {
  expanded: null
};