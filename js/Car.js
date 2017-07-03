import { Rectangle } from './Rectangle'

export function Car(xpos, ypos, w, h, direction, speed) {
  let car = new Rectangle(w, h)
  car.xpos = xpos
  car.ypos = ypos
  car.direction = direction
  car.speed = speed
  return car
}
