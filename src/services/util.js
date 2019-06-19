class Util {

  /**
   * Print an error message
   *
   * @private
   */
  static error(type, method) {
    if(type === 1) console.warn(`No elements selected by ${method}`);
  }

  /**
   * Adds a new selector array or a new selector element to an existing selector array.
   *
   * @private
   * @param {Array} Default array to save
   * @param {Array|Object} Element or array of elements
   * @returns {Array} Element selector array
   */
  static concat(beforeArr, afterArr) {
    afterArr = Array.prototype.concat.call([], afterArr);
    afterArr.forEach(el => {
      if(beforeArr.indexOf(el) === -1) beforeArr = Array.prototype.concat.call(beforeArr, el);
    });
    return beforeArr;
  }

  /**
   * Finds the element in the DOM by separating the selector string.
   *
   * @private
   * @param {String} Element selector
   * @returns {Object} Element selector
   */
  static select(element) {
    element = element.trim();
    if(/[\,\>\: \]\=]/.test(element)) {
      if(!document.querySelectorAll(element).length) element = [];
      else element = Util.arrayElement([], document.querySelectorAll(element));
    } else {
      switch(element[0]) {
        case '#' :
          element = Util.arrayElement([], document.getElementById(element.substring(1)));
          break;
        case '.' :
          if(!document.getElementsByClassName(element.substring(1)).length) element = [];
          else element = Util.arrayElement([], document.getElementsByClassName(element.substring(1)));
          break;
        default :
          if(!document.getElementsByTagName(element).length) element = [];
          else element = Util.arrayElement([], document.getElementsByTagName(element));
      }
    }
    return element;
  }


  /**
   * Put selected element in class.
   *
   * @private
   * @param {String} Element selector
   */
  static selectElement(element) {
    if(element === window || element === document) {
      this.element = Util.arrayElement([], element);
    } else if(typeof element === 'object') {
      this.element = element;
    }

    if(typeof element === 'string') {
      this.element = Util.select(element);
    }
  }

  /**
   * Returns an array of the corresponding elements of the selector
   *
   * @private
   * @param {Array} Default array to save
   * @param {String} Element selector
   * @returns {Array} Element selector array
   */
  static arrayElement(store, element) {
    if(!element) return store;
    if(!element.length) return Util.concat(store, element);
    for(const target of element) {
      store = Util.concat(store, target);
    }
    return store;
  }

  /**
   * Find the parent element from the child element.
   *
   * @private
   * @param {Array} Array of parent elements
   * @param {Object} Child element
   * @returns {Array|Null} Returns the parent if there is a parent element, or null if there is no parent
   */
  static findInParent(parent, children) {
    let cacheParent = children.parentNode;
    while(cacheParent !== null) {
      if(parent.indexOf(cacheParent) !== -1) return cacheParent;
      cacheParent = cacheParent.parentNode;
    }
    return null;
  }


  /**
   * If the value is a function, it executes the function and returns the return value.
   *
   * @private
   * @param {String|Number|Function} Value or response value
   * @param {Boolean} For Number, the default unit is px
   * @returns {String|Number} Final value
   */
  static finishValue(value, defaultPx=false) {
    value = typeof value === 'function' ? value() : value;
    if(defaultPx) value = typeof value === 'number' ? value + 'px' : value;
    return value;
  }

  /**
   * Returns the first of the selected elements.
   *
   * @private
   * @param {Object} Loaf-dom class
   * @returns {Object} First element selector
   */
  static oneSelect() {
    return this.element.length ? this.element[0] : this.element;
  }

  /**
   * Divide the specified string into an array, and then exclude the false element.
   *
   * @private
   * @param {String} Strings before division into an array
   * @param {String} String to divide
   * @returns {Array} Compact arrangement
   */
  static compactSplit(str, value) {
    return str.split(value).filter(Boolean);
  }

  /**
   * Returns an array of the unique values of the two arrays.
   *
   * @private
   * @returns {Array} An array of unique values
   */
  static union(arr1, arr2) {
    return [...new Set([...arr1, ...arr2])];
  }
}

export default Util