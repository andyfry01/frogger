module.exports = {
  direction: function(){
    // returns 1 or -1, corresponding to right and left
    return Math.floor(Math.random() * 100 + 1)
  },
  speed: function(maxRowSpeed, minRowSpeed){
    // returns random speed between the max and min xpeeds
    return Math.floor(Math.random() * (maxRowSpeed - minRowSpeed) + minRowSpeed)
  },
  itemCount: function(maxItems, minItems){
    // returns random item count to populate rows with items (cars or logs)
    return Math.floor(Math.random() * (maxItems - minItems) + minItems)
  },
  startingXPos: function(canvasWidth){
    // returns random starting x position so cars/logs are staggered and rows aren't identical
    return Math.floor(Math.random() * (canvasWidth - 0) + 0)
  },
  itemWidth: function(maxItemWidth, minItemWidth){
    // returns random item width for car/log
    return Math.floor(Math.random() * (maxItemWidth - minItemWidth) + minItemWidth)
  },
  itemSpacing: function(maxItemWidth){
    // returns random item spacing, so items aren't all uniformly spaced
    return Math.floor(Math.random() * 100 + 50) + maxItemWidth
  },
}
