import { Rectangle } from './Rectangle'

window.onload = function(){
  const canvas = document.getElementsByClassName('canvas')[0]
  let canvasHeight = window.innerHeight - 16
  let canvasWidth = window.innerWidth - 16
  canvas.width = canvasWidth
  canvas.height = canvasHeight
  let ctx = canvas.getContext('2d')
  ctx.fillStyle = "blue"
  ctx.fillRect(100, 100, 100, 100)

}

/*

  what do we need?
   a rectangle object
   a car object
   a frog object
   a log object
   a row object

*/
