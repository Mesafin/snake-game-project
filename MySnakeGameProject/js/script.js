// include the 2d library

const canvas = document.querySelector(".canvas");
const context = canvas.getContext("2d");
// console.log(context);

// how can i make movable snake that grows when feeds

const blockSize = 20;
const rows = canvas.height / blockSize; //25
const columns = canvas.width / blockSize; //25

// array used to save bodies of our snake
let score = 0;
let snakeBody = [];

// just we can initiate the initial head of the snake at(0,0) coordinate

// snakeBody[0] = {
//     x: 0,
//     y: 0,
// };

// to initiate at an random place

snakeBody[0] = {
  x: Math.floor(Math.random() * columns) * blockSize,
  y: Math.floor(Math.random() * rows) * blockSize,
};
// console.log(snakeBody);

let food = {
  x: Math.floor(Math.random() * columns) * blockSize,
  y: Math.floor(Math.random() * rows) * blockSize,
};

// context.fillStyle = "lime";
// context.strokestyle = 'red';
// //  context.fillRect(X, Y, blockSize, blockSize);
// // context.fillRect(10, 10, 20, 20)
// context.fillRect(snakeBody[0].x, snakeBody[0].y, 20, 20)

let d = "right";

document.onkeydown = direction;

function direction(event) {
  let key = event.keyCode;
  if (key == 37 && d != "right") {
    d = "left";
  } else if (key == 38 && d != "down") {
    d = "up";
  } else if (key == 39 && d != "left") {
    d = "right";
  } else if (key == 40 && d != "up") {
    d = "down";
  }
}

let playGame = setInterval(repeat, 100);

function repeat() {
  context.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < snakeBody.length; i++) {
    //draw the snake
    context.fillStyle = "lime";
    context.strokestyle = "red";
    context.fillRect(snakeBody[i].x, snakeBody[i].y, blockSize, blockSize);
    context.strokeRect(snakeBody[i].x, snakeBody[i].y, blockSize, blockSize);
  }

  // draw the food
  context.fillStyle = "red";
  context.strokestyle = "green";
  context.fillRect(food.x, food.y, blockSize, blockSize);
  context.strokeRect(food.x, food.y, blockSize, blockSize);

  let snakeBodyX = snakeBody[0].x;
  let snakeBodyY = snakeBody[0].y;

  if (d == "left") {
    snakeBodyX -= blockSize;
  }
  if (d == "up") {
    snakeBodyY -= blockSize;
  }
  if (d == "right") {
    snakeBodyX += blockSize;
  }
  if (d == "down") {
    snakeBodyY += blockSize;
  }

  if (snakeBodyX > canvas.width) {
    snakeBodyX = 0;
  }
  if (snakeBodyY > canvas.height) {
    snakeBodyY = 0;
  }
  if (snakeBodyX < 0) {
    snakeBodyX = canvas.width;
  }
  if (snakeBodyY < 0) {
    snakeBodyY = canvas.height;
  }

  let newHead = {
    x: snakeBodyX,
    y: snakeBodyY,
  };

  //if the snake eats the food , it grows

if(snakeBodyX == food.x && snakeBodyY == food.y){
  score++;
  food = {
    x: Math.floor(Math.random()*columns) * blockSize,
    y: Math.floor(Math.random()*rows) * blockSize,
  };
  // we don't remove the tail
}else{
  // remove the tail
  snakeBody.pop();
}

  // snakeBody.pop();
  snakeBody.unshift(newHead);
  console.log(snakeBody);
}

// check if the snake is eating itself

function eatSelf(head, array){
  for(let i = 0; i < array.length; i++){
    if(head.x == array[i].x && head.y == array[i].y){
      return true;
    }
  }
  return false;
}
eatSelf();

//game over conditions
// if (snakeX < 0 || snakeX > cols*blockSize || snakeY < 0 || snakeY > rows*blockSize) {
//   gameOver = true;
//   alert("Game Over");
// }

// for (let i = 0; i < snakeBody.length; i++) {
//   if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
//       gameOver = true;
//       alert("Game Over");
//   }
// }



