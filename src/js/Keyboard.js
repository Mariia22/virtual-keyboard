class Keyboard {
  constructor(lang, keys) {
    this.keys = keys;
    this.lang = lang;
    this.text = '';
    this.wrapper = '';
    this.textarea = '';
    this.content = '';
  }

  buildKeyboard() {
    this.wrapper = this.createDomElement('div', 'keyboard__wrapper');
    this.textarea = this.createDomElement('textarea', 'keyboard__textarea');
    this.content = this.createDomElement('div', 'keyboard__content');
    this.appendElements();
    const langObject = this.keys[this.lang];
    for (const key of Object.keys(langObject)) {
      this.createKeysButton(key, langObject[key]);
    }
  }

  createDomElement(element, ...classes) {
    const node = document.createElement(element);
    node.classList.add(...classes);
    return node;
  }

  appendElements() {
    this.wrapper.append(this.textarea);
    this.wrapper.append(this.content);
    document.body.append(this.wrapper);
  }

  createKeysButton(key, value) {
    const button = this.createDomElement('button', 'keyboard__key');
    if (key.startsWith('+')) {
      button.innerHTML = +key;
    } else if (key.startsWith('_')) {
      button.innerHTML = key.slice(1, key.length);
    } else {
      button.innerHTML = key;
    }
    button.setAttribute('data-code', value);
    this.content.append(button);
  }
}

export default Keyboard;
