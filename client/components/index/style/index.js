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
      cbLabelStyle: { //'checkboxLabelStyle'
        fontFamily: "'Open Sans Condensed', sans-serif",
        fontSize: '2em',
        color: theme.secondaryColor//"white"
      },
      cbIconStyle: {
        fill: theme.accentColor//"white"
      }
    }//styles
  }//constructor

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