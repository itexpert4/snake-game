// Get the canvas element from the HTML document
let canvas = document.getElementById('game');
// Get the 2D rendering context for the canvas
let context = canvas.getContext('2d');

// Define the size of each square in the game grid
let box = 32;
// Initialize the score
let score = 0;
// Initialize the snake as an array of objects
let snake = [];
snake[0] = {
    x: 10 * box,
    y: 10 * box
}

// Set the initial direction of the snake
let direction = "right";
// Create the food at a random position
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

// Function to draw the game background
function createBG() {
    context.fillStyle = "lightgreen";
    context.fillRect(0, 0, 16 * box, 16 * box);
}

// Function to draw the snake
function createSnake() {
    for(i = 0; i < snake.length; i++) {
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

// Function to draw the food
function drawFood() {
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}

// Event listener for arrow keys to change the direction of the snake
document.addEventListener('keydown', update);

function update(event) {
    if(event.keyCode == 37 && direction != 'right') direction = 'left';
    if(event.keyCode == 38 && direction != 'down') direction = 'up';
    if(event.keyCode == 39 && direction != 'left') direction = 'right';
    if(event.keyCode == 40 && direction != 'up') direction = 'down';
}

// Main game function
function startGame() {
    // Check if the snake has hit the border and wrap it around to the other side
    if(snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    if(snake[0].x < 0 && direction == 'left') snake[0].x = 16 * box;
    if(snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    if(snake[0].y < 0 && direction == 'up') snake[0].y = 16 * box;

    // Check if the snake has hit itself
    for(i = 1; i < snake.length; i++) {
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            clearInterval(game);
            alert('Game Over :(');
        }
    }

    // Draw the game elements
    createBG();
    createSnake();
    drawFood();

    // Move the snake
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if(direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;

    // Check if the snake has eaten the food
    if(snakeX != food.x || snakeY != food.y) {
        // Remove the last segment of the snake
        snake.pop();
    } else {
        // Generate new food and increase the score
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
        score++;
    }

    // Create a new head for the snake
    let newHead = {
        x: snakeX,
        y: snakeY
    }

    // Add the new head to the front of the snake
    snake.unshift(newHead);
}

// Start the game loop
let game = setInterval(startGame, 100);