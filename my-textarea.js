if (window.customElements && window.customElements.define) {

  class MyTextarea extends HTMLElement {

    constructor() {
      super();
      this._textarea = null;
      this._valueAtFocus = '';
    }

    static get observedAttributes() {
      return ['placeholder', 'value', 'maxlength', 'disabled', 'readonly', 'resize'];
    }

    connectedCallback() {
      this._render();
    }

    disconnectedCallback() {
      if (this._textarea) {
        this._textarea.removeEventListener('input', this._onInput);
        this._textarea.removeEventListener('focus', this._onFocus);
        this._textarea.removeEventListener('blur', this._onBlur);
      }
    }

    attributeChangedCallback(name, oldValue, newValue) {
      if (oldValue === newValue || !this._textarea) return;
      this._applyAttribute(name, newValue);
    }

    // Public API methods exposed to Google Web Designer.

    getValue() {
      return this._textarea ? this._textarea.value : '';
    }

    setValue(text) {
      if (this._textarea) {
        this._textarea.value = text != null ? String(text) : '';
      }
    }

    clear() {
      if (this._textarea) {
        this._textarea.value = '';
      }
    }

    focus() {
      if (this._textarea) {
        this._textarea.focus();
      }
    }

    selectRange(startIndex, endIndex) {
      if (this._textarea) {
        this._textarea.focus();
        this._textarea.setSelectionRange(Number(startIndex), Number(endIndex));
      }
    }

    selectAll() {
      if (this._textarea) {
        this._textarea.focus();
        this._textarea.select();
      }
    }

    // Internal lifecycle and attribute synchronization.

    _render() {
      if (this._textarea) return;

      this._textarea = document.createElement('textarea');
      this._textarea.className = 'my-textarea-inner';

      ['placeholder', 'value', 'maxlength', 'disabled', 'readonly', 'resize'].forEach(attr => {
        const val = this.getAttribute(attr);
        if (val !== null) this._applyAttribute(attr, val);
      });

      this._onInput = () => {
        this.dispatchEvent(new CustomEvent('input', { bubbles: false }));
      };
      this._onFocus = () => {
        this._valueAtFocus = this._textarea.value;
      };
      this._onBlur = () => {
        if (this._textarea.value !== this._valueAtFocus) {
          this.dispatchEvent(new CustomEvent('change', { bubbles: false }));
        }
      };

      this._textarea.addEventListener('input', this._onInput);
      this._textarea.addEventListener('focus', this._onFocus);
      this._textarea.addEventListener('blur', this._onBlur);

      this.appendChild(this._textarea);

      // Read host dimensions set by GWD and apply them to the inner textarea.
      // Then switch the host to fit-content so it tracks user-driven resizing.
      const w = this.offsetWidth;
      const h = this.offsetHeight;
      if (w > 0) this._textarea.style.width  = w + 'px';
      if (h > 0) this._textarea.style.height = h + 'px';

      this.style.width  = 'fit-content';
      this.style.height = 'fit-content';
    }

    _applyAttribute(name, value) {
      const ta = this._textarea;
      if (!ta) return;

      switch (name) {
        case 'placeholder':
          ta.placeholder = value || '';
          break;

        case 'value':
          ta.value = value || '';
          break;

        case 'maxlength': {
          const n = parseInt(value, 10);
          if (n > 0) {
            ta.maxLength = n;
          } else {
            ta.removeAttribute('maxlength');
          }
          break;
        }

        case 'disabled':
          ta.disabled = value !== 'false';
          break;

        case 'readonly':
          ta.readOnly = value !== 'false';
          break;

        case 'resize':
          ta.style.resize = ['both', 'vertical', 'horizontal', 'none'].includes(value)
            ? value
            : 'both';
          break;
      }
    }
  }

  customElements.define('my-textarea', MyTextarea);
}
