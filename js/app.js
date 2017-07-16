import { Row } from './Row'
import { Car } from './Car'
import { Frog } from './Frog'
import G from './Globals'
import Keys from './Keys'

let lastRender = 0
let debounce = 0

function update(progress) {
  debounce += progress
  for (let row in G.rowArray) {
    G.rowArray[row].items = G.rowArray[row].items.map(item => {
      item.xpos += item.speed * item.direction
      return item
    })
  }
  // debounces key presses so frog doesn't go flying across screen
  if (debounce > 70) {
    if (Keys.isDown(Keys.UP)) { G.Frog.move('UP') }
    if (Keys.isDown(Keys.RIGHT)) { G.Frog.move('RIGHT') }
    if (Keys.isDown(Keys.DOWN)) { G.Frog.move('DOWN') }
    if (Keys.isDown(Keys.LEFT)) { G.Frog.move('LEFT') }
    debounce = 0
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
    for (let i = 0; i < G.rowArray.length; i++) {
      let row = G.rowArray[i]
      ctx.fillStyle = 'rgba(50, 180, 50, 0.8)'
      ctx.fillRect(row.xpos, row.ypos, row.w, row.h)
    }
  },
  Cars: function(ctx) {
    for (let i = 0; i < G.rowArray.length; i++) {
      for (let item in G.rowArray[i].items) {
        let car = G.rowArray[i].items[item]
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)'
        if (car.xpos > ctx.canvas.width + car.w) {
          car.xpos = 0 - car.w
          ctx.fillRect(0 - car.w, car.ypos, car.w, car.h)
          ctx.fillText(`car: ${car.name}`, car.xpos, car.ypos)

        } else if (car.xpos < 0 - car.w) {
          car.xpos = ctx.canvas.width - 20
          ctx.fillRect(ctx.canvas.width + car.w, car.ypos, car.w, car.h)
          ctx.fillText(`car: ${car.name}`, car.xpos, car.ypos)

        } else {
          ctx.fillRect(car.xpos, car.ypos, car.w, car.h)
          ctx.fillText(`car: ${car.name}`, car.xpos, car.ypos)

        }
      }
    }
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
      let direction = Math.floor(Math.random() * 100 + 1)
      let speed = Math.floor(Math.random() * (G.maxRowSpeed - G.minRowSpeed) + G.minRowSpeed)
      let row = new Row(0, gridRowY, G.canvasWidth, G.gridHeight, direction, 4)
      let numItems = Math.floor(Math.random() * (G.maxItems - G.minItems) + G.minItems)
      let startingXPos = Math.floor(Math.random() * (G.canvasWidth - 0) + 0)
      for (let j = 0; j < numItems -1; j++) {
        if (i !== 0 && i !== 5 && i !== 9) {
          let itemWidth = Math.floor(Math.random() * (G.maxItemWidth - G.minItemWidth) + G.minItemWidth)
          let itemSpacing = Math.floor(Math.random() * 100 + 50) + G.maxItemWidth
          let carName = j + 1
          let item = this.Item('car', {xpos: startingXPos, ypos: row.ypos, w: itemWidth, h: row.h}, row.direction, row.speed, carName)
          row.items.push(item)
          startingXPos += (itemWidth + itemSpacing)
        }
      }
      G.rowArray.push(row)
      console.log(row);
      gridRowY += G.rowArray[i].h
    }
  },
  Item: function(itemType, dimensions, direction, speed, name) {
    if (itemType = 'car') {
      return new Car(dimensions.xpos, dimensions.ypos, dimensions.w, dimensions.h, direction, speed, name)
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
