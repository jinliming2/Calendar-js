/**
 * Selector.js - https://github.com/jinliming2/Calendar-js
 * Created by Liming on 2018/10/14.
 */
import { TPL_selector } from './templates.js';

export default class extends HTMLElement {
  constructor() {
    super();
    this._root = this.attachShadow({ mode: 'open' });
    const body = document.importNode(TPL_selector.content, true);
    this._initEvents(body);
    this._root.appendChild(body);
  }

  _initEvents(body) {
    body.getElementById('left').addEventListener('click', e => {
      this.dispatchEvent(new CustomEvent('left', {
        bubbles: false,
        cancelable: true,
        composed: false,
        detail: { origin: e },
      }));
    });
    body.getElementById('down').addEventListener('click', e => {
      this.dispatchEvent(new CustomEvent('down', {
        bubbles: false,
        cancelable: true,
        composed: false,
        detail: { origin: e },
      }));
    });
    body.getElementById('right').addEventListener('click', e => {
      this.dispatchEvent(new CustomEvent('right', {
        bubbles: false,
        cancelable: true,
        composed: false,
        detail: { origin: e },
      }));
    });
  }
}
