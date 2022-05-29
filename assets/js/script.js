$(document).ready(function () {
  // SET UP VARIABLES
  var canvas = $("#canvas")[0];
  var context = canvas.getContext("2d");
  var width = $("#canvas").width();
  var height = $("#canvas").height();
  var cell_width = 8;
  var run;
  var snake_food;
  var score;
  var snake_array;

  // CREATE THE SNAKE
  function create_snake() {
    //the size of the snake is 3
    var snake_size = 3;
    //creating the snake array
    snake_array = [];
    // handles snake positioning
    for (var i = 0; i < snake_size; i++) {
      snake_array.push({ x: 45, y: 14 });
    }
  }

  // CREATE SNAKE FOOD
  function create_food() {
    // displays food randomly based on the x and y ordinates of the canvas
    snake_food = {
      x: Math.round((Math.random() * (width - cell_width)) / cell_width),
      y: Math.round((Math.random() * (height - cell_width)) / cell_width),
    };
  }

  // CREATE GAME STAGE
  function stage_color() {
    context.fillStyle = "grey";
    context.fillRect(0, 0, width, height);
    context.strokeStyle = "#000000";
    context.strokeRect(0, 0, width, height);
  }

  // CREATES SNAKE SPRITE
  function snake_body(x, y) {
    context.fillStyle = "#ffffff";
    context.fillRect(x * cell_width, y * cell_width, cell_width, cell_width);
    context.strokeStyle = "#000000";
    context.strokeRect(x * cell_width, y * cell_width, cell_width, cell_width);
  }

  // HANDLES COLLISION WHEN SNAKE RUNS INTO ITSELF
  function collision(x, y, array) {
    for (var i = 0; i < array.length; i++) {
      // this will check if the snake hit its own body, and will return true
      if (array[i].x == x && array[i].y == y) {
        return true;
      }
    }
    // if not return false
    return false;
  }

  // CREATES SNAKE MOVEMENT
  $(document).keydown(function (e) {
    var key = e.which;
    // check if the key you pressed is arrow down
    if (key == "40" && run != "up") {
      run = "down";
    }
    // check if the key you pressed is arrow right
    else if (key == "39" && run != "left") {
      run = "right";
    }
    // check if the key you pressed is arrow up
    else if (key == "38" && run != "down") {
      run = "up";
    }
    //check if the key you pressed is arrow left
    else if (key == "37" && run != "right") {
      run = "left";
    }
  });

  // GAME CONFIG
  function config() {
    // display the stage
    stage_color();

    var pop_x = snake_array[0].x;
    var pop_y = snake_array[0].y;

    //check the variable run
    switch (run) {
      case "right": //if run == right
        pop_x++; //the movement of the snake will be right
        break;
      case "left": //if run == left
        pop_x--; //the movement of the snake will be left
        break;
      case "down": //if run == down
        pop_y++; //the movement of the snake will be down
        break;
      case "up": //if run == up
        pop_y--; //the movement of the snake will be up
        break;
    }
    // check if the snake collide within the boundary of the canvas or the snake collide with its own body
    if (
      pop_x == -1 ||
      pop_x == width / cell_width ||
      pop_y == -1 ||
      pop_y == height / cell_width ||
      collision(pop_x, pop_y, snake_array)
    ) {
      // if true the game will restart
      start();
      return;
    }

    // check if the snake collide with the food
    if (pop_x == snake_food.x && pop_y == snake_food.y) {
      // if true assign the variable for the snake tail
      var snake_tail = { x: pop_x, y: pop_y };
      score += 3; // add a score
      create_food(); // create another food randomly
    } else {
      // if false create variable for snake tail
      var snake_tail = snake_array.pop();
      snake_tail.x = pop_x; //assign variable for the x ordinate of snake
      snake_tail.y = pop_y; //assign variable for the y ordinate of snake
    }

    // if the condition is true it will add the value of the food inside the snake_array
    snake_array.unshift(snake_tail);
    for (var i = 0; i < snake_array.length; i++) {
      //if there's a new valued inside the snake_array it will increment
      var c = snake_array[i]; //assigned the incremented valued
      snake_body(c.x, c.y); // then will increase the size of the snake
    }

    snake_body(snake_food.x, snake_food.y); //increase the snake body in the correct position
    var score_text = "Score: " + score; // assign the variable of score
    context.fillText(score_text, 5, 10); // display the score
  }

  // INITIALIZE GAME
  start(); // this will start running the game

  function start() {
    run = "left"; // this is the default movement of the snake
    create_snake(); // will create the food
    create_food(); // will create the snake
    score = 0; // display the default score

    // check if the loop of the game is undefined and initialize the game simultaneously
    if (typeof game_start != "undefined") clearInterval(game_start);
    game_start = setInterval(config, 60); //this the fps of the game when running
  }
});
