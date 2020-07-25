import Easing from './services/easing';
import Util from './services/util';
import Err from './services/error';

// Record the iteration of the animation.
const animation = {};

class LoafDom {

  constructor(element) {
    this.version = '0.5.0';
    this.element = [];
    Util.selectElement.call(this, element);
    if(!this.element.length) return Err.warn(1, 'constructor()');

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
    if(!this.element.length || typeof this.element[idx] === 'undefined') return Err.warn(1, 'el()');
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
    if(!this.element.length || typeof this.element[idx] === 'undefined') return Util.error(1, 'eq()');
    else this.element = [this.element[idx]];
    return this;
  }

  /**
   * Add a class to the selected element.
   *
   * @static
   * @param {String} class names
   * @returns {Object} New class Loaf-DOM
   */
  addClass(...className) {
    const el = Util.oneSelect.call(this);
    el.classList.add(...className);
    return this;
  }

  /**
   * Clears the corresponding class of selector
   *
   * @static
   * @param {String} class names
   * @returns {Object} New class Loaf-DOM
   */
  removeClass(...className) {
    this.element.forEach((el) => {
      el.classList.remove(...className);
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
    const el = Util.oneSelect.call(this);
    const baseClassName = Util.compactSplit(el.className, ' ');
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
    if(value === null) return Util.oneSelect.call(this).getAttribute(key);
    Util.oneSelect.call(this).setAttribute(key, Util.finishValue(value));
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
    if(value === null) return Util.oneSelect.call(this).style[key];
    this.element.forEach(el => el.style[key] = Util.finishValue(value));
    return this;
  }

  /**
   * Gives various style attributes input as an object to the element.
   *
   * @static
   * @param {Object} Style Object for Key Value
   * @returns {Object} New class Loaf-DOM
   */
  styles(styleset) {
    if(typeof styleset !== 'object') return;
    this.element.forEach(el => {
      for(const key in styleset) {
        el.style[key] = Util.finishValue(styleset[key]);
      }
    });
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
          store = Util.concat(store, child);
        } else {
          const selectChildEl = Util.arrayElement([], Util.select(selectChild));
          if(selectChildEl.indexOf(child) !== -1) {
            store = Util.concat(store, child);
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
    const selectParentEl = Util.arrayElement([], Util.select(selectParent));
    let store = [];
    this.element.forEach(el => {
      store = Util.concat(store, Util.findInParent(selectParentEl, el));
    });
    return new this.constructor(store);
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
  scroll(callback) {
    this.element.forEach(el => {
      if(typeof callback === 'function') el.addEventListener('scroll', callback);
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
  click(callback) {
    this.element.forEach(el => {
      if(typeof callback === 'function') el.addEventListener('click', callback);
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
  trigger(eventName=null) {
    if(eventName === null) return this;
    this.element.forEach(el => {
      if(typeof el[eventName] === 'function') el[eventName]();
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
    const el = Util.oneSelect.call(this);
    return { top: el.offsetTop, left: el.offsetLeft, width: el.offsetWidth, height: el.offsetHeight }
  }

  /**
   * Returns or injects the width value of the element.
   *
   * @static
   * @param {String|Function} set element width value
   * @returns {Number|Object} The width value of the first element | New class Loaf-DOM
   */
  width(widthValue=null) {
    if(widthValue === null) return Util.oneSelect.call(this).clientWidth;
    this.style('width', Util.finishValue(widthValue));
    return this;
  }

  /**
   * Returns or injects the height value of the element.
   *
   * @static
   * @param {String|Function} set element height value
   * @returns {Number|Object} The height value of the first element | New class Loaf-DOM
   */
  height(heightValue=null) {
    if(heightValue === null) return Util.oneSelect.call(this).clientHeight;
    this.style('height', Util.finishValue(heightValue));
    return this;
  }

  /**
   * Responds to or injects the value of the element's top scroll position.
   *
   * @static
   * @param {Number|Function} set element scroll top value
   * @returns {Number|Object} The scroll position of the top of the element | New class Loaf-DOM
   */
  scrollTop(positionValue=null) {
    if(positionValue === null) return Util.oneSelect.call(this).scrollTop;
    Util.oneSelect.call(this).scrollTop = Util.finishValue(positionValue);
    return this;
  }

  /**
   * Responds to or injects the value of the element's left scroll position.
   *
   * @static
   * @param {Number|Function} set element scroll left value
   * @returns {Number|Object} The scroll position of the left of the element | New class Loaf-DOM
   */
  scrollLeft(positionValue=null) {
    if(positionValue === null) return Util.oneSelect.call(this).scrollLeft;
    Util.oneSelect.call(this).scrollLeft = Util.finishValue(positionValue);
    return this;
  }

  /**
   * Returns the height value of the scroll.
   *
   * @static
   * @returns {Number} The height value of the scroll
   */
  scrollHeight() {
    return Util.oneSelect.call(this).scrollHeight;
  }

  /**
   * Returns the width value of the scroll.
   *
   * @static
   * @returns {Number} The width value of the first element
   */
  scrollWidth() {
    return Util.oneSelect.call(this).scrollWidth;
  }

  /**
   * The html element is imported or injected into the element.
   *
   * @static
   * @param {String} Html element
   * @returns {String|Object} The html element or New class Loaf-DOM
   */
  html(htmlValue=null) {
    if(htmlValue === null) return Util.oneSelect.call(this).innerHTML;
    this.element.forEach(el => {
      el.innerHTML = Util.finishValue(htmlValue);
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
  text(textValue=null) {
    if(textValue === null) return Util.oneSelect.call(this).innerText;
    this.element.forEach(el => {
      el.innerText = Util.finishValue(textValue);
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
    const el = Util.oneSelect.call(this);
    while(el.firstChild) {
      el.removeChild(el.firstChild);
    }
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
    this.element.forEach(el => {
      const elementID = el.identificationNo;
      animation[elementID] = animation[elementID] ? animation[elementID] : {};
      for(let key in option) {
        const checkTarget = (key === 'scrollLeft' || key === 'scrollTop');
        const target = checkTarget ? el : el.style;
        const start = parseInt(target[key]);
        const variation = option[key] - start;
        const finish = option[key];
        let time = 0;
        let position = start;
        clearInterval(animation[elementID][key]);
        animation[elementID][key] = setInterval(() => {
          time += 1 / fps;
          position = Easing[easing](time * 100 / secDuration, time, start, variation, secDuration);
          if ((variation > 0 && position >= finish) || (variation < 0 && position <= finish)) {
            clearInterval(animation[elementID][key]);
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
   * Stops all animation effects on the selected element.
   *
   * @static
   * @returns {Object} Class Loaf-DOM
   */
  stop() {
    this.element.forEach(el => {
      const elementID = el.identificationNo;
      animation[elementID] = animation[elementID] ? animation[elementID] : {};
      for(let key in animation[elementID]) {
        clearInterval(animation[elementID][key]);
      }
    });
    return this;
  }

  /**
   * Iterates through the selected elements to perform callbacks.
   *
   * @static
   * @returns {Object} Class Loaf-DOM
   */
  forEach(callback) {
    this.element.forEach(el => {
      callback(new LoafDom([el]));
    });
    return this;
  }
}

export default (element) => {
  return new LoafDom(element);
}