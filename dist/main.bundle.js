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
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/Car.js":
/*!*******************!*\
  !*** ./js/Car.js ***!
  \*******************/
/*! exports provided: Car */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Car\", function() { return Car; });\n/* harmony import */ var _Rectangle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Rectangle */ \"./js/Rectangle.js\");\n/* harmony import */ var _Globals__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Globals */ \"./js/Globals.js\");\n/* harmony import */ var _Globals__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_Globals__WEBPACK_IMPORTED_MODULE_1__);\n\n\n\nfunction Car(xPos, yPos, w, h, direction, speed) {\n  // basics\n  const car = new _Rectangle__WEBPACK_IMPORTED_MODULE_0__[\"Rectangle\"](w, h);\n  car.xPos = xPos;\n  car.yPos = yPos;\n  car.type = 'car';\n\n  // used for moving car on update\n  car.direction = direction;\n  car.speed = speed;\n\n  // used for collision detecting\n  car.topEdge = car.yPos;\n  car.rightEdge = car.xPos + car.w;\n  car.bottomEdge = car.yPos + car.h;\n  car.leftEdge = car.xPos;\n\n  // update for each frame\n  car.update = function () {\n    car.xPos += car.speed * car.direction;\n    car.rightEdge = car.xPos + car.w;\n    car.leftEdge = car.xPos;\n  };\n\n  // collision detecting, returns true if frog comes into contact\n  car.hitsFrog = function (frog) {\n    if (frog.topEdge === car.topEdge) {\n      if (frog.rightEdge > car.leftEdge) {\n        if (frog.leftEdge < car.rightEdge) {\n          return true;\n        }\n      }\n    }\n  };\n  return car;\n}\n\n\n//# sourceURL=webpack:///./js/Car.js?");

/***/ }),

/***/ "./js/Frog.js":
/*!********************!*\
  !*** ./js/Frog.js ***!
  \********************/
/*! exports provided: Frog */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Frog\", function() { return Frog; });\n/* harmony import */ var _Rectangle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Rectangle */ \"./js/Rectangle.js\");\n\n\nfunction Frog(xPos, yPos, w, h) {\n  // basics\n  const frog = new _Rectangle__WEBPACK_IMPORTED_MODULE_0__[\"Rectangle\"](w, h);\n  frog.xPos = Math.floor(xPos);\n  frog.yPos = Math.floor(yPos);\n\n  // used for collision detecting\n  frog.topEdge = frog.yPos;\n  frog.rightEdge = frog.xPos + frog.w;\n  frog.bottomEdge = frog.yPos + frog.h;\n  frog.leftEdge = frog.xPos;\n\n  // moves the frog!\n  frog.move = function (direction) {\n    const frogW = Math.floor(frog.w);\n    const frogH = Math.floor(frog.h);\n    if (direction === 'UP') {\n      frog.yPos -= frogH;\n      frog.topEdge -= frogH;\n      frog.bottomEdge -= frogH;\n    }\n    if (direction === 'RIGHT') {\n      frog.xPos += frogW;\n      frog.rightEdge += frogW;\n      frog.leftEdge += frogW;\n    }\n    if (direction === 'DOWN') {\n      frog.yPos += frogH;\n      frog.topEdge += frogH;\n      frog.bottomEdge += frogH;\n    }\n    if (direction === 'LEFT') {\n      frog.xPos -= frogW;\n      frog.leftEdge -= frogW;\n      frog.rightEdge -= frogW;\n    }\n  };\n\n  // update method, for moving frog on key input and when it encounters a car or log\n  frog.update = function (direction, speed) {\n    console.log('updating?');\n    // if direction isn't an integer and if no speed is given, it is user input\n    if (!parseInt(direction) && speed === undefined) {\n      frog.move(direction);\n      console.log(frog.topEdge);\n    // if direction IS an integer and there is a speed given, the frog is sitting on a log\n    // and should move with the log\n    } else {\n      frog.xPos += speed * direction;\n      frog.rightEdge = frog.xPos + frog.w;\n      frog.leftEdge = frog.xPos;\n    }\n  };\n  return frog;\n}\n\n\n//# sourceURL=webpack:///./js/Frog.js?");

/***/ }),

/***/ "./js/Globals.js":
/*!***********************!*\
  !*** ./js/Globals.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// For any game properties that are global\n\nmodule.exports = {\n  numGridRows: 10,\n  canvasHeight: 0,\n  canvasWidth: 0,\n  gridHeight: 0,\n  minRowSpeed: 1,\n  maxRowSpeed: 2,\n  minItems: 2,\n  maxItems: 5,\n  minItemWidth: 1,\n  maxItemWidth: 3,\n  minItemSpacing: 3,\n  maxItemSpacing: 5,\n\n  rowArray: [],\n  Frog: undefined,\n\n  playerScore: 0,\n  playerLives: 3,\n\n};\n\n\n//# sourceURL=webpack:///./js/Globals.js?");

/***/ }),

/***/ "./js/Keys.js":
/*!********************!*\
  !*** ./js/Keys.js ***!
  \********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  _pressed: {},\n\n  UP: 38,\n  RIGHT: 39,\n  DOWN: 40,\n  LEFT: 37,\n\n  isDown(keyCode) {\n    return this._pressed[keyCode]\n  },\n  onKeyDown(e) {\n    this._pressed[e.keyCode] = true\n  },\n  onKeyUp(e) {\n    delete this._pressed[e.keyCode]\n  },\n});\n\n\n//# sourceURL=webpack:///./js/Keys.js?");

/***/ }),

/***/ "./js/Log.js":
/*!*******************!*\
  !*** ./js/Log.js ***!
  \*******************/
/*! exports provided: Log */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Log\", function() { return Log; });\n/* harmony import */ var _Rectangle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Rectangle */ \"./js/Rectangle.js\");\n\n\nfunction Log(xPos, yPos, w, h, direction, speed, name) {\n  // basics\n  const log = new _Rectangle__WEBPACK_IMPORTED_MODULE_0__[\"Rectangle\"](w, h);\n  log.xPos = xPos;\n  log.yPos = yPos;\n  log.name = name;\n\n  // used for moving log on update\n  log.direction = direction;\n  log.speed = speed;\n\n  // used for collision detecting\n  log.topEdge = log.yPos;\n  log.rightEdge = log.xPos + log.w;\n  log.bottomEdge = log.yPos + log.h;\n  log.leftEdge = log.xPos;\n\n  // update for each frame\n  log.update = function () {\n    log.xPos += log.speed * log.direction;\n    log.rightEdge = log.xPos + log.w;\n    log.leftEdge = log.xPos;\n  };\n\n  // collision detecting, returns true if frog comes into contact\n  log.hitsFrog = function (frog) {\n    if (frog.topEdge === log.topEdge) {\n      if (frog.rightEdge > log.leftEdge) {\n        if (frog.leftEdge < log.rightEdge) {\n          return true;\n        }\n      }\n    }\n  };\n  return log;\n}\n\n\n//# sourceURL=webpack:///./js/Log.js?");

/***/ }),

/***/ "./js/Random.js":
/*!**********************!*\
  !*** ./js/Random.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = {\n  direction(){\n    // returns 1 or -1, corresponding to right and left\n    return Math.floor(Math.random() * 100 + 1)\n  },\n  speed(maxRowSpeed, minRowSpeed){\n    // returns random speed between the max and min xpeeds\n    return Math.floor(Math.random() * (maxRowSpeed - minRowSpeed) + minRowSpeed)\n  },\n  itemCount(maxItems, minItems){\n    // returns random item count to populate rows with items (cars or logs)\n    return Math.floor(Math.random() * (maxItems - minItems) + minItems)\n  },\n  xPos(canvasWidth){\n    // returns random starting x position so cars/logs are staggered and rows aren't identical\n    return Math.floor(Math.random() * (canvasWidth - 0) + 0)\n  },\n  itemWidth(maxItemWidth, minItemWidth){\n    // returns random item width for car/log or spacing between cars/logs\n    return Math.floor(Math.random() * (maxItemWidth - minItemWidth) + minItemWidth)\n  },\n  itemSpacing(minSpacing, maxSpacing, gridUnit) {\n    let minUnits =  minSpacing * gridUnit\n    let maxUnits = maxSpacing * gridUnit\n    // gets random spacing based off of min and max item spacing values, and rounds it down to the nearest 10\n    return Math.floor((Math.floor(Math.random() * maxUnits) + minUnits) / 10) * 10\n  },\n};\n\n\n//# sourceURL=webpack:///./js/Random.js?");

/***/ }),

/***/ "./js/Rectangle.js":
/*!*************************!*\
  !*** ./js/Rectangle.js ***!
  \*************************/
/*! exports provided: Rectangle */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Rectangle\", function() { return Rectangle; });\nfunction Rectangle(w, h) {\n  this.name = 'rectangle';\n  this.w = w;\n  this.h = h;\n}\n\n\n//# sourceURL=webpack:///./js/Rectangle.js?");

/***/ }),

/***/ "./js/Row.js":
/*!*******************!*\
  !*** ./js/Row.js ***!
  \*******************/
/*! exports provided: Row */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Row\", function() { return Row; });\n/* harmony import */ var _Rectangle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Rectangle */ \"./js/Rectangle.js\");\n\n\nfunction Row(xPos, yPos, w, h, direction, speed) {\n  const row = new _Rectangle__WEBPACK_IMPORTED_MODULE_0__[\"Rectangle\"](w, h);\n  row.xPos = xPos;\n  row.yPos = yPos;\n  if (direction <= 50) {\n    row.direction = -1;\n  } else {\n    row.direction = 1;\n  }\n  row.speed = speed;\n  row.items = [];\n  return row;\n}\n\n\n//# sourceURL=webpack:///./js/Row.js?");

/***/ }),

/***/ "./js/app.js":
/*!*******************!*\
  !*** ./js/app.js ***!
  \*******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Row__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Row */ \"./js/Row.js\");\n/* harmony import */ var _Car__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Car */ \"./js/Car.js\");\n/* harmony import */ var _Log__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Log */ \"./js/Log.js\");\n/* harmony import */ var _Frog__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Frog */ \"./js/Frog.js\");\n/* harmony import */ var _Globals__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Globals */ \"./js/Globals.js\");\n/* harmony import */ var _Globals__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_Globals__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _Keys__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Keys */ \"./js/Keys.js\");\n/* harmony import */ var _Random__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Random */ \"./js/Random.js\");\n/* harmony import */ var _Random__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_Random__WEBPACK_IMPORTED_MODULE_6__);\n\n\n\n\n\n\n\n\n// set global timing variables\nlet lastRender = 0;\nlet throttleInterval = 0;\n\nfunction update(progress) {\n  throttleInterval += progress;\n  for (const row in _Globals__WEBPACK_IMPORTED_MODULE_4___default.a.rowArray) {\n    _Globals__WEBPACK_IMPORTED_MODULE_4___default.a.rowArray[row].items = _Globals__WEBPACK_IMPORTED_MODULE_4___default.a.rowArray[row].items.map((item) => {\n      item.update();\n      if (item.hitsFrog(_Globals__WEBPACK_IMPORTED_MODULE_4___default.a.Frog)) {\n        if (item.type === 'car') {\n          endGame('lose');\n        } else if (item.type === 'log') {\n          _Globals__WEBPACK_IMPORTED_MODULE_4___default.a.Frog.update(item.direction, item.speed);\n        }\n      }\n      return item;\n    });\n  }\n  // throttles key presses so frog doesn't go flying across screen\n  if (throttleInterval > 70) {\n    if (_Keys__WEBPACK_IMPORTED_MODULE_5__[\"default\"].isDown(_Keys__WEBPACK_IMPORTED_MODULE_5__[\"default\"].UP)) { _Globals__WEBPACK_IMPORTED_MODULE_4___default.a.Frog.update('UP'); }\n    if (_Keys__WEBPACK_IMPORTED_MODULE_5__[\"default\"].isDown(_Keys__WEBPACK_IMPORTED_MODULE_5__[\"default\"].RIGHT)) { _Globals__WEBPACK_IMPORTED_MODULE_4___default.a.Frog.update('RIGHT'); }\n    if (_Keys__WEBPACK_IMPORTED_MODULE_5__[\"default\"].isDown(_Keys__WEBPACK_IMPORTED_MODULE_5__[\"default\"].DOWN)) { _Globals__WEBPACK_IMPORTED_MODULE_4___default.a.Frog.update('DOWN'); }\n    if (_Keys__WEBPACK_IMPORTED_MODULE_5__[\"default\"].isDown(_Keys__WEBPACK_IMPORTED_MODULE_5__[\"default\"].LEFT)) { _Globals__WEBPACK_IMPORTED_MODULE_4___default.a.Frog.update('LEFT'); }\n    throttleInterval = 0;\n  }\n  checkGameStatus(_Globals__WEBPACK_IMPORTED_MODULE_4___default.a.Frog);\n}\n\nfunction draw() {\n  // Get canvas context\n  const canvas = document.getElementsByClassName('canvas')[0];\n  const ctx = canvas.getContext('2d');\n\n  // Paint page elements\n  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);\n  Paint.Rows(ctx);\n  Paint.Cars(ctx);\n  Paint.Frog(ctx);\n  Paint.GameInfo(ctx, _Globals__WEBPACK_IMPORTED_MODULE_4___default.a.playerScore, _Globals__WEBPACK_IMPORTED_MODULE_4___default.a.playerLives);\n}\n\nfunction loop(timestamp) {\n  const progress = timestamp - lastRender;\n  update(progress);\n  draw();\n  lastRender = timestamp;\n  window.requestAnimationFrame(loop);\n}\n\nfunction endGame(gameStatus) {\n  if (gameStatus === 'win') {\n    incrementScore();\n  }\n  if (gameStatus === 'lose') {\n    decrementLives();\n  }\n  if (gameStatus === 'game over') {\n    console.log('stub for game over condition');\n  }\n  restartGame();\n}\n\nfunction incrementScore() {\n  console.log('incrementScore fired');\n  _Globals__WEBPACK_IMPORTED_MODULE_4___default.a.playerScore += 1;\n}\n\nfunction decrementLives() {\n  _Globals__WEBPACK_IMPORTED_MODULE_4___default.a.playerLives -= 1;\n}\n\nfunction restartGame() {\n  // kill the old frog\n  _Globals__WEBPACK_IMPORTED_MODULE_4___default.a.Frog = undefined;\n  // put a new one in the starting position\n  Generate.Frog();\n}\n\nfunction checkGameStatus(frog) {\n  // check if frog is off screen\n  if (frog.xPos > _Globals__WEBPACK_IMPORTED_MODULE_4___default.a.canvasWidth || frog.xPos < 0 - frog.w || frog.yPos > _Globals__WEBPACK_IMPORTED_MODULE_4___default.a.canvasHeight - frog.h) {\n    endGame('lose');\n  }\n  // check if frog has made it to the end of the level\n  if (frog.yPos === 0) {\n    console.log('frog wins?');\n    endGame('win');\n  }\n  if (_Globals__WEBPACK_IMPORTED_MODULE_4___default.a.playerLives <= 0) {\n    endGame('game over');\n  }\n}\n\n// Methods for painting elements to the canvas\nconst Paint = {\n  Rows(ctx) {\n    _Globals__WEBPACK_IMPORTED_MODULE_4___default.a.rowArray.forEach((row) => {\n      ctx.fillStyle = 'rgba(50, 180, 50, 0.8)';\n      ctx.fillRect(row.xPos, row.yPos, row.w, row.h);\n    });\n  },\n  Cars(ctx) {\n    _Globals__WEBPACK_IMPORTED_MODULE_4___default.a.rowArray.forEach((row) => {\n      row.items.forEach((car) => {\n        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';\n        if (car.xPos > ctx.canvas.width + (_Globals__WEBPACK_IMPORTED_MODULE_4___default.a.maxItemWidth * _Globals__WEBPACK_IMPORTED_MODULE_4___default.a.gridHeight)) {\n          car.xPos = 0 - (_Globals__WEBPACK_IMPORTED_MODULE_4___default.a.maxItemWidth * _Globals__WEBPACK_IMPORTED_MODULE_4___default.a.gridHeight);\n        }\n        if (car.xPos < 0 - (_Globals__WEBPACK_IMPORTED_MODULE_4___default.a.maxItemWidth * _Globals__WEBPACK_IMPORTED_MODULE_4___default.a.gridHeight)) {\n          car.xPos = ctx.canvas.width + (_Globals__WEBPACK_IMPORTED_MODULE_4___default.a.maxItemWidth * _Globals__WEBPACK_IMPORTED_MODULE_4___default.a.gridHeight);\n        }\n        ctx.fillRect(car.xPos, car.yPos, car.w, car.h);\n        ctx.fillText(`car: ${car.name}`, car.xPos, car.yPos);\n      });\n    });\n  },\n  Frog(ctx) {\n    ctx.fillStyle = 'rgba(0, 255, 255, 0.8)';\n    ctx.fillRect(_Globals__WEBPACK_IMPORTED_MODULE_4___default.a.Frog.xPos, _Globals__WEBPACK_IMPORTED_MODULE_4___default.a.Frog.yPos, _Globals__WEBPACK_IMPORTED_MODULE_4___default.a.Frog.w, _Globals__WEBPACK_IMPORTED_MODULE_4___default.a.Frog.h);\n  },\n  GameInfo(ctx, score, lives) {\n    ctx.font = '18px Cambria';\n    ctx.fillText(`Score: ${score}`, 10, 25);\n    ctx.fillText(`Lives: ${lives}`, 100, 25);\n  },\n\n};\n\nconst Generate = {\n\n  Rows() {\n    function getXPositions(numItems) {\n      let currentXPos;\n      const xPositions = [];\n      const startingXPositions = [10, 115, 300, 450];\n      for (let i = 0; i < numItems; i++) {\n        xPositions.push(0);\n      }\n      return xPositions.map((item, iteration) => {\n        if (iteration === 0) {\n          const randomStartingPoint = Math.floor(Math.random() * startingXPositions.length);\n          currentXPos = startingXPositions[randomStartingPoint];\n          return currentXPos;\n        }\n        if (iteration > 0) {\n          currentXPos = currentXPos += _Random__WEBPACK_IMPORTED_MODULE_6___default.a.itemSpacing(_Globals__WEBPACK_IMPORTED_MODULE_4___default.a.minItemSpacing, _Globals__WEBPACK_IMPORTED_MODULE_4___default.a.maxItemSpacing, _Globals__WEBPACK_IMPORTED_MODULE_4___default.a.gridHeight);\n          return currentXPos;\n        }\n      });\n    }\n\n    let gridRowY = 0;\n    for (let i = 0; i < _Globals__WEBPACK_IMPORTED_MODULE_4___default.a.numGridRows; i++) {\n      gridRowY = Math.floor(gridRowY);\n      const direction = _Random__WEBPACK_IMPORTED_MODULE_6___default.a.direction();\n      const speed = _Random__WEBPACK_IMPORTED_MODULE_6___default.a.speed(_Globals__WEBPACK_IMPORTED_MODULE_4___default.a.maxRowSpeed, _Globals__WEBPACK_IMPORTED_MODULE_4___default.a.minRowSpeed);\n      const numItems = _Random__WEBPACK_IMPORTED_MODULE_6___default.a.itemCount(_Globals__WEBPACK_IMPORTED_MODULE_4___default.a.maxItems, _Globals__WEBPACK_IMPORTED_MODULE_4___default.a.minItems);\n      const xPositions = getXPositions(numItems);\n\n      const row = new _Row__WEBPACK_IMPORTED_MODULE_0__[\"Row\"](0, gridRowY, _Globals__WEBPACK_IMPORTED_MODULE_4___default.a.canvasWidth, _Globals__WEBPACK_IMPORTED_MODULE_4___default.a.gridHeight, direction, 4);\n\n      // no cars or logs on top, middle or bottom row\n      if (i !== 0 && i !== 5 && i !== 9) {\n        for (let j = 0; j < numItems; j++) {\n          const maxWidthInUnits = _Globals__WEBPACK_IMPORTED_MODULE_4___default.a.maxItemWidth * _Globals__WEBPACK_IMPORTED_MODULE_4___default.a.gridHeight;\n          const minWidthInUnits = _Globals__WEBPACK_IMPORTED_MODULE_4___default.a.minItemWidth * _Globals__WEBPACK_IMPORTED_MODULE_4___default.a.gridHeight;\n          const itemWidth = _Random__WEBPACK_IMPORTED_MODULE_6___default.a.itemWidth(maxWidthInUnits, minWidthInUnits);\n\n          const item = this.Item('car', {\n            xPos: xPositions[j], yPos: row.yPos, w: itemWidth, h: row.h,\n          }, row.direction, row.speed);\n          row.items.push(item);\n        }\n      }\n      _Globals__WEBPACK_IMPORTED_MODULE_4___default.a.rowArray.push(row);\n      gridRowY += _Globals__WEBPACK_IMPORTED_MODULE_4___default.a.rowArray[i].h;\n    }\n  },\n  Item(itemType, dimensions, direction, speed) {\n    if (itemType = 'car') {\n      return new _Car__WEBPACK_IMPORTED_MODULE_1__[\"Car\"](dimensions.xPos, dimensions.yPos, dimensions.w, dimensions.h, direction, speed);\n    }\n  },\n  Frog() {\n    const player = new _Frog__WEBPACK_IMPORTED_MODULE_3__[\"Frog\"](_Globals__WEBPACK_IMPORTED_MODULE_4___default.a.canvasWidth / 2, _Globals__WEBPACK_IMPORTED_MODULE_4___default.a.canvasHeight - _Globals__WEBPACK_IMPORTED_MODULE_4___default.a.gridHeight, _Globals__WEBPACK_IMPORTED_MODULE_4___default.a.gridHeight, _Globals__WEBPACK_IMPORTED_MODULE_4___default.a.gridHeight);\n    _Globals__WEBPACK_IMPORTED_MODULE_4___default.a.Frog = player;\n  },\n};\n\nwindow.onload = function () {\n  // Get canvas and window dimensions\n  const canvas = document.getElementsByClassName('canvas')[0];\n  // Initial setup for global variables\n  // canvas width and height being rounded down to nearest multiple of 10\n  _Globals__WEBPACK_IMPORTED_MODULE_4___default.a.canvasWidth = Math.floor((window.innerWidth - 16) / 10) * 10;\n  _Globals__WEBPACK_IMPORTED_MODULE_4___default.a.canvasHeight = Math.floor((window.innerHeight - 16) / 10) * 10;\n  _Globals__WEBPACK_IMPORTED_MODULE_4___default.a.rowArray = [];\n  canvas.width = _Globals__WEBPACK_IMPORTED_MODULE_4___default.a.canvasWidth;\n  canvas.height = _Globals__WEBPACK_IMPORTED_MODULE_4___default.a.canvasHeight;\n  _Globals__WEBPACK_IMPORTED_MODULE_4___default.a.gridHeight = _Globals__WEBPACK_IMPORTED_MODULE_4___default.a.canvasHeight / _Globals__WEBPACK_IMPORTED_MODULE_4___default.a.numGridRows;\n\n  // key bindings\n  window.addEventListener('keyup', (e) => { _Keys__WEBPACK_IMPORTED_MODULE_5__[\"default\"].onKeyUp(e), false; });\n  window.addEventListener('keydown', (e) => { _Keys__WEBPACK_IMPORTED_MODULE_5__[\"default\"].onKeyDown(e), false; });\n  // generate rows and frog\n  Generate.Rows();\n  Generate.Frog();\n  // Run game loop\n  window.requestAnimationFrame(loop);\n};\n\n/*\n  Notes:\n\n  what do we need?\n   a rectangle object\n   a car object\n   a frog object\n   a log object\n   a row object\n   a game loop\n*/\n\n\n//# sourceURL=webpack:///./js/app.js?");

/***/ })

/******/ });