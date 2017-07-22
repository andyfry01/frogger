import { Rectangle } from './Rectangle'

export function Frog(xPos, yPos, w, h) {
  // basics
  let frog = new Rectangle(w, h)
  frog.xPos = xPos
  frog.yPos = yPos

  // used for collision detecting
  frog.topEdge = frog.yPos
  frog.rightEdge = frog.xPos + frog.w
  frog.bottomEdge = frog.yPos + frog.h
  frog.leftEdge = frog.xPos

  // moves the frog!
  frog.move = function(direction){
    if (direction === 'UP') {
      frog.yPos -= frog.h
      frog.topEdge = frog.yPos
    }
    if (direction === 'RIGHT') {
      frog.xPos += frog.w
      frog.rightEdge = frog.xPos + frog.w
    }
    if (direction === 'DOWN') {
      frog.yPos += frog.h
      frog.topEdge = frog.yPos
      frog.bottomEdge = frog.yPos + frog.h
    }
    if (direction === 'LEFT') {
      frog.xPos -= frog.w
      frog.leftEdge = frog.xPos
    }
  }
  return frog
}
