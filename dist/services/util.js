"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Util = /*#__PURE__*/function () {
  function Util() {
    _classCallCheck(this, Util);
  }

  _createClass(Util, null, [{
    key: "error",

    /**
     * Print an error message
     *
     * @private
     */
    value: function error(type, method) {
      if (type === 1) console.warn("No elements selected by ".concat(method));
    }
    /**
     * Adds a new selector array or a new selector element to an existing selector array.
     *
     * @private
     * @param {Array} Default array to save
     * @param {Array|Object} Element or array of elements
     * @returns {Array} Element selector array
     */

  }, {
    key: "concat",
    value: function concat(beforeArr, afterArr) {
      afterArr = Array.prototype.concat.call([], afterArr);
      afterArr.forEach(function (el) {
        if (beforeArr.indexOf(el) === -1) beforeArr = Array.prototype.concat.call(beforeArr, el);
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

  }, {
    key: "select",
    value: function select(element) {
      element = element.trim();

      if (/[\,\>\: \]\=]/.test(element)) {
        if (!document.querySelectorAll(element).length) element = [];else element = Util.arrayElement([], document.querySelectorAll(element));
      } else {
        switch (element[0]) {
          case '#':
            element = Util.arrayElement([], document.getElementById(element.substring(1)));
            break;

          case '.':
            if (!document.getElementsByClassName(element.substring(1)).length) element = [];else element = Util.arrayElement([], document.getElementsByClassName(element.substring(1)));
            break;

          default:
            if (!document.getElementsByTagName(element).length) element = [];else element = Util.arrayElement([], document.getElementsByTagName(element));
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

  }, {
    key: "selectElement",
    value: function selectElement(element) {
      if (element === window || element === document) {
        this.element = Util.arrayElement([], element);
      } else if (_typeof(element) === 'object') {
        this.element = element;
      }

      if (typeof element === 'string') {
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

  }, {
    key: "arrayElement",
    value: function arrayElement(store, element) {
      if (!element) return store;
      if (!element.length) return Util.concat(store, element);

      var _iterator = _createForOfIteratorHelper(element),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var target = _step.value;
          store = Util.concat(store, target);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
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

  }, {
    key: "findInParent",
    value: function findInParent(parent, children) {
      var cacheParent = children.parentNode;

      while (cacheParent !== null) {
        if (parent.indexOf(cacheParent) !== -1) return cacheParent;
        cacheParent = cacheParent.parentNode;
      }

      return null;
    }
    /**
     * If the value is a function, it executes the function and returns the return value.
     *
     * @private
     * @param {String|Number|Function} Value or response value
     * @returns {String|Number} Final value
     */

  }, {
    key: "finishValue",
    value: function finishValue(value) {
      value = typeof value === 'function' ? value() : value;
      return value;
    }
    /**
     * Returns the first of the selected elements.
     *
     * @private
     * @param {Object} Loaf-dom class
     * @returns {Object} First element selector
     */

  }, {
    key: "oneSelect",
    value: function oneSelect() {
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

  }, {
    key: "compactSplit",
    value: function compactSplit(str, value) {
      return str.split(value).filter(Boolean);
    }
    /**
     * Returns an array of the unique values of the two arrays.
     *
     * @private
     * @returns {Array} An array of unique values
     */

  }, {
    key: "union",
    value: function union(arr1, arr2) {
      return _toConsumableArray(new Set([].concat(_toConsumableArray(arr1), _toConsumableArray(arr2))));
    }
  }]);

  return Util;
}();

var _default = Util;
exports["default"] = _default;