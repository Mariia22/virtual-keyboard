import Keyboard from './js/Keyboard';
import keys from './js/data';
import { setLocalStorage, getLocalStorage } from './js/utils';

const currentLang = getLocalStorage();
const virtualKeyboard = new Keyboard(currentLang, keys);
window.onload = function load() {
  virtualKeyboard.buildKeyboard();
  document.addEventListener('keydown', (event) => {
    event.preventDefault();
    const element = document.querySelector(`.${event.code}`);
    element.classList.add('keyboard__key-active');
    virtualKeyboard.onClickKey(false, event.key, event.code);
  });

  document.addEventListener('keyup', (event) => {
    const element = document.querySelector('.keyboard__key-active');
    if (element) { element.classList.remove('keyboard__key-active'); }
    if (event.key === 'Shift') {
      virtualKeyboard.shift = false;
      if (virtualKeyboard.caps) {
        virtualKeyboard.changeShiftCapsLock();
      } else {
        virtualKeyboard.changeShift();
      }
    }
  });

  virtualKeyboard.combinationChangeLanguage();
};

window.onbeforeunload = function unload() {
  setLocalStorage(virtualKeyboard.lang);
};
