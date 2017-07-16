export default {
  _pressed: {},

  UP: 38,
  RIGHT: 39,
  DOWN: 40,
  LEFT: 37,

  isDown: function(keyCode) {
    return this._pressed[keyCode]
  },
  onKeyDown: function(e) {
    this._pressed[e.keyCode] = true
  },
  onKeyUp: function(e) {
    delete this._pressed[e.keyCode]
  }
}
