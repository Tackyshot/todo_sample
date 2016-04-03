export default class ExpandableContent extends React.Component{
  constructor(props, context){
    super(props, context);

    this.state = {
      expanded: this.props.expanded ? this.props.expanded : null
    };
  }

  componentWillReceiveProps(nextProps){
    if(this.props !== nextProps){
      this.setState({
        expanded: nextProps.expanded
      });
    }
  }

  render(){
    let style = {
      width: "100%",
      display: this.state.expanded ? "block" : "none"
    };

    return (
      <div className="expandable-content" style={style}>
        {this.props.children}
      </div>
    );
  }
}