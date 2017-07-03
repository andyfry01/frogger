import { Row } from './Row'
import Globals from './Globals'

let lastRender = 0

function update(progress) {
  // console.log('updating');
  // console.log(progress);
}

function draw() {

  // Get canvas and window dimensions
  const canvas = document.getElementsByClassName('canvas')[0]
  Globals.canvasWidth = window.innerWidth - 16
  Globals.canvasHeight = window.innerHeight - 16
  Globals.gridArray = []
  canvas.width = Globals.canvasWidth
  canvas.height = Globals.canvasHeight

  // Get canvas context
  let ctx = canvas.getContext('2d')
  ctx.fillStyle = 'rgba(50, 180, 50, 0.8)'

  // Paint page elements
  Paint.Rows(ctx)

}

function loop(timestamp) {
  const progress = timestamp - lastRender
  update(progress)
  draw()
  lastRender = timestamp
  // console.log(Globals.gridArray);
  window.requestAnimationFrame(loop)
}

// Methods for painting elements to the canvas
const Paint = {
  Rows: function(ctx){
    let gridRowY = 0
    for (let i = 0; i < Globals.numGridRows; i++) {
      let row = new Row(0, gridRowY, Globals.canvasWidth, Globals.canvasHeight/Globals.numGridRows)
      Globals.gridArray.push(row)
      gridRowY += Globals.gridArray[i].h
    }
    for (let i = 0; i < Globals.numGridRows; i++) {
      let row = Globals.gridArray[i]
      ctx.fillRect(row.xpos, row.ypos, row.w, row.h)
    }
  }
}

window.onload = function(){
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
