import { Row } from './Row';
import { Car } from './Car';
import { Log } from './Log';
import { Frog } from './Frog';
import G from './Globals';
import Keys from './Keys';
import Random from './Random';

// set global timing variables
let lastRender = 0;
let throttleInterval = 0;

function update(progress) {
  throttleInterval += progress;
  for (const row in G.rowArray) {
    G.rowArray[row].items = G.rowArray[row].items.map((item) => {
      item.update();
      if (item.hitsFrog(G.Frog)) {
        if (item.type === 'car') {
          endGame('lose');
        } else if (item.type === 'log') {
          G.Frog.update(item.direction, item.speed);
        }
      }
      return item;
    });
  }
  // throttles key presses so frog doesn't go flying across screen
  if (throttleInterval > 70) {
    if (Keys.isDown(Keys.UP)) { G.Frog.update('UP'); }
    if (Keys.isDown(Keys.RIGHT)) { G.Frog.update('RIGHT'); }
    if (Keys.isDown(Keys.DOWN)) { G.Frog.update('DOWN'); }
    if (Keys.isDown(Keys.LEFT)) { G.Frog.update('LEFT'); }
    throttleInterval = 0;
  }
  checkGameStatus(G.Frog);
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
  Paint.GameInfo(ctx, G.playerScore, G.playerLives);
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
  G.playerScore += 1;
}

function decrementLives() {
  G.playerLives -= 1;
}

function restartGame() {
  // kill the old frog
  G.Frog = undefined;
  // put a new one in the starting position
  Generate.Frog();
}

function checkGameStatus(frog) {
  // check if frog is off screen
  if (frog.xPos > G.canvasWidth || frog.xPos < 0 - frog.w || frog.yPos > G.canvasHeight - frog.h) {
    endGame('lose');
  }
  // check if frog has made it to the end of the level
  if (frog.yPos === 0) {
    console.log('frog wins?');
    endGame('win');
  }
  if (G.playerLives <= 0) {
    endGame('game over');
  }
}

// Methods for painting elements to the canvas
const Paint = {
  Rows(ctx) {
    G.rowArray.forEach((row) => {
      ctx.fillStyle = 'rgba(50, 180, 50, 0.8)';
      ctx.fillRect(row.xPos, row.yPos, row.w, row.h);
    });
  },
  Cars(ctx) {
    G.rowArray.forEach((row) => {
      row.items.forEach((car) => {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        if (car.xPos > ctx.canvas.width + (G.maxItemWidth * G.gridHeight)) {
          car.xPos = 0 - (G.maxItemWidth * G.gridHeight);
        }
        if (car.xPos < 0 - (G.maxItemWidth * G.gridHeight)) {
          car.xPos = ctx.canvas.width + (G.maxItemWidth * G.gridHeight);
        }
        ctx.fillRect(car.xPos, car.yPos, car.w, car.h);
        ctx.fillText(`car: ${car.name}`, car.xPos, car.yPos);
      });
    });
  },
  Frog(ctx) {
    ctx.fillStyle = 'rgba(0, 255, 255, 0.8)';
    ctx.fillRect(G.Frog.xPos, G.Frog.yPos, G.Frog.w, G.Frog.h);
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
          currentXPos = currentXPos += Random.itemSpacing(G.minItemSpacing, G.maxItemSpacing, G.gridHeight);
          return currentXPos;
        }
      });
    }

    let gridRowY = 0;
    for (let i = 0; i < G.numGridRows; i++) {
      gridRowY = Math.floor(gridRowY);
      const direction = Random.direction();
      const speed = Random.speed(G.maxRowSpeed, G.minRowSpeed);
      const numItems = Random.itemCount(G.maxItems, G.minItems);
      const xPositions = getXPositions(numItems);

      const row = new Row(0, gridRowY, G.canvasWidth, G.gridHeight, direction, 4);

      // no cars or logs on top, middle or bottom row
      if (i !== 0 && i !== 5 && i !== 9) {
        for (let j = 0; j < numItems; j++) {
          const maxWidthInUnits = G.maxItemWidth * G.gridHeight;
          const minWidthInUnits = G.minItemWidth * G.gridHeight;
          const itemWidth = Random.itemWidth(maxWidthInUnits, minWidthInUnits);

          const item = this.Item('car', {
            xPos: xPositions[j], yPos: row.yPos, w: itemWidth, h: row.h,
          }, row.direction, row.speed);
          row.items.push(item);
        }
      }
      G.rowArray.push(row);
      gridRowY += G.rowArray[i].h;
    }
  },
  Item(itemType, dimensions, direction, speed) {
    if (itemType = 'car') {
      return new Car(dimensions.xPos, dimensions.yPos, dimensions.w, dimensions.h, direction, speed);
    }
  },
  Frog() {
    const player = new Frog(G.canvasWidth / 2, G.canvasHeight - G.gridHeight, G.gridHeight, G.gridHeight);
    G.Frog = player;
  },
};

window.onload = function () {
  // Get canvas and window dimensions
  const canvas = document.getElementsByClassName('canvas')[0];
  // Initial setup for global variables
  // canvas width and height being rounded down to nearest multiple of 10
  G.canvasWidth = Math.floor((window.innerWidth - 16) / 10) * 10;
  G.canvasHeight = Math.floor((window.innerHeight - 16) / 10) * 10;
  G.rowArray = [];
  canvas.width = G.canvasWidth;
  canvas.height = G.canvasHeight;
  G.gridHeight = G.canvasHeight / G.numGridRows;

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
