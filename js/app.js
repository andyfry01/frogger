import { Row } from './Row'

window.onload = function(){
  // global stuff
  const canvas = document.getElementsByClassName('canvas')[0]
  let canvasHeight = window.innerHeight - 16
  let canvasWidth = window.innerWidth - 16
  canvas.width = canvasWidth
  canvas.height = canvasHeight

  const numGridRows = 10
  const gridHeight = canvasHeight / numGridRows
  let gridArray = []

  let ctx = canvas.getContext('2d')
  ctx.fillStyle = 'rgba(50, 180, 50, 0.8)'

  for (let i = 0; i < numGridRows; i++) {
    let row = new Row(canvasWidth, canvasHeight / numGridRows)
    gridArray.push(row)
  }
  let gridRowY = 0
  for (let i = 0; i < numGridRows; i++) {
    ctx.fillRect(0, gridRowY, gridArray[i].w, gridArray[i].h)
    gridRowY += gridArray[i].h
  }
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
