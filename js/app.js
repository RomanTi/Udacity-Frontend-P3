// Enemies our player must avoid
'use strict';
var Enemy = function() {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started
  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/enemy-bug.png';
  this.x = Math.floor(Math.random() * 505); // Initializes x-position randomly between 0 and 505
  var rand_y = [230,145,60]; // Three possible vertical positions for enemies
  this.y = rand_y[Math.floor(Math.random() * 3)]; // Random selection of vertical position
  this.speed = Math.floor(Math.random() * 150) + 50; // Randomizes speed
  this.width = 70;
  this.height = 50;
};
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  this.x += this.speed * dt;
  if (this.x >= 505) {
    this.x = 0;
  }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function () {
  this.sprite = 'images/char-boy.png';
  this.respawn(); // Sets initial position of player - see below
  this.dy = 85; // Step of the player vertically
  this.dx = 100; // Step of the player horizontally
  this.width = 85;
  this.height = 85;
};

// Returns player to initial location
Player.prototype.respawn = function() {
  this.x = 200;
  this.y = 390;
};


Player.prototype.update = function() {

  if ( this.x < 0 ) {  // Left bounary
    this.x = 0;
  }
  if ( this.x > 400 ) { // Right boundary
    this.x = 400;
  }
  if ( this.y > 390 ) { // Bottom boundary
    this.y = 390;
  }
  if ( this.y < 50 ) {  // Player wins
   this.respawn();
  }
  this.checkCollisions(); // Checks for collistions with enemies
};


// Returns true if two images are intersecting - see http://stackoverflow.com/questions/2752349/fast-rectangle-to-rectangle-intersection
Player.prototype.intersectRect = function (r1, r2) {

  r1.left = r1.x;
  r2.left = r2.x;
  r1.right = r1.x + r1.width;
  r2.right = r2.x + r2.width;
  r1.top = r1.y;
  r2.top = r2.y;
  r1.bottom = r1.y + r1.height;
  r2.bottom = r2.y + r2.height;

  return !(r2.left > r1.right ||
           r2.right < r1.left ||
           r2.top > r1.bottom ||
           r2.bottom < r1.top);
};


// Checks collisions
Player.prototype.checkCollisions = function() {
  numberOfEnemies = allEnemies.length;
  for (var i = 0; i < numberOfEnemies; i++) {
    if (this.intersectRect(player, allEnemies[i])) {
      this.respawn();
    }
  }
};

// Draws player
Player.prototype.render = Enemy.prototype.render;


// Handles input from the keyboard, works together with addEventListener function
Player.prototype.handleInput = function(key) {
  if (key === 'up') {
    this.y -= this.dy;
  }
  if (key === 'down') {
    this.y += this.dy;
  }
  if (key === 'left') {
    this.x -= this.dx;
  }
  if (key === 'right') {
    this.x += this.dx;
  }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player = new Player();
var numberOfEnemies = 3;
var allEnemies = [];
var enemy = function () {
  for (var i = 0; i < numberOfEnemies; i++) {
    enemy = new Enemy();
    allEnemies.push(enemy);
  }
};
enemy();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };
  player.handleInput(allowedKeys[e.keyCode]);
});
