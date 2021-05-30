
var monkey , monkey_running, banana ,bananaImage, obstacle, obstacleImage
var foodGroup, obstacleGroup
var score=0;
var survivalTime=0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,400);
  monkey=createSprite(80,315,30,30);
  monkey.addAnimation('moving',monkey_running);
  monkey.scale=0.1
  
  
  ground= createSprite(400,370,900,60);
  ground.shapeColor="brown";
  
  bananaGroup= new Group(); 
  obstacleGroup=new Group();
}


function draw() {
  background('lightBlue');
  
  var survivalTime=0;
  textSize(20);
  fill("black");
  text("score:"+score, 500, 50);
  
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate())
  text("Survival Time:"+survivalTime,50, 50);
  
  
  ground.velocityX=-4;
  ground.x=ground.width/2;
  monkey.collide(ground);
  
  if(keyDown("space")&&monkey.y>= 200 ){
    monkey.velocityY=-12;     
  }  
  
   monkey.velocityY=monkey.velocityY + 0.8; 
  
 if(bananaGroup.isTouching(monkey)) {
     bananaGroup.destroyEach() ;
     score = score + 1 ;
   }
  
   if(obstacleGroup.isTouching(monkey)) {
     ground.velocityX = 0 ;
     monkey.velocityY = 0 ;
     
     textSize(20)
     text("GAME OVER" , 200,200 ) ;
    
     obstacleGroup.setLifetimeEach(-1);
     bananaGroup.setLifetimeEach(-1);
     
     obstacleGroup.setVelocityXEach(0);
     bananaGroup.setVelocityXEach(0);
     
     survivalTime = 0;
 }
  
  
  //monkey.debug = true;
  
  
 
  drawSprites();
   obstacles(); 
  food();
}
function food(){   
  if(frameCount%80===0){
   var banana=createSprite(600, 300, 40, 50);
    banana.addImage(bananaImage);
    banana.scale=0.07
    banana.velocityX=-4  
    banana.y=round(random(120, 300));
    banana.lifetime=150;
    bananaGroup.add(banana);
  }
}

function obstacles(){
  if(frameCount%200===0){
    var obstacle=createSprite(600, 340, 40, 50);
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.1
    obstacle.velocityX=-4
    obstacleGroup.add(obstacle); 
     obstacle.lifetime=150;
  }
}






