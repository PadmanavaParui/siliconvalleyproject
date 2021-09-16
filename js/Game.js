// the game class
class Game {
  // the constructor function
          constructor(){
          }
        
          // the get state function
          getState(){
            var gameStateRef  = database.ref('gameState');
            gameStateRef.on("value",function(data){
               gameState = data.val();
            })
          }
        
          // the updaqte state function
          update(state){
            database.ref('/').update({
              gameState: state
            });
          }
        
          // the start function
          async start(){
            if(gameState === 0){
              player = new Player();
              var playerCountRef = await database.ref('playerCount').once("value");
              if(playerCountRef.exists()){
                playerCount = playerCountRef.val();
                player.getCount();
              }
              form = new Form()
              form.display();
            }

            // creating the ships
            ship1 = createSprite(700, 200, 10, 10);
            ship1.debug = "true";
            ship1.setCollider("rectangle", 0,0,50,45);
            ship1.addImage("player1", ship1img);

            ship2 = createSprite(700, 200, 10, 10);
            ship2.debug = "true";
            ship2.setCollider("rectangle", 0,0,50,45);
            ship2.addImage("player2", ship2img);
            
            ship3 = createSprite(700, 200, 10, 10);
            ship3.debug = "true";
            ship3.setCollider("rectangle", 0,0,50,45);
            ship3.addImage("player3", ship3img);
            
            ship4 = createSprite(700, 200, 10, 10);
            ship4.debug = "true";
            ship4.setCollider("rectangle", 0,0,50,45);
            ship4.addImage("player4", ship4img);


            // creatin the ship array
            ships = [ship1, ship2, ship3, ship4];
          }
        
          // the play function
         play(){
            form.hide();
        
            Player.getPlayerInfo();
                       
              //index of the array
              var index =0;
        
              //x and y position of the ships
              var x=100;
              var y = 100;
        
            for(var plr in allPlayers){
                //add 1 to the index for every loop
               index = index + 1 ;
              x = 100 + (index * 200) + allPlayers[plr].xPos;
              y = 700 + (index * 1) + allPlayers[plr].yPos;

              //position the cars a little away from each other in x direction
              //x = displayHeight - allPlayers[plr].xPos;
                //use data form the database to display the cars in y direction
              //y = displayHeight - allPlayers[plr].yPos;
                
              ships[index-1].x = x;
              ships[index-1].y = y;
              
                /*textAlign(CENTER);
                textSize(20);
               text(allPlayers[plr].name, ships[index - 1].x, ships[index - 1].y + 75);
                if (index === player.index){
                  camera.position.x = displayWidth/2;
                  camera.position.y = ships[index-1].y
                    if( ships[index - 1].isTouching(obstacles)){
                      s.play();
                      yVel -= 0.9;
                    }                          
                }*/
        
            }
            
              // move the player down
              if((keyIsDown(40)||keyIsDown(87)) && player.index !== null){
                yVel += 0.9;   
              } 
              // move the player up 
              if((keyIsDown(38)||keyIsDown(83)) && player.index !== null){
                yVel -= 0.9;
              }  
              // move the player to the right
              if((keyIsDown(39)||keyIsDown(68))&&player.index !== null){
                xVel += 0.9;
              }
              // move the player to the left
              if((keyIsDown(37)||keyIsDown(65))&&player.index !== null){
                xVel -= 0.9;
              }
              // stop the player ------- brake
              if((keyIsDown(17)&&keyIsDown(32)) && player.index !== null){
                yVel = 0;
                xVel = 0;
              }

        
            /*else if(passedFinish === false){
              yVel *= 0.7;
              xVel *= 0.7;
              Player.updateFinishedPlayers();
              player.place = finishedPlayers;
  
              player.update();
              passedFinish = true;
          }else{
              yVel *= 0.8;
              xVel *= 0.8;
          }
          */
          
          if(index === player.index){
          // making the ships destroy if the ships is touching the rocks
          if(ships[index - 1].isTouching(obstaclesGroup)){
            ships[index - 1].destroy();
          }  
          }

        
          //move the players
          //player.distance += yVel;
          player.yPos += yVel;
          yVel *= 0.98;
          player.xPos += xVel;
          xVel *= 0.98;
          player.update();

          bulletX = player.xPos;
          bulletY = player.yPos;
          //display sprites
          drawSprites();
        }
/*
        // the spawn bullets function
 spawnBullets(){
  bullet = createSprite(player.xPos, player.yPos, 10, 10);
  bullet.addImage("firing", bulletImage);
  bullet.scale = 1;
  bulletsGroup.add(bullet);
}
*/
/*
bull(){
  bullet = createSprite(player.xPos, player.yPos, 5, 7);
  bullet.velocityY = -2;
  bullet.addImage("bulletImage", bulletImage);
}
*/
}