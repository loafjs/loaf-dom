// version. 0.0.18
import Easing from './easing';

class LoafDom {

  constructor(element) {
    this.element = [];
    this.animation = {};
    this._multiSelector(element);
  }

  /**
   * Select the dom selector for the inherited relationship entered as blank
   *
   * @private
   * @param {String} Element selector
   */
  _inheritSelector(selector) {
    const el = selector.split(' ');
    const len = el.length;

    if(len === 1) {
      this.element = this._arrayElement(this.element, el[0]);
    }

    if(len > 1) {
      const pass = this._searchInParent(el, len);
      this.element = this._concat(this.element, pass.filter(Boolean));
    }
  }

  /**
   * Find child elements that satisfy all inheritance criteria.
   *
   * @private
   * @param {Array} Selectors of inheritance
   * @param {Number} Number of selectors of inheritance
   * @returns {Array} Selector with specified parent
   */
  _searchInParent(element, len) {
    let pass = [];
    this._roof(len-1, (i) => {
      const parentEl = this._arrayElement([], element[len-2-i]);
      const childrenEl = this._arrayElement([], element[len-1-i]);
      this._roof(childrenEl.length, (i) => {
        const isParent = this._findInParent(parentEl, childrenEl[i]);
        if(pass[i] !== false && isParent) pass[i] = this._arrayElement([], element[len-1])[i];
        else pass[i] = false;
      });
    });
    return pass;
  }

  /**
   * Find the parent element from the child element.
   *
   * @private
   * @param {Array} Array of parent elements
   * @param {Object} Child element
   * @returns {Array|Null} Returns the parent if there is a parent element, or null if there is no parent
   */
  _findInParent(parent, children) {
    let cacheParent = children.parentNode;
    while(cacheParent !== null) {
      if(parent.indexOf(cacheParent) !== -1) return cacheParent;
      cacheParent = cacheParent.parentNode;
    }
    return null;
  }

  /**
   * Returns an array of the corresponding elements of the selector
   *
   * @private
   * @param {Array} Default array to save
   * @param {String} Element selector
   * @returns {Array} Element selector array
   */
  _arrayElement(store, element) {
    const select = this._select(element);
    if(!select) return store;
    if(!select.length) return this._concat(store, select);
    this._roof(select.length, i => store = this._concat(store, select[i]));
    return store;
  }

  /**
   * Find the element by dividing the selector separated by commas.
   *
   * @private
   * @param {String} Element selector
   */
  _multiSelector(element) {
    if(typeof element === 'string') {
      const el = element.split(',');
      el.forEach(selectorStr => this._inheritSelector(selectorStr.trim()));
    }
  }

  /**
   * Finds the element in the DOM by separating the selector string.
   *
   * @private
   * @param {String} Element selector
   * @returns {Object} Element selector
   */
  _select(element) {
    if(typeof element !== 'string') return;
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

  /**
   * Returns the first of the selected elements.
   *
   * @private
   * @returns {Object} First element selector
   */
   _oneSelect() {
    return this.element[0];
  }

  /**
   * Perform a loop.
   *
   * @private
   * @param {Number} Number of iterations
   * @param {Functions} Functions to be repeated
   */
  _roof(len, fnc) {
    let i;
    for(i=0; i<len; i++) {
      fnc(i);
    }
  }

  /**
   * Adds a new selector array or a new selector element to an existing selector array.
   *
   * @private
   * @param {Array} Default array to save
   * @param {Array|Object} Element or array of elements
   * @returns {Array} Element selector array
   */
  _concat(beforeArr, afterArr) {
    afterArr = Array.prototype.concat.call([], afterArr);
    afterArr.forEach(el => {
      if(beforeArr.indexOf(el) === -1) beforeArr = Array.prototype.concat.call(beforeArr, el);
    });
    return beforeArr;
  }

  /**
   * Divide the specified string into an array, and then exclude the false element.
   *
   * @private
   * @param {String} Strings before division into an array
   * @param {String} String to divide
   * @returns {Array} Compact arrangement
   */
  _compactSplit(str, value) {
    return str.split(value).filter(Boolean);
  }

  /**
   * Select the element of the selector in that sequence.
   *
   * @static
   * @param {Number} Order of elements to select
   * @returns {Object} Class Loaf-DOM
   */
  eq(idx) {
    this.element = this.element.splice(idx, 1);
    return this;
  }

  /**
   * Add a class to the selected element.
   *
   * @static
   * @param {Array} An array of class names
   * @returns {Object} Class Loaf-DOM
   */
  addClass(...className) {
    const el = this._oneSelect();
    el.className = this._compactSplit(el.className, ' ').concat(...className).join(' ');
    return this;
  }

  /**
   * Clears the corresponding class of selector
   *
   * @static
   * @param {String} Class name
   * @returns {Object} Class Loaf-DOM
   */
  removeClass(className) {
    const arrayClassName = this._compactSplit(className, ' ');
    this.element.forEach((el) => {
      el.className = this._compactSplit(el.className, ' ')
        .filter(str => arrayClassName.indexOf(str) === -1)
        .join(' ');
    });
    return this;
  }

  /**
   * Invoke or set the property value
   *
   * @static
   * @param {String} Attribute Key Name
   * @param {String|Null} Attribute Value
   * @returns {Object|String} Class Loaf-DOM or Attribute Value
   */
  attr(key, value=null) {
    if(!value) return this._oneSelect().getAttribute(key);
    this._oneSelect().setAttribute(key, value);
    return this;
  }

  /**
   * Gives or reads style attributes to the element.
   *
   * @static
   * @param {String} Style Key Name
   * @param {String|Null} Style Value
   * @returns {Object|String} Class Loaf-DOM or Style Value
   */
  style(key, value=null) {
    if(!value) return this._oneSelect().style[key];
    this.element.forEach(el => el.style[key] = value );
    return this;
  }

  /**
   * Selects the next element of the selected element.
   *
   * @static
   * @returns {Object} Class Loaf-DOM
   */
  next() {
    this.element = this.element.map(el => el.nextElementSibling).filter(Boolean);
    return this;
  }

  /**
   * Selects the prev element of the selected element.
   *
   * @static
   * @returns {Object} Class Loaf-DOM
   */
  prev() {
    this.element = this.element.map(el => el.previousElementSibling).filter(Boolean);
    return this;
  }

  /**
   * Select the parent of the selected element.
   *
   * @static
   * @returns {Object} Class Loaf-DOM
   */
  parent() {
    this.element = this.element.map(el => el.parentElement).filter(Boolean);
    return this;
  }

  /**
   * Select any of the child elements.
   *
   * @static
   * @param {String} Child element selector
   * @returns {Object} Class Loaf-DOM
   */
  children(selectChild) {
    const selectChildEl = this._arrayElement([], selectChild);
    let store = [];
    this.element.forEach(el => {
      const child = el.children;
      this._roof(child.length, i => {
        if(!selectChild) return store = this._concat(store, child[i]);
        if(selectChildEl.indexOf(child[i]) !== -1) store = this._concat(store, child[i]);
      });
    });
    this.element = store;
    return this;
  }

  /**
   * Selecting an input element among the parent elements
   *
   * @static
   * @param {String} Parent element selector
   * @returns {Object} Class Loaf-DOM
   */
  parents(selectParent) {
    const selectParentEl = this._arrayElement([], selectParent);
    let store = [];
    this.element.forEach(el => {
      store = this._concat(store, this._findInParent(selectParentEl, el));
    });
    this.element = store;
    return this;
  }

  /**
   * It gives dynamic change.
   *
   * @static
   * @param {Object} Change the key and value
   * @param {Number} Time to change
   * @param {Function} callback function
   */
  animate(option, duration, easing='easeOutSine', callback=null) {
    const fps = 60;
    const secDuration = duration / 1000;

    for(let ani in this.animation) clearInterval(this.animation[ani]);

    this.element.forEach(el => {
      for(let key in option) {
        const checkTarget = (key === 'scrollLeft' || key === 'scrollTop');
        const target = checkTarget ? el : el.style;
        const start = parseInt(target[key]);
        const finish = start + option[key];
        let time = 0;
        let position = start;

        this.animation.key = setInterval(() => {
          time += 1 / fps;
          position = Easing[easing](time * 100 / secDuration, time, start, finish, secDuration);
          if (position >= finish) {
            clearInterval(this.animation.key);
            target[key] = checkTarget ? finish : finish + 'px';
            if(callback) callback();
            return;
          }
          target[key] = checkTarget ? position : position + 'px';
        }, 1000 / fps);
      }
    });
  }

}

export default (element) => {
  return new LoafDom(element);
}