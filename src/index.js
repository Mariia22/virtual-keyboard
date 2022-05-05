import Keyboard from './js/Keyboard';
import keys from './js/data';

window.onload = function load() {
  const virtualKeyboard = new Keyboard('ru', keys);
  virtualKeyboard.buildKeyboard();

  document.addEventListener('keydown', (event) => {
    console.log(event);
    event.preventDefault();
    if (event.key !== 'Shift') {
      virtualKeyboard.textarea.value += event.key;
    }
  });
};
