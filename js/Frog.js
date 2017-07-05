import { Rectangle } from './Rectangle'

export function Frog(xpos, ypos, w, h) {
  let frog = new Rectangle(w, h)
  frog.xpos = xpos
  frog.ypos = ypos
  return frog
}
