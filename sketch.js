// the global variable declaration
// canvas and the background image variable
var canvas, backgroundImage;

// gameState and finished players variable
var gameState = 0, finishedPlayers;
// plaeyer count, all players , distance, database
var playerCount;
var allPlayers;
var distance = 0;
var database;

// form, player and game variable
var form, player, game;

// background variables
var formBackground;
var gameBackground;
var gameBackground2;

var bulletX, bulletY;
// var position, playerPosition;

// the ship players - - total 4 player
var ship1, ship2, ship3, ship4;
// the ships variable
var ships;

// the obstacles variable and the obstacle image variable
var obstacles, obstaclesImage;

// the bullet and the bullet image variable
var bullet, bulletImage, bulletsGroup;

// the score variable
var score = 0;

// making the rocks destroy counter variable
var rocksDestroyed = 0;

var scoreText, rocksText;

// the preload function
function preload(){
  // background of form -- scenery
  formBackground = loadImage("images/loginbackgr.jpg");
  // game background image -- scenery
  gameBackground = loadImage("images/outers.jpg");
  // game background image -- solid colour
  gameBackground2 = loadImage("images/Solid_background.jpg");


  // ship images
  ship1img = loadImage("images/shipBlue.png");
  ship2img = loadImage("images/shipBrown.png");
  ship3img = loadImage("images/shipRed.png");
  ship4img = loadImage("images/shipYellow.png");

  // obstacles image
  obstaclesImage = loadImage("images/obstacle.png");

  // bullet image
  bulletImage = loadImage("images/bullet.png");
}

// the setup function
function setup(){
  canvas = createCanvas(displayWidth , displayHeight);
  database = firebase.database();
  gameState = 0;
  distance = 0;
 // finishedPlayers = 0;
  yVel = 0;
  xVel = 0;

  // creating the obstacles group
  obstaclesGroup = createGroup();
  // creating the bulletsGroup
  bulletsGroup = createGroup();

  xSet = false;
  game = new Game();
  game.getState();
  game.start();
  // playerPosition = database.ref("Player1/position");
  // playerPosition.on("value", readPosition);

}

// the draw funciton 
function draw(){
   //start the game
   background(formBackground);

   
   scoreText = createElement('h2');
   scoreText.html("Score = "+score);
   scoreText.position(10, 10);
   scoreText.style('color', 'whitesmoke');
   scoreText.style('font-size', '40px');
   scoreText.style('font-family', 'calibri');

   rocksDestroyedText = createElement('h1');
   rocksDestroyedText.html("RocksDestroyed = "+rocksDestroyed);
   rocksDestroyedText.position(10, 80);
   rocksDestroyedText.style('color', 'whitesmoke');
   rocksDestroyedText.style('font-size', '40 px');
   rocksDestroyedText.style('font-family', 'calibri');


   spawnObstacles();
   //start the game
   if (playerCount === 4 ) {
     game.update(1);
     //fill('yellow');
     //textSize(35);
     //text("all players joined", displayWidth/2 - 225, displayHeight/2 - 100);
     background(gameBackground2);
     background.velocityY = 2;
     if(frameCount%60 == 0){
       spawnObstacles();
     }
   }
   else
   {
     fill('yellow');
     textSize(35);
     text("Waiting for others players" , displayWidth/2 - 200, displayHeight/2 - 200);
     text("no of players:- " + playerCount, displayWidth/2 - 50, displayHeight/2 - 100);
   }
 
   //start the game for real
   if (gameState === 1) {
     game.play();
   }
  //  displaying end when the gameState is 2
   if (gameState === 2) {
     console.log("End");
   }
  //  making the rocks destry if the bullets touch the rocks and disappearing the bullets after they destroy the rocks.
  if(bulletsGroup.isTouching(obstaclesGroup)){
    obstaclesGroup.destroyEach();
    rocksDestroyed+=1;
    score+=1;
    bullet.destroy();
    spawnObstacles();
  }
  }
   
  // the read position function
// function readPosition(data){
  // reading the database position
  // changing the ballx  and ball y position to the database position
  // position = data.val();
  // player.x = Player1.position.x;
  //player.y = Player1.position.y;
// }


// the spawn obstacles function
function spawnObstacles(){
// creating the obstacles
    // giving a random widtha and height to the obstacles
    w = random(200,950);
    h = random(-height*4,height - 300);
    // creating the obstacles sprite
    obstacles = createSprite(random(0,displayWidth), -10,w,h);
    // adding image to the obstacles sprite
    obstacles.addImage("obstacle-image", obstaclesImage);
    obstacles.velocityY = 3;
    obstacles.scale = 0.1;
    obstacles.lifetime = (displayHeight/3);
    // adding the created obstacles to the obstaclesGroup
    obstaclesGroup.add(obstacles);
}


function mouseClicked(){
  //Player.getPlayerInfo();
  bullet = createSprite(bulletX, bulletY, 10, 10);
  bullet.addImage("bulletImage", bulletImage);
  bullet.velocityY = -2;
  bulletsGroup.add(bullet);
}
