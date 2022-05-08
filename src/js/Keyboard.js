import {
  switchShift, switchUnshift, switchCapsLock, switcnNonCapsLock, switchShiftCaps, switchUnshiftCaps,
  switchCapsShift, switchCapsUnshift,
} from './utils';

class Keyboard {
  constructor(lang, keys) {
    this.keys = keys;
    this.lang = lang;
    this.node = '';
    this.wrapper = '';
    this.textarea = '';
    this.content = '';
    this.row = '';
    this.caps = false;
    this.shift = false;
    this.codes = ['ControlLeft', 'AltLeft'];
  }

  createDomElement(element, ...classes) {
    this.node = document.createElement(element);
    this.node.classList.add(...classes);
    return this.node;
  }

  buildKeyboard() {
    this.wrapper = this.createDomElement('div', 'keyboard__wrapper');
    this.header = this.createDomElement('h1', 'header');
    this.header.innerHTML = 'RSS Virtual Keyboard';
    this.textarea = this.createDomElement('textarea', 'keyboard__textarea');
    this.content = this.createDomElement('div', 'keyboard__content');
    this.paragraph = this.createDomElement('p', 'keyboard__info');
    this.paragraph.innerHTML = 'Клавиатура создана на MAC OS, поэтому имеет некоторые особенности, например кнопка "delete" работает как "backspase" на Windows. "fn" +"delete" - удаление символов после курсора. Переключение языка левые Ctrl+Alt.';
    this.appendElements();
    this.createRow();
    const arrayKeys = Object.keys(this.keys);
    for (let i = 0; i < 14; i += 1) {
      this.createKeysButton(arrayKeys[i], this.keys[arrayKeys[i]]);
    }
    this.createRow();
    for (let i = 14; i < 28; i += 1) {
      this.createKeysButton(arrayKeys[i], this.keys[arrayKeys[i]]);
    }
    this.createRow();
    for (let i = 28; i < 41; i += 1) {
      this.createKeysButton(arrayKeys[i], this.keys[arrayKeys[i]]);
    }
    this.createRow();
    for (let i = 41; i < 54; i += 1) {
      this.createKeysButton(arrayKeys[i], this.keys[arrayKeys[i]]);
    }
    this.createRow();
    for (let i = 54; i < 64; i += 1) {
      this.createKeysButton(arrayKeys[i], this.keys[arrayKeys[i]]);
    }
    this.changeLang(this.lang);
  }

  createRow() {
    this.row = this.createDomElement('div', 'keyboard__row');
    this.content.append(this.row);
  }

  appendElements() {
    this.wrapper.append(this.header);
    this.content.append(this.textarea);
    this.wrapper.append(this.content);
    this.wrapper.append(this.paragraph);
    document.body.append(this.wrapper);
  }

  createKeysButton(key, value) {
    const button = this.createDomElement('button', 'keyboard__key');
    const spanRus = this.createDomElement('span', 'keyboard__rus', 'hidden');
    const spanRusCaseDown = this.createDomElement('span', 'case__down', 'hidden');
    spanRusCaseDown.innerHTML = value.rusCaseDown;
    const spanRusCaseUp = this.createDomElement('span', 'case__up', 'hidden');
    spanRusCaseUp.innerHTML = value.rusCaseUp;
    const spanRusCaps = this.createDomElement('span', 'caps', 'hidden');
    spanRusCaps.innerHTML = value.rusCaps;
    const spanRusShiftCaps = this.createDomElement('span', 'shift', 'hidden');
    spanRusShiftCaps.innerHTML = value.rusShiftCaps;
    const spanEn = this.createDomElement('span', 'keyboard__eng');
    const spanEnCaseDown = this.createDomElement('span', 'case__down');
    spanEnCaseDown.innerHTML = value.enCaseDown;
    const spanEnCaseUp = this.createDomElement('span', 'case__up', 'hidden');
    spanEnCaseUp.innerHTML = value.enCaseUp;
    const spanEnCaps = this.createDomElement('span', 'caps', 'hidden');
    spanEnCaps.innerHTML = value.enCaps;
    const spanEnShiftCaps = this.createDomElement('span', 'shift', 'hidden');
    spanEnShiftCaps.innerHTML = value.enShiftCaps;
    button.classList.add(key);
    spanRus.append(spanRusCaseDown);
    spanRus.append(spanRusCaseUp);
    spanRus.append(spanRusCaps);
    spanRus.append(spanRusShiftCaps);
    spanEn.append(spanEnCaseDown);
    spanEn.append(spanEnCaseUp);
    spanEn.append(spanEnCaps);
    spanEn.append(spanEnShiftCaps);
    button.append(spanRus);
    button.append(spanEn);
    button.addEventListener('click', (event) => {
      this.onClickKey(true, event.target.innerText);
    });
    this.row.append(button);
  }

  onClickKey(changeFlag, key, code) {
    if (key === 'CapsLock' && !this.shift) {
      this.caps = !this.caps;
      this.toggleCapsLock();
      this.changeCapsLock();
    } else if (key === 'Shift' && !this.caps) {
      this.shift = !this.shift;
      this.changeShift();
    } else if (key === 'Shift' && this.caps) {
      this.shift = !this.shift;
      this.changeShiftCapsLock();
    } else if (key === 'CapsLock' && this.shift) {
      this.caps = !this.caps;
      this.toggleCapsLock();
      this.changeShiftCapsLock();
    } else if (changeFlag) {
      this.textarea.value += key;
    } else {
      const elements = document.querySelector(`.${code}`).childNodes;
      let result;
      elements.forEach((element) => {
        if (!element.classList.contains('hidden')) {
          element.childNodes.forEach((span) => {
            if (!span.classList.contains('hidden')) {
              result = span;
            }
          });
        }
      });
      this.textarea.value += result.innerHTML;
    }
  }

  toggleCapsLock() {
    const capsLock = document.querySelector('.CapsLock');
    if (this.caps) {
      capsLock.classList.add('CapsLock--active');
    } else {
      capsLock.classList.remove('CapsLock--active');
    }
  }

  changeLang() {
    const spanArrayRus = document.querySelectorAll('.keyboard__rus');
    const spanArrayEng = document.querySelectorAll('.keyboard__eng');
    if (this.lang === 'en') {
      if (!this.caps) {
        spanArrayRus.forEach((span) => {
          span.classList.add('hidden');
          span.childNodes[0].classList.add('hidden');
        });
        spanArrayEng.forEach((span) => {
          span.classList.remove('hidden');
          span.childNodes[0].classList.remove('hidden');
        });
      } else {
        spanArrayRus.forEach((span) => {
          span.classList.add('hidden');
          span.childNodes[2].classList.add('hidden');
        });
        spanArrayEng.forEach((span) => {
          span.classList.remove('hidden');
          span.childNodes[2].classList.remove('hidden');
        });
      }
    } else if (!this.caps && this.lang === 'ru') {
      spanArrayEng.forEach((span) => {
        span.classList.add('hidden');
        span.childNodes[0].classList.add('hidden');
      });
      spanArrayRus.forEach((span) => {
        span.classList.remove('hidden');
        span.childNodes[0].classList.remove('hidden');
      });
    } else if (this.caps && this.lang === 'ru') {
      spanArrayEng.forEach((span) => {
        span.classList.add('hidden');
        span.childNodes[2].classList.add('hidden');
      });
      spanArrayRus.forEach((span) => {
        span.classList.remove('hidden');
        span.childNodes[2].classList.remove('hidden');
      });
    }
  }

  changeCapsLock() {
    if (this.caps && this.lang === 'en') {
      const spanArray = document.querySelectorAll('.keyboard__eng');
      switchCapsLock(spanArray);
    } else if (this.caps && this.lang === 'ru') {
      const spanArray = document.querySelectorAll('.keyboard__rus');
      switchCapsLock(spanArray);
    } else if (!this.caps && this.lang === 'en') {
      const spanArray = document.querySelectorAll('.keyboard__eng');
      switcnNonCapsLock(spanArray);
    } else if (!this.caps && this.lang === 'ru') {
      const spanArray = document.querySelectorAll('.keyboard__rus');
      switcnNonCapsLock(spanArray);
    }
  }

  changeShift() {
    if (this.lang === 'en' && this.shift) {
      const spanArray = document.querySelectorAll('.keyboard__eng');
      switchShift(spanArray);
    } else if (this.lang === 'ru' && this.shift) {
      const spanArray = document.querySelectorAll('.keyboard__rus');
      switchShift(spanArray);
    } else if (!this.shift) {
      if (this.lang === 'ru') {
        const spanArray = document.querySelectorAll('.keyboard__rus');
        switchUnshift(spanArray);
      } else {
        const spanArray = document.querySelectorAll('.keyboard__eng');
        switchUnshift(spanArray);
      }
    }
  }

  changeCapsLockShift() {
    if (this.lang === 'en') {
      const spanArray = document.querySelectorAll('.keyboard__eng');
      switchShiftCaps(spanArray);
    } else if (this.lang === 'ru') {
      const spanArray = document.querySelectorAll('.keyboard__rus');
      switchShiftCaps(spanArray);
    } else if (!this.shift && !this.caps) {
      if (this.lang === 'ru') {
        const spanArray = document.querySelectorAll('.keyboard__rus');
        switchUnshiftCaps(spanArray);
      } else {
        const spanArray = document.querySelectorAll('.keyboard__eng');
        switchUnshiftCaps(spanArray);
      }
    }
  }

  changeShiftCapsLock() {
    if (this.lang === 'en') {
      const spanArray = document.querySelectorAll('.keyboard__eng');
      if (this.shift && this.caps) {
        switchCapsShift(spanArray);
      } else if (!this.shift && this.caps) {
        switchUnshiftCaps(spanArray);
      } else if (this.shift && !this.caps) { switchCapsUnshift(spanArray); }
    } else if (this.lang === 'ru') {
      const spanArray = document.querySelectorAll('.keyboard__rus');
      if (this.shift && this.caps) {
        switchCapsShift(spanArray);
      } else if (!this.shift && this.caps) {
        switchUnshiftCaps(spanArray);
      } else if (this.shift && !this.caps) { switchCapsUnshift(spanArray); }
    }
  }

  combinationChangeLanguage() {
    const pressed = new Set();
    document.addEventListener('keydown', (event) => {
      pressed.add(event.code);
      for (let i = 0; i < this.codes.length; i += 1) {
        if (!pressed.has(this.codes[i])) {
          return;
        }
      }
      pressed.clear();
      if (this.lang === 'ru') {
        this.lang = 'en';
      } else {
        this.lang = 'ru';
      }
      this.changeLang();
    });
    document.addEventListener('keyup', (event) => {
      pressed.delete(event.code);
    });
  }
}

export default Keyboard;
