import Keyboard from './js/Keyboard';
import keys from './js/data';
import {
  setLocalStorage, getLocalStorage, getActiveClass, removeActiveClass,
} from './js/utils';

const currentLang = getLocalStorage();
const virtualKeyboard = new Keyboard(currentLang, keys);
window.onload = function load() {
  virtualKeyboard.buildKeyboard();
  document.addEventListener('keydown', (event) => {
    event.preventDefault();
    if (event.code === 'Delete') {
      virtualKeyboard.onClickKey(false, event.key, event.code);
    } else if (event.code === 'ControlLeft') {
      virtualKeyboard.controlLeft = true;
      getActiveClass(event);
      virtualKeyboard.onClickKey(false, event.key, event.code);
    } else if (event.key === 'Shift') {
      virtualKeyboard.shift = true;
      getActiveClass(event);
      if (virtualKeyboard.caps) {
        virtualKeyboard.changeShiftCapsLock();
      } else {
        virtualKeyboard.changeShift();
      }
    } else {
      getActiveClass(event);
      virtualKeyboard.onClickKey(false, event.key, event.code);
    }
  });

  document.addEventListener('keyup', (event) => {
    if (event.code === 'Delete') { return; }
    if (event.code === 'ControlLeft') {
      virtualKeyboard.controlLeft = false;
      removeActiveClass(event);
    } else if (event.key === 'Shift') {
      virtualKeyboard.shift = false;
      removeActiveClass(event);
      if (virtualKeyboard.caps) {
        virtualKeyboard.changeShiftCapsLock();
      } else {
        virtualKeyboard.changeShift();
      }
    } else {
      removeActiveClass(event);
    }
  });

  virtualKeyboard.combinationChangeLanguage();
  virtualKeyboard.combinationDelete();
};

window.onbeforeunload = function unload() {
  setLocalStorage(virtualKeyboard.lang);
};
