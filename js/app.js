import { Row } from './Row'
import G from './Globals'

let lastRender = 0

function update(progress) {
  for (let item in G.rowArray) {
    let row = G.rowArray[item]
    row.xpos += row.speed * row.direction
    G.rowArray.splice(G.rowArray[item], 1, row)
    console.log(G.rowArray);
  }
}

function draw() {
  // Get canvas context
  const canvas = document.getElementsByClassName('canvas')[0]
  let ctx = canvas.getContext('2d')
  ctx.fillStyle = 'rgba(50, 180, 50, 0.8)'

  // Paint page elements
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  Paint.Rows(ctx)

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
      ctx.fillRect(row.xpos, row.ypos, row.w, row.h)
    }
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

    let gridRowY = 0
    for (let i = 0; i < G.numGridRows; i++) {
      let direction = Math.floor(Math.random() * 100 + 1)
      let speed = Math.floor(Math.random(G.maxRowSpeed - G.minRowSpeed) + G.minRowSpeed)
      let row = new Row(0, gridRowY, G.canvasWidth, G.canvasHeight/G.numGridRows, direction, speed)
      G.rowArray.push(row)
      gridRowY += G.rowArray[i].h
    }
  }
}

window.onload = function(){
  // Run game loop
  Generate.Rows()
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
