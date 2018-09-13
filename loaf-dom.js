// version. 0.0.11

class LoafDom {

  constructor(element) {
    this.element = [];
    this._multiSelector(element);
  }

  _inheritSelector(selector) {
    const el = selector.split(' ');
    const len = el.length

    if(len === 1) {
      this.element = this._arrayElement(this.element, el[0]);
      return this;
    }

    if(len > 1) {
      let pass = [];
      this._roof(len-1, (i) => {
        const parentEl = this._arrayElement([], el[len-2-i]);
        const childrenEl = this._arrayElement([], el[len-1-i]);
        this._roof(childrenEl.length, (i) => {
          const isParent = this._findInParent(parentEl, childrenEl[i]);
          if(pass[i] !== false && isParent) pass[i] = this._arrayElement([], el[len-1])[i];
          else pass[i] = false;
        });
      });
      this.element = this._concat(this.element, pass.filter(Boolean));
      return this;
    }
  }

  _findInParent(parent, children) {
    let cacheParent = children.parentNode;
    while(cacheParent !== null) {
      if(parent.indexOf(cacheParent) !== -1) return cacheParent;
      cacheParent = cacheParent.parentNode;
    }
    return null;
  }

  _arrayElement(store, element) {
    const select = this._select(element);
    if(select.length) {
      this._roof(select.length, (i) => {
        store = this._concat(store, select[i]);
      });
    } else {
      store = this._concat(store, select);
    }
    return store;
  }

  _multiSelector(element) {
    if(typeof element === 'string') {
      const el = element.split(',');
      el.forEach((selectorStr) => {
        const trimSelector = selectorStr.trim();
        this._inheritSelector(trimSelector);
      });
    }
  }

  _select(element) {
    switch(element[0]) {
      case '#' :
        element = document.getElementById(element.substring(1));
        break;
      case '.' :
        element = document.getElementsByClassName(element.substring(1));
        break;
      default :
        element = document.getElementsByTagName(element);
    }
    return element;
  }

  _oneSelect() {
    return this.element[0];
  }

  _roof(len, fnc) {
    let i;
    for(i=0; i<len; i++) {
      fnc(i);
    }
  }

  _concat(beforeArr, afterArr) {
    return Array.prototype.concat.call(beforeArr, afterArr);
  }

  _compactSplit(str, value) {
    return str.split(value).filter(Boolean);
  }

  eq(idx) {
    this.element = this.element.splice(idx, 1);
    return this;
  }

  addClass(...className) {
    const el = this._oneSelect();
    el.className = this._compactSplit(el.className, ' ').concat(...className).join(' ');
    return this;
  }

  removeClass(className) {
    const arrayClassName = this._compactSplit(className, ' ');
    this._roof(this.element.length, (i) => {
      const el = this.element[i];
      el.className = this._compactSplit(el.className, ' ').filter((str) => arrayClassName.indexOf(str) === -1).join(' ');
    });
    return this;
  }

  attr(key, value = false) {
    if(!value) return this._oneSelect().getAttribute(key);
    this._oneSelect().setAttribute(key, value);
    return this;
  }

  style(key, value = false) {
    if(!value) return this._oneSelect().style[key];
    this._roof(this.element.length, (i) => {
      this.element[i].style[key] = value;
    });
    return this;
  }

}

export default (element) => {
  return new LoafDom(element);
}