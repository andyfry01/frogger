import { Rectangle } from './Rectangle'

export function Row(xpos, ypos, w, h, direction, speed) {
  let row = new Rectangle(w, h)
  row.xpos = xpos
  row.ypos = ypos
  if (direction <= 50) {
    row.direction = -1
  } else {
    row.direction = 1
  }
  row.speed = speed
  return row
}
