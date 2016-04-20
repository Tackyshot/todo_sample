import _ from 'lodash';

export default new class Style {
  constructor(){
    this.styles = {
      wrapper:{
        width: '100%',
        border: '1px solid black'
      },
      content:{
        width: '100%',
        overflow: "hidden",
        transition: "max-height .3s ease"
      },
      header: {
        width: '100%',
        display: 'block'
      },
      headerTitle:{
        padding: '3%',
        paddingRight: 0
      },
      headerButton: {
        float: 'right',
        padding: '2%'
      },
      headerIcon:{
        transition: 'transform .3s ease'
      }
    }
  }

  setStyle(key, valueObj){
    try{
      _.merge(this.styles[key], valueObj);
      return true;
    }
    catch(err){
      console.error("Expandable Styles Error:", err);
      return false;
    }
    //this.style[key][prop] = value;
  }
}