import _ from 'lodash';

export default new class Theme {
  constructor(){
    this.theme = {
      primaryColor:   '#1D2731',
      secondaryColor: '#0B3C5D',
      contrastColor:  '#FCEBB6',
      accentColor:    "#F07818" /*'#328CC1'*/,
      highlightColor: '#D98310'
    }//theme
  }//constructor

  setTheme(key, valueObj){
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