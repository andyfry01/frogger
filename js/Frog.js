import { Rectangle } from './Rectangle';

export function Frog(xPos, yPos, w, h) {
  // basics
  const frog = new Rectangle(w, h);
  frog.xPos = Math.floor(xPos);
  frog.yPos = Math.floor(yPos);

  // used for collision detecting
  frog.topEdge = frog.yPos;
  frog.rightEdge = frog.xPos + frog.w;
  frog.bottomEdge = frog.yPos + frog.h;
  frog.leftEdge = frog.xPos;

  // moves the frog!
  frog.move = function (direction) {
    const frogW = Math.floor(frog.w);
    const frogH = Math.floor(frog.h);
    if (direction === 'UP') {
      frog.yPos -= frogH;
      frog.topEdge -= frogH;
      frog.bottomEdge -= frogH;
    }
    if (direction === 'RIGHT') {
      frog.xPos += frogW;
      frog.rightEdge += frogW;
      frog.leftEdge += frogW;
    }
    if (direction === 'DOWN') {
      frog.yPos += frogH;
      frog.topEdge += frogH;
      frog.bottomEdge += frogH;
    }
    if (direction === 'LEFT') {
      frog.xPos -= frogW;
      frog.leftEdge -= frogW;
      frog.rightEdge -= frogW;
    }
  };

  // update method, for moving frog on key input and when it encounters a car or log
  frog.update = function (direction, speed) {
    console.log('updating?');
    // if direction isn't an integer and if no speed is given, it is user input
    if (!parseInt(direction) && speed === undefined) {
      frog.move(direction);
      console.log(frog.topEdge);
    // if direction IS an integer and there is a speed given, the frog is sitting on a log
    // and should move with the log
    } else {
      frog.xPos += speed * direction;
      frog.rightEdge = frog.xPos + frog.w;
      frog.leftEdge = frog.xPos;
    }
  };
  return frog;
}
