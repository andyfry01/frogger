import { Rectangle } from './Rectangle';

export function Log(xPos, yPos, w, h, direction, speed, name) {
  // basics
  const log = new Rectangle(w, h);
  log.xPos = xPos;
  log.yPos = yPos;
  log.name = name;

  // used for moving log on update
  log.direction = direction;
  log.speed = speed;

  // used for collision detecting
  log.topEdge = log.yPos;
  log.rightEdge = log.xPos + log.w;
  log.bottomEdge = log.yPos + log.h;
  log.leftEdge = log.xPos;

  // update for each frame
  log.update = function () {
    log.xPos += log.speed * log.direction;
    log.rightEdge = log.xPos + log.w;
    log.leftEdge = log.xPos;
  };

  // collision detecting, returns true if frog comes into contact
  log.hitsFrog = function (frog) {
    if (frog.topEdge === log.topEdge) {
      if (frog.rightEdge > log.leftEdge) {
        if (frog.leftEdge < log.rightEdge) {
          return true;
        }
      }
    }
  };
  return log;
}
