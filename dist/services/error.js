"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Error = /*#__PURE__*/function () {
  function Error() {
    _classCallCheck(this, Error);
  }

  _createClass(Error, null, [{
    key: "warn",

    /**
     * Print an error message
     *
     * @private
     */
    value: function warn(type, method) {
      if (type === 1) console.warn("No elements selected by ".concat(method));
    }
  }]);

  return Error;
}();

var _default = Error;
exports["default"] = _default;