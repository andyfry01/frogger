// import G from 'Globals';
import { Row } from './Row';
import { Car } from './Car';
import { Log } from './Log';
import { Frog } from './Frog';
import Globals from './Globals';
import Keys from './Keys';
import Random from './Random';

let {
  FrogState,
  canvasHeight,
  canvasWidth,
  gridHeight,
  playerLives,
  playerScore,
  maxItems,
  maxItemSpacing,
  maxItemWidth,
  maxRowSpeed,
  minItems,
  minItemSpacing,
  minItemWidth,
  minRowSpeed,
  numGridRows,
  rowArray,
} = Globals;

// set global timing variables
let lastRender = 0;
let throttleInterval = 0;

function update(progress) {
  throttleInterval += progress;
  for (const row in rowArray) {
    rowArray[row].items = rowArray[row].items.map((item) => {
      item.update();
      if (item.hitsFrog(FrogState)) {
        if (item.type === 'car') {
          endGame('lose');
        } else if (item.type === 'log') {
          FrogState.update(item.direction, item.speed);
        }
      }
      return item;
    });
  }
  // throttles key presses so frog doesn't go flying across screen
  if (throttleInterval > 70) {
    if (Keys.isDown(Keys.UP)) { FrogState.update('UP'); }
    if (Keys.isDown(Keys.RIGHT)) { FrogState.update('RIGHT'); }
    if (Keys.isDown(Keys.DOWN)) { FrogState.update('DOWN'); }
    if (Keys.isDown(Keys.LEFT)) { FrogState.update('LEFT'); }
    throttleInterval = 0;
  }
  checkGameStatus(FrogState);
}

function draw() {
  // Get canvas context
  const canvas = document.getElementsByClassName('canvas')[0];
  const ctx = canvas.getContext('2d');
  // Paint page elements
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  Paint.Rows(ctx);
  Paint.Cars(ctx);
  Paint.Frog(ctx);
  Paint.GameInfo(ctx, playerScore, playerLives);
}

function loop(timestamp) {
  const progress = timestamp - lastRender;
  update(progress);
  draw();
  lastRender = timestamp;
  window.requestAnimationFrame(loop);
}

function endGame(gameStatus) {
  if (gameStatus === 'win') {
    incrementScore();
  }
  if (gameStatus === 'lose') {
    decrementLives();
  }
  if (gameStatus === 'game over') {
    console.log('stub for game over condition');
  }
  restartGame();
}

function incrementScore() {
  console.log('incrementScore fired');
  playerScore += 1;
}

function decrementLives() {
  playerLives -= 1;
}

function restartGame() {
  // kill the old frog
  FrogState = undefined;
  // put a new one in the starting position
  Generate.Frog();
}

function checkGameStatus(frog) {
  // check if frog is off screen
  if (frog.xPos > canvasWidth || frog.xPos < 0 - frog.w || frog.yPos > canvasHeight - frog.h) {
    endGame('lose');
  }
  // check if frog has made it to the end of the level
  if (frog.yPos === 0) {
    console.log('frog wins?');
    endGame('win');
  }
  if (playerLives <= 0) {
    endGame('game over');
  }
}

// Methods for painting elements to the canvas
const Paint = {
  Rows(ctx) {
    rowArray.forEach((row) => {
      ctx.fillStyle = 'rgba(50, 180, 50, 0.8)';
      ctx.fillRect(row.xPos, row.yPos, row.w, row.h);
    });
  },
  Cars(ctx) {
    rowArray.forEach((row) => {
      row.items.forEach((car) => {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        if (car.xPos > ctx.canvas.width + (maxItemWidth * gridHeight)) {
          car.xPos = 0 - (maxItemWidth * gridHeight);
        }
        if (car.xPos < 0 - (maxItemWidth * gridHeight)) {
          car.xPos = ctx.canvas.width + (maxItemWidth * gridHeight);
        }
        ctx.fillRect(car.xPos, car.yPos, car.w, car.h);
        ctx.fillText(`car: ${car.name}`, car.xPos, car.yPos);
      });
    });
  },
  Frog(ctx) {
    ctx.fillStyle = 'rgba(0, 255, 255, 0.8)';
    ctx.fillRect(FrogState.xPos, FrogState.yPos, FrogState.w, FrogState.h);
  },
  GameInfo(ctx, score, lives) {
    ctx.font = '18px Cambria';
    ctx.fillText(`Score: ${score}`, 10, 25);
    ctx.fillText(`Lives: ${lives}`, 100, 25);
  },

};

const Generate = {

  Rows() {
    function getXPositions(numItems) {
      let currentXPos;
      const xPositions = [];
      const startingXPositions = [10, 115, 300, 450];
      for (let i = 0; i < numItems; i++) {
        xPositions.push(0);
      }
      return xPositions.map((item, iteration) => {
        if (iteration === 0) {
          const randomStartingPoint = Math.floor(Math.random() * startingXPositions.length);
          currentXPos = startingXPositions[randomStartingPoint];
          return currentXPos;
        }
        if (iteration > 0) {
          currentXPos = currentXPos += Random.itemSpacing(minItemSpacing, maxItemSpacing, gridHeight);
          return currentXPos;
        }
      });
    }

    let gridRowY = 0;
    for (let i = 0; i < numGridRows; i++) {
      gridRowY = Math.floor(gridRowY);
      const direction = Random.direction();
      const speed = Random.speed(maxRowSpeed, minRowSpeed);
      const numItems = Random.itemCount(maxItems, minItems);
      const xPositions = getXPositions(numItems);

      const row = new Row(0, gridRowY, canvasWidth, gridHeight, direction, 4);

      // no cars or logs on top, middle or bottom row
      if (i !== 0 && i !== 5 && i !== 9) {
        for (let j = 0; j < numItems; j++) {
          const maxWidthInUnits = maxItemWidth * gridHeight;
          const minWidthInUnits = minItemWidth * gridHeight;
          const itemWidth = Random.itemWidth(maxWidthInUnits, minWidthInUnits);

          const item = this.Item('car', {
            xPos: xPositions[j], yPos: row.yPos, w: itemWidth, h: row.h,
          }, row.direction, row.speed);
          row.items.push(item);
        }
      }
      rowArray.push(row);
      gridRowY += rowArray[i].h;
    }
  },
  Item(itemType, dimensions, direction, speed) {
    if (itemType = 'car') {
      return new Car(dimensions.xPos, dimensions.yPos, dimensions.w, dimensions.h, direction, speed);
    }
  },
  Frog() {
    const player = new Frog(canvasWidth / 2, canvasHeight - gridHeight, gridHeight, gridHeight);
    FrogState = player;
  },
};

window.onload = function () {
  // Get canvas and window dimensions
  const canvas = document.getElementsByClassName('canvas')[0];
  // Initial setup for global variables
  // canvas width and height being rounded down to nearest multiple of 10
  canvasWidth = Math.floor((window.innerWidth - 16) / 10) * 10;
  canvasHeight = Math.floor((window.innerHeight - 16) / 10) * 10;
  rowArray = [];
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  gridHeight = canvasHeight / numGridRows;

  // key bindings
  window.addEventListener('keyup', (e) => { Keys.onKeyUp(e), false; });
  window.addEventListener('keydown', (e) => { Keys.onKeyDown(e), false; });
  // generate rows and frog
  Generate.Rows();
  Generate.Frog();
  // Run game loop
  window.requestAnimationFrame(loop);
};

/*
  Notes:

  what do we need?
   a rectangle object
   a car object
   a frog object
   a log object
   a row object
   a game loop
*/
