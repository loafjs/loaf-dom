import velocity from 'velocity-animate';

/**
 * Print an error message
 *
 * @private
 */
function _error(type, method) {
  if(type === 1) console.warn(`No elements selected by ${method}`);
};


/**
 * Adds a new selector array or a new selector element to an existing selector array.
 *
 * @private
 * @param {Array} Default array to save
 * @param {Array|Object} Element or array of elements
 * @returns {Array} Element selector array
 */
function _concat(beforeArr, afterArr) {
  afterArr = Array.prototype.concat.call([], afterArr);
  afterArr.forEach(el => {
    if(beforeArr.indexOf(el) === -1) beforeArr = Array.prototype.concat.call(beforeArr, el);
  });
  return beforeArr;
};

/**
 * Finds the element in the DOM by separating the selector string.
 *
 * @private
 * @param {String} Element selector
 * @returns {Object} Element selector
 */
function _select(element) {
  element = element.trim();
  if(/[\,\>\: \]\=]/.test(element)) {
    if(!document.querySelectorAll(element).length) element = [];
    else element = _arrayElement([], document.querySelectorAll(element));
  } else {
    switch(element[0]) {
      case '#' :
        element = _arrayElement([], document.getElementById(element.substring(1)));
        break;
      case '.' :
        if(!document.getElementsByClassName(element.substring(1)).length) element = [];
        else element = _arrayElement([], document.getElementsByClassName(element.substring(1)));
        break;
      default :
        if(!document.getElementsByTagName(element).length) element = [];
        else element = _arrayElement([], document.getElementsByTagName(element));
    }
  }
  return element;
};


/**
 * Put selected element in class.
 *
 * @private
 * @param {String} Element selector
 */
function _selectElement(element) {
  if(element === window || element === document) {
    this.element = _arrayElement([], element);
  } else if(typeof element === 'object') {
    this.element = element;
  }

  if(typeof element === 'string') {
    this.element = _select(element);
  }
};

/**
 * Returns an array of the corresponding elements of the selector
 *
 * @private
 * @param {Array} Default array to save
 * @param {String} Element selector
 * @returns {Array} Element selector array
 */
function _arrayElement(store, element) {
  // const select = _select(element);
  if(!element) return store;
  if(!element.length) return _concat(store, element);
  for(const target of element) {
    store = _concat(store, target);
  }
  return store;
};

/**
 * Find the parent element from the child element.
 *
 * @private
 * @param {Array} Array of parent elements
 * @param {Object} Child element
 * @returns {Array|Null} Returns the parent if there is a parent element, or null if there is no parent
 */
function _findInParent(parent, children) {
  let cacheParent = children.parentNode;
  while(cacheParent !== null) {
    if(parent.indexOf(cacheParent) !== -1) return cacheParent;
    cacheParent = cacheParent.parentNode;
  }
  return null;
};


/**
 * If the value is a function, it executes the function and returns the return value.
 *
 * @private
 * @param {String|Number|Function} Value or response value
 * @param {Boolean} For Number, the default unit is px
 * @returns {String|Number} Final value
 */
function _finishValue(value, defaultPx=false) {
  value = typeof value === 'function' ? value() : value;
  if(defaultPx) value = typeof value === 'number' ? value + 'px' : value;
  return value;
};

/**
 * Returns the first of the selected elements.
 *
 * @private
 * @param {Object} Loaf-dom class
 * @returns {Object} First element selector
 */
 function _oneSelect() {
  return this.element.length ? this.element[0] : this.element;
};

/**
 * Divide the specified string into an array, and then exclude the false element.
 *
 * @private
 * @param {String} Strings before division into an array
 * @param {String} String to divide
 * @returns {Array} Compact arrangement
 */
function _compactSplit(str, value) {
  return str.split(value).filter(Boolean);
};

/**
 * Returns an array of the unique values of the two arrays.
 *
 * @private
 * @returns {Array} An array of unique values
 */
function _union(arr1, arr2) {
  return [...new Set([...arr1, ...arr2])];
};

class LoafDom {

  constructor(element) {
    this.version = '0.3.8';
    this.element = [];
    _selectElement.call(this, element);
    if(!this.element.length) return _error(1, 'constructor()');

    return this;
  }

  /**
   * Returns the Select the dom element
   *
   * @static
   * @param {Number} Dom element order
   * @returns {Object} Select the dom element
   */
  el(idx) {
    idx = typeof idx === 'number' ? idx : 0;
    if(!this.element.length || typeof this.element[idx] === 'undefined') return _error(1, 'el()');
    return this.element[idx];
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
   * @returns {Object} New class Loaf-DOM
   */
  eq(idx) {
    idx = typeof idx === 'number' ? idx : 0;
    if(!this.element.length || typeof this.element[idx] === 'undefined') return _error(1, 'eq()');
    else this.element = [this.element[idx]];
    return this;
  }

  /**
   * Add a class to the selected element.
   *
   * @static
   * @param {Array} An array of class names
   * @returns {Object} New class Loaf-DOM
   */
  addClass(...className) {
    const el = _oneSelect.call(this);
    const baseClassName = _compactSplit(el.className, ' ');
    const addClassNamee = [...className];
    el.className = _union(baseClassName, addClassNamee).join(' ');
    return this;
  }

  /**
   * Clears the corresponding class of selector
   *
   * @static
   * @param {String} Class name
   * @returns {Object} New class Loaf-DOM
   */
  removeClass(className) {
    const arrayClassName = _compactSplit(className, ' ');
    this.element.forEach((el) => {
      el.className = _compactSplit(el.className, ' ')
        .filter(str => arrayClassName.indexOf(str) === -1)
        .join(' ');
    });
    return this;
  }

  /**
   * Whether the selected element has a received class name
   *
   * @static
   * @param {String} Class name
   * @returns {Boolean} Whether you have the class
   */
  hasClass(className) {
    const el = _oneSelect.call(this);
    const baseClassName = _compactSplit(el.className, ' ');
    return baseClassName.indexOf(className) !== -1;
  }

  /**
   * Invoke or set the property value
   *
   * @static
   * @param {String} Attribute Key Name
   * @param {String|Null} Attribute Value
   * @returns {Object|String} New class Loaf-DOM or Attribute Value
   */
  attr(key, value=null) {
    if(!value) return _oneSelect.call(this).getAttribute(key);
    _oneSelect.call(this).setAttribute(key, _finishValue(value));
    return this;
  }

  /**
   * Gives or reads style attributes to the element.
   *
   * @static
   * @param {String} Style Key Name
   * @param {String|Null} Style Value
   * @returns {Object|String} New class Loaf-DOM or Style Value
   */
  style(key, value=null) {
    if(!value) return _oneSelect.call(this).style[key];
    this.element.forEach(el => el.style[key] = _finishValue(value, true));
    return this;
  }

  /**
   * Selects the next element of the selected element.
   *
   * @static
   * @returns {Object} New selector dom class
   */
  next() {
    return new this.constructor(this.element.map(el => el.nextElementSibling).filter(Boolean));
  }

  /**
   * Selects the prev element of the selected element.
   *
   * @static
   * @returns {Object} New selector dom class
   */
  prev() {
    return new this.constructor(this.element.map(el => el.previousElementSibling).filter(Boolean));
  }

  /**
   * Select the parent of the selected element.
   *
   * @static
   * @returns {Object} New selector dom class
   */
  parent() {
    return new this.constructor(this.element.map(el => el.parentElement).filter(Boolean));
  }

  /**
   * Select any of the child elements.
   *
   * @static
   * @param {String} Child element selector
   * @returns {Object} New selector dom class
   */
  children(selectChild) {
    let store = [];
    this.element.forEach(el => {
      for(const child of el.children) {
        if(!selectChild) {
          store = _concat(store, child);
        } else {
          const selectChildEl = _arrayElement([], _select(selectChild));
          if(selectChildEl.indexOf(child) !== -1) {
            store = _concat(store, child);
          }
        }
      }
    });
    return new this.constructor(store);
  }

  /**
   * Selecting an input element among the parent elements
   *
   * @static
   * @param {String} Parent element selector
   * @returns {Object} New selector dom class
   */
  parents(selectParent) {
    const selectParentEl = _arrayElement([], _select(selectParent));
    let store = [];
    this.element.forEach(el => {
      store = _concat(store, _findInParent(selectParentEl, el));
    });
    return new this.constructor(store);
  }

  /**
   * It gives dynamic change.
   *
   * @static
   * @param {Object} Velocity Arguments
   * @returns {Object} New class Loaf-DOM
   */
  animate(...attr) {
    this.element.forEach(el => {
      velocity(el, ...attr);
    });
    return this;
  }

  /**
   * Stops all animation effects on the selected element.
   *
   * @static
   * @returns {Object} New class Loaf-DOM
   */
  stop() {
    this.element.forEach(el => {
      velocity(el, 'stop');
    });
    return this;
  }

  /**
   * Add a event.
   *
   * @static
   * @param {Function} add event name
   * @param {Function} callback function
   * @param {Object} Options
   * @returns {Object} New class Loaf-DOM
   */
  event(eventName, callback, options) {
    this.element.forEach(el => {
      el.addEventListener(eventName, callback, options);
    });
    return this;
  }

  /**
   * Add a scroll event.
   *
   * @static
   * @param {Function} callback function
   * @returns {Object} New class Loaf-DOM
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
   * @returns {Object} New class Loaf-DOM
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
   * @returns {Object} New class Loaf-DOM
   */
  trigger(eventName = null) {
    if(!eventName) return this;
    this.element.forEach(el => {
      if(typeof el[eventName] !== 'undefined') el[eventName]();
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
    const el = _oneSelect.call(this);
    return { top: el.offsetTop, left: el.offsetLeft, width: el.offsetWidth, height: el.offsetHeight }
  }

  /**
   * Returns or injects the width value of the element.
   *
   * @static
   * @param {String|Function} set element width value
   * @returns {Number|Object} The width value of the first element | New class Loaf-DOM
   */
  width(widthValue = null) {
    if(!widthValue) return _oneSelect.call(this).clientWidth;
    this.style('width', _finishValue(widthValue, true));
    return this;
  }

  /**
   * Returns or injects the height value of the element.
   *
   * @static
   * @param {String|Function} set element height value
   * @returns {Number|Object} The height value of the first element | New class Loaf-DOM
   */
  height(heightValue = null) {
    if(!heightValue) return _oneSelect.call(this).clientHeight;
    this.style('height', _finishValue(heightValue, true));
    return this;
  }

  /**
   * Responds to or injects the value of the element's top scroll position.
   *
   * @static
   * @param {Number|Function} set element scroll top value
   * @returns {Number|Object} The scroll position of the top of the element | New class Loaf-DOM
   */
  scrollTop(positionValue = null) {
    if(!positionValue) return _oneSelect.call(this).scrollTop;
    _oneSelect.call(this).scrollTop = _finishValue(positionValue);
    return this;
  }

  /**
   * Responds to or injects the value of the element's left scroll position.
   *
   * @static
   * @param {Number|Function} set element scroll left value
   * @returns {Number|Object} The scroll position of the left of the element | New class Loaf-DOM
   */
  scrollLeft(positionValue = null) {
    if(!positionValue) return _oneSelect.call(this).scrollLeft;
    _oneSelect.call(this).scrollLeft = _finishValue(positionValue);
    return this;
  }

  /**
   * Returns the height value of the scroll.
   *
   * @static
   * @returns {Number} The height value of the scroll
   */
  scrollHeight() {
    return _oneSelect.call(this).scrollHeight;
  }

  /**
   * Returns the width value of the scroll.
   *
   * @static
   * @returns {Number} The width value of the first element
   */
  scrollWidth() {
    return _oneSelect.call(this).scrollWidth;
  }

  /**
   * The html element is imported or injected into the element.
   *
   * @static
   * @param {String} Html element
   * @returns {String|Object} The html element or New class Loaf-DOM
   */
  html(htmlValue = null) {
    if(!htmlValue) return _oneSelect.call(this).innerHTML;
    this.element.forEach(el => {
      el.innerHTML = _finishValue(htmlValue);
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
    if(!textValue) return _oneSelect.call(this).innerText;
    this.element.forEach(el => {
      el.innerText = _finishValue(textValue);
    });
    return this;
  }

  /**
   * Remove all child elements.
   *
   * @static
   * @returns {Object} Loaf-dom class
   */
  removeAllChild() {
    const el = _oneSelect.call(this);
    while(el.firstChild) {
      el.removeChild(el.firstChild);
    }
    return this;
  }
}

export default (element) => {
  return new LoafDom(element);
}