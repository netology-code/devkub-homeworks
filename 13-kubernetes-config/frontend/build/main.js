/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/config.js":
/*!**********************!*\
  !*** ./js/config.js ***!
  \**********************/
/*! exports provided: BASE_URL */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"BASE_URL\", function() { return BASE_URL; });\nconst BASE_URL = \"http://localhost:9000\";\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9qcy9jb25maWcuanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9qcy9jb25maWcuanM/N2I4NSJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3QgQkFTRV9VUkwgPSBwcm9jZXNzLmVudi5CQVNFX1VSTDtcbiJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBOyIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./js/config.js\n");

/***/ }),

/***/ "./js/index.js":
/*!*********************!*\
  !*** ./js/index.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _styles_index_less__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../styles/index.less */ \"./styles/index.less\");\n/* harmony import */ var _styles_index_less__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_styles_index_less__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./config */ \"./js/config.js\");\n\n\n\nconst URL_LIST = '/api/news/';\nconst URL_DETAIL = '/api/news/1/';\n\n/**\n * Запрос данных\n */\nfunction getData(url, detail = false) {\n    fetch(url)\n        .then((response) => response.json())\n        .then((data) => {\n            if (detail) {\n                renderItem(data);\n            } else {\n                renderList(data);\n            }\n        })\n        .catch(err => {\n            console.log(err);\n        });\n}\n\n/**\n * Рендер списка\n */\nfunction renderList(data = []) {\n    if (!data.length) {\n        return;\n    }\n\n    let content = document.querySelector('.js-list');\n\n    for (let item of data) {\n        let block = document.createElement('article');\n\n        block.className = 'b-items__item b-preview';\n        block.id = item.id;\n        block.innerHTML = `\n            <a href=\"/detail/${item.id}/\"><h2 class=\"b-preview__title\">${item.title}</h2></a>\n            <img src=\"${item.preview}\" class=\"b-preview__image\" alt=\"${item.title}\"/>\n            <div class=\"b-preview__text\">${item.short_description}</div>\n        `;\n\n        content.append(block);\n    }\n}\n\n/**\n * Рендер деталки\n */\nfunction renderItem (data) {\n    if (!data) {\n        return;\n    }\n\n    let block = document.querySelector('.js-item');\n\n    block.innerHTML = `\n        <a><h1 class=\"b-page__title\">${data.title}</h1>\n        <img src=\"${data.preview}\" class=\"b-page__image\" alt=\"${data.title}\"/>\n        <div class=\"b-page__text\">${data.description}</div>\n    `;\n}\n\nlet url = window.location.pathname;\nlet regexp = /^\\/$/;\nlet regexpDetail = /\\/detail\\/\\d*\\/$/;\n\nconsole.log(_config__WEBPACK_IMPORTED_MODULE_1__[\"BASE_URL\"]);\n\nif (regexpDetail.test(url)) {\n    getData(_config__WEBPACK_IMPORTED_MODULE_1__[\"BASE_URL\"] + URL_DETAIL, true);\n} else if (regexp.test(url)) {\n    getData(_config__WEBPACK_IMPORTED_MODULE_1__[\"BASE_URL\"] + URL_LIST);\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9qcy9pbmRleC5qcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL2pzL2luZGV4LmpzP2VlMWMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICcuLi9zdHlsZXMvaW5kZXgubGVzcyc7XG5pbXBvcnQge0JBU0VfVVJMfSBmcm9tICcuL2NvbmZpZyc7XG5cbmNvbnN0IFVSTF9MSVNUID0gJy9hcGkvbmV3cy8nO1xuY29uc3QgVVJMX0RFVEFJTCA9ICcvYXBpL25ld3MvMS8nO1xuXG4vKipcbiAqINCX0LDQv9GA0L7RgSDQtNCw0L3QvdGL0YVcbiAqL1xuZnVuY3Rpb24gZ2V0RGF0YSh1cmwsIGRldGFpbCA9IGZhbHNlKSB7XG4gICAgZmV0Y2godXJsKVxuICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmpzb24oKSlcbiAgICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICAgIGlmIChkZXRhaWwpIHtcbiAgICAgICAgICAgICAgICByZW5kZXJJdGVtKGRhdGEpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZW5kZXJMaXN0KGRhdGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgIH0pO1xufVxuXG4vKipcbiAqINCg0LXQvdC00LXRgCDRgdC/0LjRgdC60LBcbiAqL1xuZnVuY3Rpb24gcmVuZGVyTGlzdChkYXRhID0gW10pIHtcbiAgICBpZiAoIWRhdGEubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsZXQgY29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qcy1saXN0Jyk7XG5cbiAgICBmb3IgKGxldCBpdGVtIG9mIGRhdGEpIHtcbiAgICAgICAgbGV0IGJsb2NrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYXJ0aWNsZScpO1xuXG4gICAgICAgIGJsb2NrLmNsYXNzTmFtZSA9ICdiLWl0ZW1zX19pdGVtIGItcHJldmlldyc7XG4gICAgICAgIGJsb2NrLmlkID0gaXRlbS5pZDtcbiAgICAgICAgYmxvY2suaW5uZXJIVE1MID0gYFxuICAgICAgICAgICAgPGEgaHJlZj1cIi9kZXRhaWwvJHtpdGVtLmlkfS9cIj48aDIgY2xhc3M9XCJiLXByZXZpZXdfX3RpdGxlXCI+JHtpdGVtLnRpdGxlfTwvaDI+PC9hPlxuICAgICAgICAgICAgPGltZyBzcmM9XCIke2l0ZW0ucHJldmlld31cIiBjbGFzcz1cImItcHJldmlld19faW1hZ2VcIiBhbHQ9XCIke2l0ZW0udGl0bGV9XCIvPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImItcHJldmlld19fdGV4dFwiPiR7aXRlbS5zaG9ydF9kZXNjcmlwdGlvbn08L2Rpdj5cbiAgICAgICAgYDtcblxuICAgICAgICBjb250ZW50LmFwcGVuZChibG9jayk7XG4gICAgfVxufVxuXG4vKipcbiAqINCg0LXQvdC00LXRgCDQtNC10YLQsNC70LrQuFxuICovXG5mdW5jdGlvbiByZW5kZXJJdGVtIChkYXRhKSB7XG4gICAgaWYgKCFkYXRhKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsZXQgYmxvY2sgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanMtaXRlbScpO1xuXG4gICAgYmxvY2suaW5uZXJIVE1MID0gYFxuICAgICAgICA8YT48aDEgY2xhc3M9XCJiLXBhZ2VfX3RpdGxlXCI+JHtkYXRhLnRpdGxlfTwvaDE+XG4gICAgICAgIDxpbWcgc3JjPVwiJHtkYXRhLnByZXZpZXd9XCIgY2xhc3M9XCJiLXBhZ2VfX2ltYWdlXCIgYWx0PVwiJHtkYXRhLnRpdGxlfVwiLz5cbiAgICAgICAgPGRpdiBjbGFzcz1cImItcGFnZV9fdGV4dFwiPiR7ZGF0YS5kZXNjcmlwdGlvbn08L2Rpdj5cbiAgICBgO1xufVxuXG5sZXQgdXJsID0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lO1xubGV0IHJlZ2V4cCA9IC9eXFwvJC87XG5sZXQgcmVnZXhwRGV0YWlsID0gL1xcL2RldGFpbFxcL1xcZCpcXC8kLztcblxuY29uc29sZS5sb2coQkFTRV9VUkwpO1xuXG5pZiAocmVnZXhwRGV0YWlsLnRlc3QodXJsKSkge1xuICAgIGdldERhdGEoQkFTRV9VUkwgKyBVUkxfREVUQUlMLCB0cnVlKTtcbn0gZWxzZSBpZiAocmVnZXhwLnRlc3QodXJsKSkge1xuICAgIGdldERhdGEoQkFTRV9VUkwgKyBVUkxfTElTVCk7XG59XG4iXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTsiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./js/index.js\n");

/***/ }),

/***/ "./styles/index.less":
/*!***************************!*\
  !*** ./styles/index.less ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zdHlsZXMvaW5kZXgubGVzcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3N0eWxlcy9pbmRleC5sZXNzP2QwOTMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luIl0sIm1hcHBpbmdzIjoiQUFBQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./styles/index.less\n");

/***/ })

/******/ });