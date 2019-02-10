import { GET_TAG_COLOR } from '../actions/index';

const initialState = {
  colors: { 'critical': '#A60000', 'high': 'red', 'medium': 'orange', 'low': 'green' },

}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_TAG_COLOR:
      const tag = action.payload.toLowerCase();
      let colors = { ...state.colors };
      if (!state.colors[tag]) {
        colors = { ...state.colors, [tag]: getRandomColor() }
      }
      return { colors: colors }
    default:
      return state
  }
}

/**
  * Renvoie une couleur hexa aléatoire
  */
function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var rcolor = '#';
  for (var i = 0; i < 6; i++) {
    rcolor += letters[Math.floor(Math.random() * 16)];
  }
  return rcolor;
}