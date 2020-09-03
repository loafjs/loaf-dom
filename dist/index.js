"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _easing = _interopRequireDefault(require("./services/easing"));

var _util = _interopRequireDefault(require("./services/util"));

var _error = _interopRequireDefault(require("./services/error"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// Record the iteration of the animation.
var animation = {};

var LoafDom = /*#__PURE__*/function () {
  function LoafDom(element) {
    _classCallCheck(this, LoafDom);

    this.version = '0.5.0';
    this.element = [];

    _util["default"].selectElement.call(this, element);

    if (!this.element.length) return _error["default"].warn(1, 'constructor()');
    return this;
  }
  /**
   * Returns the Select the dom element
   *
   * @static
   * @param {Number} Dom element order
   * @returns {Object} Select the dom element
   */


  _createClass(LoafDom, [{
    key: "el",
    value: function el(idx) {
      idx = typeof idx === 'number' ? idx : 0;
      if (!this.element.length || typeof this.element[idx] === 'undefined') return _error["default"].warn(1, 'el()');
      return this.element[idx];
    }
    /**
     * Returns the number of currently selected elements
     *
     * @static
     * @returns {Number} Number of currently selected elements
     */

  }, {
    key: "length",
    value: function length() {
      return this.element.length;
    }
    /**
     * Select the element of the selector in that sequence.
     *
     * @static
     * @param {Number} Order of elements to select
     * @returns {Object} New class Loaf-DOM
     */

  }, {
    key: "eq",
    value: function eq(idx) {
      idx = typeof idx === 'number' ? idx : 0;
      if (!this.element.length || typeof this.element[idx] === 'undefined') return _util["default"].error(1, 'eq()');else this.element = [this.element[idx]];
      return this;
    }
    /**
     * Add a class to the selected element.
     *
     * @static
     * @param {String} class names
     * @returns {Object} New class Loaf-DOM
     */

  }, {
    key: "addClass",
    value: function addClass() {
      var _el$classList;

      var el = _util["default"].oneSelect.call(this);

      (_el$classList = el.classList).add.apply(_el$classList, arguments);

      return this;
    }
    /**
     * Clears the corresponding class of selector
     *
     * @static
     * @param {String} class names
     * @returns {Object} New class Loaf-DOM
     */

  }, {
    key: "removeClass",
    value: function removeClass() {
      for (var _len = arguments.length, className = new Array(_len), _key = 0; _key < _len; _key++) {
        className[_key] = arguments[_key];
      }

      this.element.forEach(function (el) {
        var _el$classList2;

        (_el$classList2 = el.classList).remove.apply(_el$classList2, className);
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

  }, {
    key: "hasClass",
    value: function hasClass(className) {
      var el = _util["default"].oneSelect.call(this);

      var baseClassName = _util["default"].compactSplit(el.className, ' ');

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

  }, {
    key: "attr",
    value: function attr(key) {
      var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      if (value === null) return _util["default"].oneSelect.call(this).getAttribute(key);

      _util["default"].oneSelect.call(this).setAttribute(key, _util["default"].finishValue(value));

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

  }, {
    key: "style",
    value: function style(key) {
      var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      if (value === null) return _util["default"].oneSelect.call(this).style[key];
      this.element.forEach(function (el) {
        return el.style[key] = _util["default"].finishValue(value);
      });
      return this;
    }
    /**
     * Gives various style attributes input as an object to the element.
     *
     * @static
     * @param {Object} Style Object for Key Value
     * @returns {Object} New class Loaf-DOM
     */

  }, {
    key: "styles",
    value: function styles(styleset) {
      if (_typeof(styleset) !== 'object') return;
      this.element.forEach(function (el) {
        for (var key in styleset) {
          el.style[key] = _util["default"].finishValue(styleset[key]);
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

  }, {
    key: "next",
    value: function next() {
      return new this.constructor(this.element.map(function (el) {
        return el.nextElementSibling;
      }).filter(Boolean));
    }
    /**
     * Selects the prev element of the selected element.
     *
     * @static
     * @returns {Object} New selector dom class
     */

  }, {
    key: "prev",
    value: function prev() {
      return new this.constructor(this.element.map(function (el) {
        return el.previousElementSibling;
      }).filter(Boolean));
    }
    /**
     * Select the parent of the selected element.
     *
     * @static
     * @returns {Object} New selector dom class
     */

  }, {
    key: "parent",
    value: function parent() {
      return new this.constructor(this.element.map(function (el) {
        return el.parentElement;
      }).filter(Boolean));
    }
    /**
     * Select any of the child elements.
     *
     * @static
     * @param {String} Child element selector
     * @returns {Object} New selector dom class
     */

  }, {
    key: "children",
    value: function children(selectChild) {
      var store = [];
      this.element.forEach(function (el) {
        var _iterator = _createForOfIteratorHelper(el.children),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var child = _step.value;

            if (!selectChild) {
              store = _util["default"].concat(store, child);
            } else {
              var selectChildEl = _util["default"].arrayElement([], _util["default"].select(selectChild));

              if (selectChildEl.indexOf(child) !== -1) {
                store = _util["default"].concat(store, child);
              }
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
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

  }, {
    key: "parents",
    value: function parents(selectParent) {
      var selectParentEl = _util["default"].arrayElement([], _util["default"].select(selectParent));

      var store = [];
      this.element.forEach(function (el) {
        store = _util["default"].concat(store, _util["default"].findInParent(selectParentEl, el));
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

  }, {
    key: "event",
    value: function event(eventName, callback, options) {
      this.element.forEach(function (el) {
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

  }, {
    key: "scroll",
    value: function scroll(callback) {
      this.element.forEach(function (el) {
        if (typeof callback === 'function') el.addEventListener('scroll', callback);else el.scroll();
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

  }, {
    key: "click",
    value: function click(callback) {
      this.element.forEach(function (el) {
        if (typeof callback === 'function') el.addEventListener('click', callback);else el.click();
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

  }, {
    key: "trigger",
    value: function trigger() {
      var eventName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      if (eventName === null) return this;
      this.element.forEach(function (el) {
        if (typeof el[eventName] === 'function') el[eventName]();
      });
      return this;
    }
    /**
     * Returns the offset value.
     *
     * @static
     * @returns {Object} offset value
     */

  }, {
    key: "offset",
    value: function offset() {
      var el = _util["default"].oneSelect.call(this);

      return {
        top: el.offsetTop,
        left: el.offsetLeft,
        width: el.offsetWidth,
        height: el.offsetHeight
      };
    }
    /**
     * Returns or injects the width value of the element.
     *
     * @static
     * @param {String|Function} set element width value
     * @returns {Number|Object} The width value of the first element | New class Loaf-DOM
     */

  }, {
    key: "width",
    value: function width() {
      var widthValue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      if (widthValue === null) return _util["default"].oneSelect.call(this).clientWidth;
      this.style('width', _util["default"].finishValue(widthValue));
      return this;
    }
    /**
     * Returns or injects the height value of the element.
     *
     * @static
     * @param {String|Function} set element height value
     * @returns {Number|Object} The height value of the first element | New class Loaf-DOM
     */

  }, {
    key: "height",
    value: function height() {
      var heightValue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      if (heightValue === null) return _util["default"].oneSelect.call(this).clientHeight;
      this.style('height', _util["default"].finishValue(heightValue));
      return this;
    }
    /**
     * Responds to or injects the value of the element's top scroll position.
     *
     * @static
     * @param {Number|Function} set element scroll top value
     * @returns {Number|Object} The scroll position of the top of the element | New class Loaf-DOM
     */

  }, {
    key: "scrollTop",
    value: function scrollTop() {
      var positionValue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      if (positionValue === null) return _util["default"].oneSelect.call(this).scrollTop;
      _util["default"].oneSelect.call(this).scrollTop = _util["default"].finishValue(positionValue);
      return this;
    }
    /**
     * Responds to or injects the value of the element's left scroll position.
     *
     * @static
     * @param {Number|Function} set element scroll left value
     * @returns {Number|Object} The scroll position of the left of the element | New class Loaf-DOM
     */

  }, {
    key: "scrollLeft",
    value: function scrollLeft() {
      var positionValue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      if (positionValue === null) return _util["default"].oneSelect.call(this).scrollLeft;
      _util["default"].oneSelect.call(this).scrollLeft = _util["default"].finishValue(positionValue);
      return this;
    }
    /**
     * Returns the height value of the scroll.
     *
     * @static
     * @returns {Number} The height value of the scroll
     */

  }, {
    key: "scrollHeight",
    value: function scrollHeight() {
      return _util["default"].oneSelect.call(this).scrollHeight;
    }
    /**
     * Returns the width value of the scroll.
     *
     * @static
     * @returns {Number} The width value of the first element
     */

  }, {
    key: "scrollWidth",
    value: function scrollWidth() {
      return _util["default"].oneSelect.call(this).scrollWidth;
    }
    /**
     * The html element is imported or injected into the element.
     *
     * @static
     * @param {String} Html element
     * @returns {String|Object} The html element or New class Loaf-DOM
     */

  }, {
    key: "html",
    value: function html() {
      var htmlValue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      if (htmlValue === null) return _util["default"].oneSelect.call(this).innerHTML;
      this.element.forEach(function (el) {
        el.innerHTML = _util["default"].finishValue(htmlValue);
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

  }, {
    key: "text",
    value: function text() {
      var textValue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      if (textValue === null) return _util["default"].oneSelect.call(this).innerText;
      this.element.forEach(function (el) {
        el.innerText = _util["default"].finishValue(textValue);
      });
      return this;
    }
    /**
     * Remove all child elements.
     *
     * @static
     * @returns {Object} Loaf-dom class
     */

  }, {
    key: "removeAllChild",
    value: function removeAllChild() {
      var el = _util["default"].oneSelect.call(this);

      while (el.firstChild) {
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

  }, {
    key: "animate",
    value: function animate(option, duration) {
      var easing = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'easeOutSine';
      var callback = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
      var fps = 60;
      var secDuration = duration / 1000;
      this.element.forEach(function (el) {
        var elementID = el.identificationNo;
        animation[elementID] = animation[elementID] ? animation[elementID] : {};

        var _loop = function _loop(key) {
          var checkTarget = key === 'scrollLeft' || key === 'scrollTop';
          var target = checkTarget ? el : el.style;
          var start = parseInt(target[key]);
          var variation = option[key] - start;
          var finish = option[key];
          var time = 0;
          var position = start;
          clearInterval(animation[elementID][key]);
          animation[elementID][key] = setInterval(function () {
            time += 1 / fps;
            position = _easing["default"][easing](time * 100 / secDuration, time, start, variation, secDuration);

            if (variation > 0 && position >= finish || variation < 0 && position <= finish) {
              clearInterval(animation[elementID][key]);
              target[key] = checkTarget ? finish : finish + 'px';
              if (callback) callback();
              return;
            }

            target[key] = checkTarget ? position : position + 'px';
          }, 1000 / fps);
        };

        for (var key in option) {
          _loop(key);
        }
      });
    }
    /**
     * Stops all animation effects on the selected element.
     *
     * @static
     * @returns {Object} Class Loaf-DOM
     */

  }, {
    key: "stop",
    value: function stop() {
      this.element.forEach(function (el) {
        var elementID = el.identificationNo;
        animation[elementID] = animation[elementID] ? animation[elementID] : {};

        for (var key in animation[elementID]) {
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

  }, {
    key: "forEach",
    value: function forEach(callback) {
      this.element.forEach(function (el) {
        callback(new LoafDom([el]));
      });
      return this;
    }
  }]);

  return LoafDom;
}();

var _default = function _default(element) {
  return new LoafDom(element);
};

exports["default"] = _default;