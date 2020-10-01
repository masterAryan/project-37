class Game {
    constructor(){
  
    }
  
    getState(){
      var gameStateRef  = database.ref('gameState');
      gameStateRef.on("value",function(data){
         gameState = data.val();
      })
  
    }
  
    update(state){
      database.ref('/').update({
        gameState: state
      });
    }
  
    async start(){
      if(gameState === 0){
        player = new Player();
        //console.log("hello ");
        var playerCountRef = await database.ref('playerCount').once("value");
       // console.log("hi");
        if(playerCountRef.exists()){
         // console.log("salut");
          playerCount = playerCountRef.val();
          //console.log("bonjour");
          player.getCount();
         // console.log("aryan");
        }
        form = new Form()
        form.display();
      }
  
      trex1 = createSprite(100,200);
      trex2 = createSprite(300,200);
      
  
     // car1.addImage(car1Img);
      //car2.addImage(car2Img);
      //car3.addImage(car3Img);
      //car4.addImage(car4Img);
  
      trex = [trex1,trex2];
    }
  
    play(){
      form.hide();
  
      Player.getPlayerInfo();
      
      if(allPlayers !== undefined){
        //var display_position = 100;
        background(rgb(198,135,103));
        image(trackImg,0,-displayHeight*4,displayWidth,displayHeight*5);
        
        //index of the array
        var index = 0;
  
        //x and y position of the cars
        var x = 250;
        var y;
  
        for(var plr in allPlayers){
          //add 1 to the index for every loop
          index = index + 1 ;
  
          //position the cars a little away from each other in x direction
          x = x + 250;
          //use data form the database to display the cars in y direction
          y = displayHeight - allPlayers[plr].distance;
          cars[index-1].x = x;
          cars[index-1].y = y;
  
          if (index === player.index){
            cars[index - 1].shapeColor = "red";
            camera.position.x = displayWidth/2;
            camera.position.y = cars[index-1].y
          }
         
          //textSize(15);
          //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
        }
  
      }
  
      if(keyIsDown(UP_ARROW) && player.index !== null){
        player.distance +=10
        player.update();
      }
      if(player.distance >= 5000){
        gameState = 2;
      }
  
      drawSprites();
    }
    end(){
      console.log("GAME ENDED");
      game.update(2);
    }
     
  
  }
  