//Global Variables
var bananaImage,obstacleImage,backImage,obstacleGroup,score,monkey1;
var backImage1, iground, bananagroup, score;
var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){
  backImage1=loadImage("jungle.jpg");
  monkey1 = 
    loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png",
  "Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png",
    "Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  bananaImage=loadImage("Banana.png");
  obsctacleImage=loadImage("stone.png");
}

function setup() {
  createCanvas(600,300)
  
  backImage = createSprite(100,100,400,100);
  backImage.addImage("back", backImage1);
  backImage.velocityX = -4;
  backImage.x = backImage.width/2; 
  
  monkey = createSprite(90,260,10,10);
  monkey.addAnimation("player1", monkey1);
  monkey.scale = 0.25;
  
  iground = createSprite(90,270,100,1);
  iground.visible = false;
  
  bananagroup = new Group();
  obstaclegroup = new Group();
  
  score = 0;
}

function draw(){
  background(255);  
  
   if(gameState === PLAY){
      if (backImage.x < 100){
        backImage.x = backImage.width/2;
  }
     spawnbanana();
     spawnobs();
  if(keyDown("space")){
     monkey.velocityY = -12;
  }
  monkey.velocityY = monkey.velocityY + 0.8;
         
  if(monkey.isTouching(bananagroup)){
     bananagroup.destroyEach(); 
     score = score + 2;
  }
     switch(score){
       case 4: monkey.scale = 0.12;
         break;
       case 6: monkey.scale = 0.14;
         break;  
       case 8: monkey.scale = 0.16;
         break;
       case 10: monkey.scale = 0.18;
         break;
         default: break;
     }
     
   monkey.collide(iground);
     if(monkey.isTouching(obstaclegroup)){
       gameState = END;
     }
   }
  if(gameState === END){
    // console.log("In the end game");
    backImage.velocityX = 0;
    monkey.destroy();
    text("GAMEOVER", 300,150);
    
    bananagroup.setVelocityXEach(0);
    obstaclegroup.setVelocityXEach(0);
    bananagroup.setLifetimeEach(-1);
    obstaclegroup.setLifetimeEach(-1);
    bananagroup.destroyEach();
    obstaclegroup.destroyEach();
    // var coverup = createSprite(300,100,600,600);
    //coverup.shapeColor = "red";
  }
  // spawnbanana();
  // spawnobs();       
  
   stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 500,50); 
  
  drawSprites();
}

function spawnbanana(){
  if(frameCount % 160 === 0){
  var Banana = createSprite(610,160,10,10);
  Banana.addImage(bananaImage);
  Banana.scale = 0.08;
  Banana.velocityX = - 4
  Banana.lifetime= 200;
  bananagroup.add(Banana);
  }
}
function spawnobs(){
  if(frameCount % 160 === 0){
  var obs = createSprite(610,240,10,10);
  obs.addImage(obsctacleImage);
  obs.scale = 0.3;
  obs.velocityX = - 4
  obs.lifetime= 200;
  obstaclegroup.add(obs);
  }
}