module.exports = {
  direction: function(){
    return Math.floor(Math.random() * 100 + 1)
  },
  speed: function(maxRowSpeed, minRowSpeed){
    return Math.floor(Math.random() * (maxRowSpeed - minRowSpeed) + minRowSpeed)
  },
  itemCount: function(maxItems, minItems){
    return Math.floor(Math.random() * (maxItems - minItems) + minItems)
  },
  startingXPos: function(canvasWidth){
    return Math.floor(Math.random() * (canvasWidth - 0) + 0)
  },
  itemWidth: function(maxItemWidth, minItemWidth){
    return Math.floor(Math.random() * (maxItemWidth - minItemWidth) + minItemWidth)
  },
  itemSpacing: function(maxItemWidth){
    return Math.floor(Math.random() * 100 + 50) + maxItemWidth
  },
}
