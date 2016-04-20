import _      from 'lodash';
import Theme  from '../../../_common/_theme';

export default new class Style {
  constructor(){
    let theme = Theme.theme;

    this.styles = {
      hideableMenu:{
        position: 'absolute',
        left: '19.4%',
        marginTop: '1%',
      },
      hiddenMenu: {
        visibility: 'hidden',
        display: 'none'
      },
      visibleMenu: {
        visibility: 'visible',
        display: 'inline'
      },
      menuContent: {
        float: 'left',
        backgroundColor: theme.contrastColor
      },
      menuArrow: {
        width: 0,
        height: 0,
        borderStyle: "solid",
        borderWidth: "8px 0 8px 13.9px",
        borderColor: `transparent transparent transparent ${theme.contrastColor}`,
        float: 'right',
        marginTop: '15%',
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