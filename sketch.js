var trex,trex1,trex2, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score;
var PLAY = 1;
var END = 0;
var gameState = PLAY;

var restartImg,restart,gameOverImg,gameOver;

var distance = 0;
var canvas, backgroundImage;
var form, player, game;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
}

function setup() {
 canvas = createCanvas(800,200);
  trex = createSprite(80,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided",trex_collided);
  trex.scale = 0.5;
  
  ground = createSprite(200,180,20000,20000);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
 // ground.velocityX = -4;
  
  invisibleGround = createSprite(200,190,200000,10);
  invisibleGround.visible = false;
  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
  
  gameOver = createSprite(300,100,10,10);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.5;
  gameOver.visible = false;
  
  restart = createSprite(300,140,10,10);
  restart.addImage(restartImg);
  restart.scale = 0.5;
  restart.visible = false;

  
  for(var i = 200;i <= 20000;i = i+200){
    
      var cloud = createSprite(i,120,40,10);
      cloud.addImage(cloudImage);
      cloud.scale = 0.5;
     
    var obstacle = createSprite(i,165,10,40);
    obstacle.scale = 0.5;
    obstacle.lifetime = 10;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
    obstacle.scale = 0.5;
    obstacle.lifetime = 800;
    //add each obstacle to the group

   //obstacle.velocityX = -3;
   
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    
//    }
   
  //assign scale and lifetime to the obstacle           
 
   }

  }


 
}
function draw() {
  
  

  
  background(180);
  
  if(gameState === PLAY){
    score = score + Math.round(getFrameRate()/60);

    
    //ground.velocityX = -4;
    if(keyDown("space")) {
      trex.velocityY = -10;
      }
  
     trex.velocityY = trex.velocityY + 0.8
  
    if (ground.x < 400){
       ground.x = ground.width/2;
       }
       //camera.position.x = score.x;
       camera.position.x = trex.x;
       ///.velocityX = -4;
       if(keyDown("right")){
         trex.x = trex.x + 4;
       //  cloudsGroup.x = cloudsGroup.x-4 ;
        //obstaclesGroup.x = obstaclesGroup.x-4;
  

       } 
      }

   
    
     if(obstaclesGroup.isTouching(trex)){
    gameState = END;
      
      }
    if(gameState === END){
      //gameOver.x = trex.x;
    gameOver.visible = true;
    restart.visible = true;
    restart.x = trex.x;
    gameOver.x= trex.x;
  //set velocity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
   obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    
    //change the trex animation
   trex.changeAnimation("collided",trex_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    
  }
  
    if(mousePressedOver(restart)) {
     reset();
   }
  
  text("Score: "+ score, 500,50);
  
  
  
  trex.collide(invisibleGround);
 
  drawSprites();
  //spawnClouds();
  //spawnObstacles();
}


    
     //add  function spawnClouds() {
//write code here to spawn the clouds
   
  
  
 


  
  // if(frameCount % 100 === 0) {
   function reset(){
  gameState = PLAY;
   trex.x = 80;
  gameOver.visible = false;
  restart.visible = false;
  
  //obstaclesGroup.destroyEach();
  //cloudsGroup.destroyEach();
  
  trex.changeAnimation("running",trex_running);
  
  score = 0;
  
}
