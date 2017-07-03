import { Row } from './Row'
import Globals from './Globals'

let lastRender = 0

function update(progress) {
  // console.log('updating');
  // console.log(progress);
}

function draw() {

  const canvas = document.getElementsByClassName('canvas')[0]
  Globals.canvasWidth = window.innerWidth - 16
  Globals.canvasHeight = window.innerHeight - 16
  canvas.width = Globals.canvasWidth
  canvas.height = Globals.canvasHeight

  let ctx = canvas.getContext('2d')
  ctx.fillStyle = 'rgba(50, 180, 50, 0.8)'

  for (let i = 0; i < Globals.numGridRows; i++) {
    let row = new Row(Globals.canvasWidth, Globals.canvasHeight / Globals.numGridRows)
    Globals.gridArray.push(row)
  }
  let gridRowY = 0
  for (let i = 0; i < Globals.numGridRows; i++) {
    ctx.fillRect(0, gridRowY, Globals.gridArray[i].w, Globals.gridArray[i].h)
    gridRowY += Globals.gridArray[i].h
  }

}

function loop(timestamp) {
  const progress = timestamp - lastRender
  update(progress)
  draw()
  lastRender = timestamp
  window.requestAnimationFrame(loop)
}

window.onload = function(){
  // Run game loop
  window.requestAnimationFrame(loop)
}

/*

  what do we need?
   a rectangle object
   a car object
   a frog object
   a log object
   a row object
   a game loop
*/
