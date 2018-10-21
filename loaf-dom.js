import Easing from './easing';

// Record the iteration of the animation.
const animation = {};

// The unique id value to be used for the element
let identificationNo = 0;

class LoafDom {

  constructor(element) {
    this.element = [];
    this._multiSelector(element);
    this._setElemnetIdfNo();
    return this;
  }

  /**
   * Give each element a unique id value.
   *
   * @private
   */
  _setElemnetIdfNo() {
    this.element.forEach((el) => {
      if(typeof el.identificationNo === 'undefined') {
        identificationNo += 1;
        el.identificationNo = identificationNo;
      }
    });
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

    if(typeof element === 'object') {
      this.element = element;
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
   * Returns an array of the unique values of the two arrays.
   *
   * @private
   * @returns {Array} An array of unique values
   */
  _union(arr1, arr2) {
    return [...new Set([...arr1, ...arr2])];
  }

  /**
   * Returns the Select the dom element
   *
   * @static
   * @param {Number} Dom element order
   * @returns {Object} Select the dom element
   */
  el(idx) {
    return typeof idx === 'undefined' ? this.element[0] : this.element[idx];
  }

  /**
   * Returns the number of currently selected elements
   *
   * @static
   * @returns {Number} Number of currently selected elements
   */
  length() {
    return this.element.length;
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
    const baseClassName = this._compactSplit(el.className, ' ');
    const addClassNamee = [...className];
    el.className = this._union(baseClassName, addClassNamee).join(' ');
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
   * @returns {Object} New selector dom class
   */
  next() {
    return new LoafDom(this.element.map(el => el.nextElementSibling).filter(Boolean));
  }

  /**
   * Selects the prev element of the selected element.
   *
   * @static
   * @returns {Object} New selector dom class
   */
  prev() {
    return new LoafDom(this.element.map(el => el.previousElementSibling).filter(Boolean));
  }

  /**
   * Select the parent of the selected element.
   *
   * @static
   * @returns {Object} New selector dom class
   */
  parent() {
    return new LoafDom(this.element.map(el => el.parentElement).filter(Boolean));
  }

  /**
   * Select any of the child elements.
   *
   * @static
   * @param {String} Child element selector
   * @returns {Object} New selector dom class
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
    return new LoafDom(store);
  }

  /**
   * Selecting an input element among the parent elements
   *
   * @static
   * @param {String} Parent element selector
   * @returns {Object} New selector dom class
   */
  parents(selectParent) {
    const selectParentEl = this._arrayElement([], selectParent);
    let store = [];
    this.element.forEach(el => {
      store = this._concat(store, this._findInParent(selectParentEl, el));
    });
    return new LoafDom(store);
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
    this.element.forEach(el => {
      const elmeentID = el.identificationNo;
      animation[elmeentID] = animation[elmeentID] ? animation[elmeentID] : {};
      for(let key in option) {
        const checkTarget = (key === 'scrollLeft' || key === 'scrollTop');
        const target = checkTarget ? el : el.style;
        const start = parseInt(target[key]);
        const variation = option[key] - start;
        const finish = option[key];
        let time = 0;
        let position = start;
        clearInterval(animation[elmeentID][key]);
        animation[elmeentID][key] = setInterval(() => {
          time += 1 / fps;
          position = Easing[easing](time * 100 / secDuration, time, start, variation, secDuration);
          if ((variation > 0 && position >= finish) || (variation < 0 && position <= finish)) {
            clearInterval(animation[elmeentID][key]);
            target[key] = checkTarget ? finish : finish + 'px';
            if(callback) callback();
            return;
          }
          target[key] = checkTarget ? position : position + 'px';
        }, 1000 / fps);
      }
    });
  }

  /**
   * Add a scroll event.
   *
   * @static
   * @param {Function} callback function
   * @returns {Object} Class Loaf-DOM
   */
  scroll(callback=null) {
    this.element.forEach(el => {
      if(callback) el.addEventListener('scroll', callback);
      else el.scroll();
    });
    return this;
  }

  /**
   * Add a click event.
   *
   * @static
   * @param {Function} callback function
   * @returns {Object} Class Loaf-DOM
   */
  click(callback = null) {
    this.element.forEach(el => {
      if(callback) el.addEventListener('click', callback);
      else el.click();
    });
    return this;
  }

  /**
   * Event trigger.
   *
   * @static
   * @param {String} Event name to run
   * @returns {Object} Class Loaf-DOM
   */
  trigger(eventName = null) {
    if(!eventName) return this;
    this.element.forEach(el => {
      if(el[eventName]) el[eventName]();
    });
    return this;
  }

  /**
   * Returns the offset value.
   *
   * @static
   * @returns {Object} offset value
   */
  offset() {
    const el = this._oneSelect();
    return { top: el.offsetTop, left: el.offsetLeft, width: el.offsetWidth, height: el.offsetHeight }
  }

  /**
   * Returns the width value of the element.
   *
   * @static
   * @returns {Number} The width value of the first element
   */
  width() {
    return this._oneSelect().clientWidth;
  }

  /**
   * Returns the height value of the element.
   *
   * @static
   * @returns {Number} The height value of the first element
   */
  height() {
    return this._oneSelect().clientHeight;
  }

  /**
   * Returns the scroll position of the top of the element.
   *
   * @static
   * @returns {Number} The scroll position of the top of the element
   */
  scrollTop() {
    return this._oneSelect().scrollTop;
  }

  /**
   * Returns the scroll position of the left of the element.
   *
   * @static
   * @returns {Number} The scroll position of the left of the element
   */
  scrollLeft() {
    return this._oneSelect().scrollLeft;
  }

  /**
   * Returns the height value of the scroll.
   *
   * @static
   * @returns {Number} The height value of the scroll
   */
  scrollHeight() {
    return this._oneSelect().scrollHeight;
  }

  /**
   * Returns the width value of the scroll.
   *
   * @static
   * @returns {Number} The width value of the first element
   */
  scrollWidth() {
    return this._oneSelect().scrollWidth;
  }

  /**
   * The html element is imported or injected into the element.
   *
   * @static
   * @param {String} Html element
   * @returns {String|Object} The html element or class Loaf-dom
   */
  html(htmlValue = null) {
    if(!htmlValue) return this._oneSelect().innerHTML;
    this.element.forEach(el => {
      el.innerHTML = htmlValue;
    });
    return this;
  }

  /**
   * The text of the html element is imported or injected into the element.
   *
   * @static
   * @param {String} Html element
   * @returns {String|Object} Text of html element or Loaf-dom class
   */
  text(textValue = null) {
    if(!textValue) return this._oneSelect().innerText;
    this.element.forEach(el => {
      el.innerText = textValue;
    });
    return this;
  }

}

export default (element) => {
  return new LoafDom(element);
}