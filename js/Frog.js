import { Rectangle } from './Rectangle'

export function Frog(xPos, yPos, w, h) {
  let frog = new Rectangle(w, h)
  frog.xPos = xPos
  frog.yPos = yPos
  frog.move = function(direction){
    if (direction === 'UP') {
      frog.yPos -= frog.h
    }
    if (direction === 'RIGHT') {
      frog.xPos += frog.w
    }
    if (direction === 'DOWN') {
      frog.yPos += frog.h
    }
    if (direction === 'LEFT') {
      frog.xPos -= frog.w
    }
  }
  return frog
}
