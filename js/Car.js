import { Rectangle } from './Rectangle';
import G from './Globals';

export function Car(xPos, yPos, w, h, direction, speed) {
  // basics
  const car = new Rectangle(w, h);
  car.xPos = xPos;
  car.yPos = yPos;
  car.type = 'car';

  // used for moving car on update
  car.direction = direction;
  car.speed = speed;

  // used for collision detecting
  car.topEdge = car.yPos;
  car.rightEdge = car.xPos + car.w;
  car.bottomEdge = car.yPos + car.h;
  car.leftEdge = car.xPos;

  // update for each frame
  car.update = function () {
    car.xPos += car.speed * car.direction;
    car.rightEdge = car.xPos + car.w;
    car.leftEdge = car.xPos;
  };

  // collision detecting, returns true if frog comes into contact
  car.hitsFrog = function (frog) {
    if (frog.topEdge === car.topEdge) {
      if (frog.rightEdge > car.leftEdge) {
        if (frog.leftEdge < car.rightEdge) {
          return true;
        }
      }
    }
  };
  return car;
}
