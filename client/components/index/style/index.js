import _      from 'lodash';
import Theme  from '../../_common/_theme';

export default new class Style {
  constructor(){
    let theme = Theme.theme;

    this.styles = {
      expandableStyle: {
        backgroundColor: theme.contrastColor,//'#5E412F',
        borderColor: "#F07818"
      },
      expandableIconColor: theme.accentColor,
      cbStyle :{
        width: 'initial',
        float: 'left',
        display: 'inline-block'
      },
      cbLabelStyle: { //'checkboxLabelStyle'
        fontFamily: "'Open Sans Condensed', sans-serif",
        fontSize: '2em',
        display: 'inline-block',
        float: 'left',
        margin: '0',
        color: theme.secondaryColor, //"white"
        lineHeight: '75%'
      },
      cbIconStyle: {
        fill: theme.accentColor, //"white"
        float: 'left'
      },
      contentArea: {
        padding: '0px 3%'
      },

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