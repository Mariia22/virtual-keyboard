import {
  switchShift, switchUnshift, switchCapsLock, switcnNonCapsLock, switchShiftCaps, switchUnshiftCaps,
  switchCapsShift, switchCapsUnshift, switchCapShift,
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
    this.delete = ['ControlLeft', 'Backspace'];
    this.controlLeft = false;
    this.capsLock = false;
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
    this.textarea.rows = 5;
    this.textarea.cols = 50;
    this.content = this.createDomElement('div', 'keyboard__content');
    this.paragraph = this.createDomElement('p', 'keyboard__info');
    this.paragraph.innerHTML = 'Клавиатура создана на MAC OS, поэтому имеет некоторые особенности, например кнопка delete работает как backspase на Windows. Левый control + delete - удаление символов после курсора на данной клавиатуре. Переключение языка левые control+alt.';
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
      this.onClickKey(true, event.target.innerText, event.target);
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
      if (this.shift) {
        code.closest('button').classList.add('keyboard__key-active');
      } else {
        const array = document.querySelectorAll('.keyboard__key-active');
        if (array.length > 0) {
          array.forEach((item) => item.classList.remove('keyboard__key-active'));
        }
      }
      this.changeShift();
    } else if (key === 'Shift' && this.caps) {
      this.changeShiftCapsLock();
    } else if (key === 'CapsLock' && this.shift) {
      this.caps = !this.caps;
      this.capsLock = true;
      this.toggleCapsLock();
      this.changeShiftCapsLock();
    } else if (key === 'delete' || key === 'Backspace' || key === 'Delete') {
      if (!this.controlLeft) {
        const start = this.textarea.selectionStart;
        this.textarea.value = `${this.textarea.value.substring(0, this.textarea.selectionStart - 1)}${this.textarea.value.substring(this.textarea.selectionEnd)}`;
        this.textarea.selectionStart = start - 1;
        this.textarea.selectionEnd = start - 1;
        this.textarea.focus();
      }
    } else if (key === 'Tab') {
      this.textarea.setRangeText('\t', this.textarea.selectionStart, this.textarea.selectionEnd, 'end');
    } else if (key === 'Enter') {
      this.textarea.setRangeText('\n', this.textarea.selectionStart, this.textarea.selectionEnd, 'end');
      this.textarea.focus();
    } else if (key === 'Meta' || key === 'command') {
      this.textarea.value = `${this.textarea.value.substring(0, this.textarea.selectionStart)}${this.textarea.value.substring(this.textarea.selectionEnd)}`;
      this.textarea.focus();
    } else if (key === '' || code === 'Space') {
      this.textarea.value = `${this.textarea.value.substring(0, this.textarea.selectionStart)} ${this.textarea.value.substring(this.textarea.selectionEnd)}`;
      this.textarea.focus();
    } else if (key === 'Control' || key === 'control') {
      this.textarea.value = `${this.textarea.value.substring(0, this.textarea.selectionStart)}${this.textarea.value.substring(this.textarea.selectionEnd)}`;
    } else if (key === 'Alt' || key === 'alt') {
      this.textarea.value = `${this.textarea.value.substring(0, this.textarea.selectionStart)}${this.textarea.value.substring(this.textarea.selectionEnd)}`;
      this.textarea.focus();
    } else if (key === 'fn') {
      this.textarea.focus();
      this.textarea.value = `${this.textarea.value.substring(0, this.textarea.selectionStart)}${this.textarea.value.substring(this.textarea.selectionEnd)}`;
    } else if (key === 'ArrowRight' || key === '►') {
      this.textarea.focus();
      this.textarea.value = `${this.textarea.value.substring(0, this.textarea.selectionStart)}${this.textarea.value.substring(this.textarea.selectionEnd)}`;
      this.textarea.selectionStart += 1;
      this.textarea.selectionEnd = this.textarea.selectionStart;
    } else if (key === 'ArrowLeft' || key === '◄') {
      this.textarea.focus();
      this.textarea.value = `${this.textarea.value.substring(0, this.textarea.selectionStart)}${this.textarea.value.substring(this.textarea.selectionEnd)}`;
      this.textarea.selectionStart -= 1;
      this.textarea.selectionEnd = this.textarea.selectionStart;
    } else if (key === 'ArrowUp' || key === '▲') {
      this.textarea.focus();
      this.textarea.selectionStart = 0;
      this.textarea.selectionEnd = 0;
    } else if (key === 'ArrowDown' || key === '▼') {
      this.textarea.focus();
      const array = (this.textarea.value).split('');
      this.textarea.selectionStart = array.length;
      this.textarea.selectionEnd = array.length;
    } else if (changeFlag) {
      this.textarea.focus();
      this.textarea.setRangeText(key, this.textarea.selectionStart, this.textarea.selectionEnd, 'end');
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
      this.textarea.setRangeText(result.innerHTML, this.textarea.selectionStart, this.textarea.selectionEnd, 'end');
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

    if (!this.shift && !this.caps && this.lang === 'en') {
      spanArrayRus.forEach((span) => {
        span.classList.add('hidden');
        span.childNodes[0].classList.add('hidden');
      });
      spanArrayEng.forEach((span) => {
        span.classList.remove('hidden');
        span.childNodes[0].classList.remove('hidden');
      });
    } else if (!this.shift && this.caps && this.lang === 'en') {
      spanArrayRus.forEach((span) => {
        span.classList.add('hidden');
        span.childNodes[2].classList.add('hidden');
      });
      spanArrayEng.forEach((span) => {
        span.classList.remove('hidden');
        span.childNodes[2].classList.remove('hidden');
      });
    } else if (this.shift && !this.caps && this.lang === 'en') {
      spanArrayRus.forEach((span) => {
        span.classList.add('hidden');
        span.childNodes[1].classList.add('hidden');
      });
      spanArrayEng.forEach((span) => {
        span.classList.remove('hidden');
        span.childNodes[1].classList.remove('hidden');
      });
    } else if (this.shift && this.caps && this.lang === 'en') {
      spanArrayRus.forEach((span) => {
        span.classList.add('hidden');
        span.childNodes[3].classList.add('hidden');
      });
      spanArrayEng.forEach((span) => {
        span.classList.remove('hidden');
        span.childNodes[3].classList.remove('hidden');
      });
    } else if (!this.shift && !this.caps && this.lang === 'ru') {
      spanArrayEng.forEach((span) => {
        span.classList.add('hidden');
        span.childNodes[0].classList.add('hidden');
      });
      spanArrayRus.forEach((span) => {
        span.classList.remove('hidden');
        span.childNodes[0].classList.remove('hidden');
      });
    } else if (!this.shift && this.caps && this.lang === 'ru') {
      spanArrayEng.forEach((span) => {
        span.classList.add('hidden');
        span.childNodes[2].classList.add('hidden');
      });
      spanArrayRus.forEach((span) => {
        span.classList.remove('hidden');
        span.childNodes[2].classList.remove('hidden');
      });
    } else if (this.shift && !this.caps && this.lang === 'ru') {
      spanArrayEng.forEach((span) => {
        span.classList.add('hidden');
        span.childNodes[1].classList.add('hidden');
      });
      spanArrayRus.forEach((span) => {
        span.classList.remove('hidden');
        span.childNodes[1].classList.remove('hidden');
      });
    } else if (this.shift && this.caps && this.lang === 'ru') {
      spanArrayEng.forEach((span) => {
        span.classList.add('hidden');
        span.childNodes[3].classList.add('hidden');
      });
      spanArrayRus.forEach((span) => {
        span.classList.remove('hidden');
        span.childNodes[3].classList.remove('hidden');
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
      this.changeClassesOnPressingShiftCaps(spanArray);
    } else if (this.lang === 'ru') {
      const spanArray = document.querySelectorAll('.keyboard__rus');
      this.changeClassesOnPressingShiftCaps(spanArray);
    }
  }

  changeClassesOnPressingShiftCaps(array) {
    if (this.shift && this.caps && !this.capsLock) {
      switchCapsShift(array);
    } else if (this.shift && this.caps && this.capsLock) {
      switchCapShift(array);
      this.capsLock = false;
    } else if (!this.shift && this.caps) {
      switchUnshiftCaps(array);
    } else if (this.shift && !this.caps) {
      switchCapsUnshift(array);
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

  combinationDelete() {
    const pressed = new Set();
    document.addEventListener('keydown', (event) => {
      pressed.add(event.code);
      for (let i = 0; i < this.delete.length; i += 1) {
        if (!pressed.has(this.delete[i])) {
          return;
        }
      }
      const start = this.textarea.selectionStart;
      this.textarea.value = `${this.textarea.value.substring(0, this.textarea.selectionStart)}${this.textarea.value.substring(this.textarea.selectionEnd + 1)}`;
      this.textarea.selectionStart = start;
      this.textarea.selectionEnd = start;
      this.textarea.focus();
    });
    document.addEventListener('keyup', (event) => {
      pressed.delete(event.code);
    });
  }
}

export default Keyboard;
