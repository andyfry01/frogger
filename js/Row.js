import { Rectangle } from './Rectangle'

export function Row(xpos, ypos, w, h) {
  let row = new Rectangle(w, h)
  row.xpos = xpos
  row.ypos = ypos
  return row
}
