module.exports = {
  direction(){
    // returns 1 or -1, corresponding to right and left
    return Math.floor(Math.random() * 100 + 1)
  },
  speed(maxRowSpeed, minRowSpeed){
    // returns random speed between the max and min xpeeds
    return Math.floor(Math.random() * (maxRowSpeed - minRowSpeed) + minRowSpeed)
  },
  itemCount(maxItems, minItems){
    // returns random item count to populate rows with items (cars or logs)
    return Math.floor(Math.random() * (maxItems - minItems) + minItems)
  },
  xPos(canvasWidth){
    // returns random starting x position so cars/logs are staggered and rows aren't identical
    return Math.floor(Math.random() * (canvasWidth - 0) + 0)
  },
  itemWidth(maxItemWidth, minItemWidth){
    // returns random item width for car/log or spacing between cars/logs
    return Math.floor(Math.random() * (maxItemWidth - minItemWidth) + minItemWidth)
  },
  itemSpacing(minSpacing, maxSpacing, gridUnit) {
    let minUnits =  minSpacing * gridUnit
    let maxUnits = maxSpacing * gridUnit
    // gets random spacing based off of min and max item spacing values, and rounds it down to the nearest 10
    return Math.floor((Math.floor(Math.random() * maxUnits) + minUnits) / 10) * 10
  },
};
