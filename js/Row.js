import { Rectangle } from './Rectangle'

export function Row(xPos, yPos, w, h, direction, speed) {
  let row = new Rectangle(w, h)
  row.xPos = xPos
  row.yPos = yPos
  if (direction <= 50) {
    row.direction = -1
  } else {
    row.direction = 1
  }
  row.speed = speed
  row.items = []
  return row
}
