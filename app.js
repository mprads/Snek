const canvas = document.getElementById('canvas');
const scoreBoard = document.getElementById('score');
const ctx = canvas.getContext('2d');
const width = 500;
const height = 500;
const squareSize = 10;
let snake = [];
const initalSnakeLength = 5;
const food = {x: 0, y: 0};
let direction = 'left';
const loopInterval = 50;
let score = 0;
let interval;

function drawSquare(x, y, color) {
	ctx.fillStyle = color;
	ctx.fillRect(x, y, squareSize, squareSize);	
}

function createSnake() {
	for(let i=0; i <= initalSnakeLength; i++) {
		snake.push({x: (i * squareSize) + 250, y:250});
	}
}

function drawSnake() {
	for(i = 0; i < snake.length; i++) {
		drawSquare(snake[i].x, snake[i].y, '#08DB72');
	}
}

function createFood() {
	food.x = Math.floor(Math.random() * (((width - squareSize) / 10) - (0 / 10) + 1) + (0 / 10)) * 10;
	food.y = Math.floor(Math.random() * (((height - squareSize) / 10) - (0 / 10) + 1) + (0 / 10)) * 10;

	for(let i=0; i < snake.length; i++) {
		if(checkCollision(snake[i], food)) createFood();
	}
}

function drawFood() {
	drawSquare(food.x, food.y, '#FF005F');
}

function checkCollision(snake, solid) {
	if (snake.x === solid.x && snake.y === solid.y) {
		return true;
	} else {
		return false;
	}
}

function moveSnake() {
	for(let i=1; i < snake.length; i++) {
		if(snake[0].x === snake[i].x && snake[0].y === snake[i].y) restart();
	}
	if (snake[0].x >= width || snake[0].x < 0 || snake[0].y >= height || snake[0].y < 0) restart();
	const newHead = {x: snake[0].x, y: snake[0].y};
	switch (direction) {
		case 'left':
			newHead.x -=squareSize;
			break;
		case 'right':
			newHead.x +=squareSize;
			break;
		case 'up':
			newHead.y -=squareSize;
			break;
		case 'down':
			newHead.y +=squareSize;
			break;
		deafault: 
			console.log('no direction');
	}
	snake.pop();
	snake.unshift(newHead);
	if(checkCollision(newHead, food)) foodEaten();
}

function changeDirection(key) {
	if (key === 37 && direction != 'right') { 
		direction = 'left';
	} else if (key === 38 && direction != 'down') { 
		direction = 'up';
	} else if (key === 39 && direction != 'left') { 
		direction = 'right';
	} else if (key === 40 && direction != 'up') { 
		direction = 'down';
	}
}

function foodEaten() {
	createFood();
	scoreBoard.innerHTML = ++score;
	elongateSnake();
}

function elongateSnake() {
	const tail = snake[snake.length - 1]; 
	snake.push(tail);
}

function gameLoop() {
	ctx.clearRect(0, 0, width, height);
	drawSnake();
	drawFood();
	moveSnake();
}

function run() {
	createSnake();
	createFood();
	interval = setInterval(gameLoop, loopInterval);
}

function restart () {
	clearInterval(interval);
	score = 0;
	scoreBoard.innerHTML = score;
	snake = [];
	direction = 'left';
	run();
}

document.onkeydown = function(event) {
	changeDirection(event.keyCode);
}

run();