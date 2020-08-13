(function (modules) {
  // webpackBootstrap
  // The module cache
  var installedModules = {};
  // The require function
  function __webpack_require__(moduleId) {
    // Check if module is in cache
    if (installedModules[moduleId]) {
      return installedModules[moduleId].exports;
    }
    // Create a new module (and put it into the cache)
    var module = (installedModules[moduleId] = {
      i: moduleId,
      l: false,
      exports: {},
    });
    // Execute the module function
    modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
    // Flag the module as loaded
    module.l = true;
    // Return the exports of the module
    return module.exports;
  }
  // expose the modules object (__webpack_modules__)
  __webpack_require__.m = modules;
  // expose the module cache
  __webpack_require__.c = installedModules;
  // define getter function for harmony exports
  __webpack_require__.d = function (exports, name, getter) {
    if (!__webpack_require__.o(exports, name)) {
      Object.defineProperty(exports, name, { enumerable: true, get: getter });
    }
  };
  // define __esModule on exports
  __webpack_require__.r = function (exports) {
    if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
      Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
    }
    Object.defineProperty(exports, '__esModule', { value: true });
  };
  // create a fake namespace object
  // mode & 1: value is a module id, require it
  // mode & 2: merge all properties of value into the ns
  // mode & 4: return value when already ns object
  // mode & 8|1: behave like require
  __webpack_require__.t = function (value, mode) {
    if (mode & 1) value = __webpack_require__(value);
    if (mode & 8) return value;
    if (mode & 4 && typeof value === 'object' && value && value.__esModule) return value;
    var ns = Object.create(null);
    __webpack_require__.r(ns);
    Object.defineProperty(ns, 'default', { enumerable: true, value: value });
    if (mode & 2 && typeof value != 'string')
      for (var key in value)
        __webpack_require__.d(
          ns,
          key,
          function (key) {
            return value[key];
          }.bind(null, key)
        );
    return ns;
  };
  // getDefaultExport function for compatibility with non-harmony modules
  __webpack_require__.n = function (module) {
    var getter =
      module && module.__esModule
        ? function getDefault() {
            return module['default'];
          }
        : function getModuleExports() {
            return module;
          };
    __webpack_require__.d(getter, 'a', getter);
    return getter;
  };
  // Object.prototype.hasOwnProperty.call
  __webpack_require__.o = function (object, property) {
    return Object.prototype.hasOwnProperty.call(object, property);
  };
  // __webpack_public_path__
  __webpack_require__.p = '';
  // Load entry module and return exports
  return __webpack_require__((__webpack_require__.s = './src/index.js'));
})({
  './src/ab.js': function (module, __webpack_exports__, __webpack_require__) {
    'use strict';
    eval(
      '__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRandomNum", function() { return getRandomNum; });\nfunction getRandomNum() {\n  return Math.floor(Math.random() * (9 - 1));\n}\n\n/* harmony default export */ __webpack_exports__["default"] = (\'ab\');\n\n\n//# sourceURL=webpack:///./src/ab.js?'
    );
  },
  './src/index.js': function (module, __webpack_exports__, __webpack_require__) {
    'use strict';
    eval(
      '__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _sum__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sum */ "./src/sum.js");\n/* harmony import */ var _ab__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ab */ "./src/ab.js");\n/* harmony import */ var _log__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./log */ "./src/log.js");\n\n\n\n\nconst count = Object(_sum__WEBPACK_IMPORTED_MODULE_0__["default"])(Object(_ab__WEBPACK_IMPORTED_MODULE_1__["getRandomNum"])(), Object(_ab__WEBPACK_IMPORTED_MODULE_1__["getRandomNum"])());\n\nObject(_log__WEBPACK_IMPORTED_MODULE_2__["log"])(count);\n\n\n//# sourceURL=webpack:///./src/index.js?'
    );
  },
  './src/log.js': function (module, __webpack_exports__, __webpack_require__) {
    'use strict';
    eval(
      '__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "log", function() { return log; });\n/* harmony import */ var _ab__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ab */ "./src/ab.js");\n\n\nfunction log(msg) {\n  console.log(msg);\n}\n\nlog(_ab__WEBPACK_IMPORTED_MODULE_0__["default"]);\n\n\n//# sourceURL=webpack:///./src/log.js?'
    );
  },
  './src/sum.js': function (module, __webpack_exports__, __webpack_require__) {
    'use strict';
    eval(
      '__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cube", function() { return cube; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return sum; });\n/* harmony import */ var _ab__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ab */ "./src/ab.js");\n/* harmony import */ var _log__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./log */ "./src/log.js");\n\n\n\nfunction cube(x) {\n  return x ** 3;\n}\n\nfunction sum(a, b) {\n  return a + b;\n}\n\nconst r1 = Object(_ab__WEBPACK_IMPORTED_MODULE_0__["getRandomNum"])();\nconst r2 = Object(_ab__WEBPACK_IMPORTED_MODULE_0__["getRandomNum"])();\n\nObject(_log__WEBPACK_IMPORTED_MODULE_1__["log"])(sum(r1, r2));\n\n\n//# sourceURL=webpack:///./src/sum.js?'
    );
  },
});
