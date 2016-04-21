import _      from 'lodash';
import Theme  from '../_theme/';

export default new class Style {
  constructor(){
    let theme = Theme.theme;

    this.styles = {
      baseComponent:{
        padding: "0px",
        margin: "0px",
        display: "block",
        width: "100%",
        height: "100%",
        maxHeight: "100%"
      },
      headerArea: {
        width: '100%'
      },
      headerTitle :{
        width: '50%',
        margin: '0px auto .2em',
        fontWeight: "normal",
        fontSize: "13em",
        lineHeight: "1em",
        color: theme.accentColor, //"#F07818",
        textShadow: "1px 2px 0px #C75900"
      },
      bodyArea : {
        width: '100%'
      },
      contentArea:{
        width:"50%",
        margin: "0px auto"
      }
    }//styles
  }//constructor

  setStyle(key, valueObj){
    try{
      return _.merge(_.clone(this.styles[key], true), valueObj);
    }
    catch(err){
      console.error("Expandable Styles Error:", err);
      return false;
    }
    //this.style[key][prop] = value;
  }
}