import { Row } from './Row'
import { Car } from './Car'
import { Log } from './Log'
import { Frog } from './Frog'
import G from './Globals'
import Keys from './Keys'
import Random from './Random'

// set global timing variables
let lastRender = 0
let throttleInterval = 0

function update(progress) {
  throttleInterval += progress
  for (let row in G.rowArray) {
    G.rowArray[row].items = G.rowArray[row].items.map(item => {
      item.update()
      if (item.hitsFrog(G.Frog)) {
        G.Frog.update(item.direction, item.speed)
      }
      return item
    })
  }
  // throttles key presses so frog doesn't go flying across screen
  if (throttleInterval > 70) {
    if (Keys.isDown(Keys.UP)) { G.Frog.update('UP') }
    if (Keys.isDown(Keys.RIGHT)) { G.Frog.update('RIGHT') }
    if (Keys.isDown(Keys.DOWN)) { G.Frog.update('DOWN') }
    if (Keys.isDown(Keys.LEFT)) { G.Frog.update('LEFT') }
    throttleInterval = 0
  }

}

function draw() {
  // Get canvas context
  const canvas = document.getElementsByClassName('canvas')[0]
  let ctx = canvas.getContext('2d')

  // Paint page elements
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  Paint.Rows(ctx)
  Paint.Cars(ctx)
  Paint.Frog(ctx)
}

function loop(timestamp) {
  const progress = timestamp - lastRender
  update(progress)
  draw()
  lastRender = timestamp
  window.requestAnimationFrame(loop)
}

// Methods for painting elements to the canvas
const Paint = {
  Rows: function(ctx) {
    G.rowArray.map(row => {
      ctx.fillStyle = 'rgba(50, 180, 50, 0.8)'
      ctx.fillRect(row.xPos, row.yPos, row.w, row.h)
    })
  },
  Cars: function(ctx) {
    G.rowArray.map(row => {
      row.items.map(car => {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)'
        if (car.xPos > ctx.canvas.width + car.w) {
          car.xPos = 0 - car.w
          ctx.fillRect(0 - car.w, car.yPos, car.w, car.h)
          ctx.fillText(`car: ${car.name}`, car.xPos, car.yPos)
        } else if (car.xPos < 0 - car.w) {
          car.xPos = ctx.canvas.width - 20
          ctx.fillRect(ctx.canvas.width + car.w, car.yPos, car.w, car.h)
          ctx.fillText(`car: ${car.name}`, car.xPos, car.yPos)
        } else {
          ctx.fillRect(car.xPos, car.yPos, car.w, car.h)
          ctx.fillText(`car: ${car.name}`, car.xPos, car.yPos)
        }
      })
    })
  },
  Frog: function(ctx) {
    ctx.fillStyle = 'rgba(0, 255, 255, 0.8)'
    ctx.fillRect(G.Frog.xPos, G.Frog.yPos, G.Frog.w, G.Frog.h)
  }
}
const Generate = {

  Rows: function() {
    // Get canvas and window dimensions
    const canvas = document.getElementsByClassName('canvas')[0]
    G.canvasWidth = window.innerWidth - 16
    G.canvasHeight = window.innerHeight - 16
    G.rowArray = []
    canvas.width = G.canvasWidth
    canvas.height = G.canvasHeight
    G.minItemWidth = G.canvasWidth / 3
    G.maxItemWidth = G.canvasWidth / 4
    G.gridHeight = G.canvasHeight / G.numGridRows

    let gridRowY = 0
    for (let i = 0; i < G.numGridRows; i++) {
      gridRowY = Math.floor(gridRowY)
      let direction = Random.direction()
      let speed = Random.speed(G.maxRowSpeed, G.minRowSpeed)
      let numItems = Random.itemCount(G.maxItems, G.minItems)
      let startingxPos = Random.startingXPos(G.canvasWidth)

      let row = new Row(0, gridRowY, G.canvasWidth, G.gridHeight, direction, 4)

      for (let j = 0; j < numItems -1; j++) {
        // no cars or logs on top, middle or bottom row
        if (i !== 0 && i !== 5 && i !== 9) {
          let itemWidth = Random.itemWidth(G.maxItemWidth, G.minItemWidth)
          let itemSpacing = Random.itemSpacing(G.maxItemWidth)
          let carName = `car ${j+1} in row ${gridRowY}`
          let item = this.Item('car', {xPos: startingxPos, yPos: row.yPos, w: itemWidth, h: row.h}, row.direction, row.speed, carName)
          row.items.push(item)
          startingxPos += (itemWidth + itemSpacing)
        }
      }
      G.rowArray.push(row)
      gridRowY += G.rowArray[i].h
    }
  },
  Item: function(itemType, dimensions, direction, speed, name) {
    if (itemType = 'car') {
      return new Car(dimensions.xPos, dimensions.yPos, dimensions.w, dimensions.h, direction, speed, name)
    }
  },
  Frog: function() {
    let player = new Frog(G.canvasWidth / 2, G.canvasHeight - G.gridHeight, G.gridHeight, G.gridHeight)
    G.Frog = player
  }
}

window.onload = function(){
  // key bindings
  window.addEventListener('keyup', (e) => { Keys.onKeyUp(e), false})
  window.addEventListener('keydown', (e) => { Keys.onKeyDown(e), false})
  // generate rows and frog
  Generate.Rows()
  Generate.Frog()
  // Run game loop
  window.requestAnimationFrame(loop)
}

/*
  Notes:

  what do we need?
   a rectangle object
   a car object
   a frog object
   a log object
   a row object
   a game loop
*/
