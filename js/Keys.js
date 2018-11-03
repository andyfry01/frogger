export default {
  _pressed: {},

  UP: 38,
  RIGHT: 39,
  DOWN: 40,
  LEFT: 37,

  isDown(keyCode) {
    return this._pressed[keyCode]
  },
  onKeyDown(e) {
    this._pressed[e.keyCode] = true
  },
  onKeyUp(e) {
    delete this._pressed[e.keyCode]
  },
};
