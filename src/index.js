import Keyboard from './js/Keyboard';
import keys from './js/data';

window.onload = function load() {
  const virtualKeyboard = new Keyboard('ru', keys);
  virtualKeyboard.buildKeyboard();

  document.addEventListener('keydown', (event) => {
    event.preventDefault();
    const element = document.querySelector(`.${event.code}`);
    element.classList.add('keyboard__key-active');
    if (event.key !== 'Shift') {
      virtualKeyboard.onClickKey(event.key);
    }
  });
};

document.addEventListener('keyup', () => {
  const element = document.querySelector('.keyboard__key-active');
  element.classList.remove('keyboard__key-active');
});
