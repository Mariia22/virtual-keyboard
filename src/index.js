import Keyboard from './js/Keyboard';
import keys from './js/data';

window.onload = function load() {
  const virtualKeyboard = new Keyboard('ru', keys);
  virtualKeyboard.buildKeyboard();
};
