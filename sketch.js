var PLAY = 1;
var END = 2;
var gameState = PLAY;

var bg;
var player,virus,Virus1,Virus2,Virus3,Virus4,Virus5,Virus6,handSanitizer,handwash,mask;
//var play, sound, restart;

var score;
var gameOver, gameOverImage;
var restart, restartImage;

function preload() {
  backgroundImage = loadImage("images/bg_virus.jpg");
  handSanitizer = loadImage("images/handSanitizer.png");
  handwash = loadImage("images/handwash.png");
  mask = loadImage("images/mask.png");
  //play = loadImage("images/play.png");
  //sound = loadImage("images/sound.png");
  Player = loadImage("images/player.png");
  Virus1 = loadImage("images/virus_1.png");
  Virus2 = loadImage("images/Virus_2.png");
  Virus3 = loadImage("images/Virus.gif");
  Virus4 = loadImage("images/Virus_4.png");
  Virus5 = loadImage("images/Virus_5.png");
  Virus6 = loadImage("images/Virus_6.png");
  gameOverImage = loadImage("images/gameOver.png");
  restartImage = loadImage("images/restart.png");
}
function setup() {
  createCanvas(1000,600);

  background = createSprite (0,0, 1000,800);
  background.addImage(backgroundImage);
  background.scale = 2.5;
  
  virusGroup = createGroup();
  
  gameOver = createSprite(500,150);
  gameOver.addImage("gameOver",gameOverImage);
  gameOver.visible = false;
  gameOver.scale = 0.8;

  restart = createSprite(500,250);
  restart.addImage("restart",restartImage);
  restart.visible = false;
  restart.scale = 0.8;

  player = createSprite(200,285);
  player.addImage(Player);
  player.scale = 1.5;
  
  score = 0;

}

function draw() {
  
 player.setCollider("rectangle",0,-3,40,45);
 player.debug = true;

 if(gameState === PLAY){
  /*form = new Form();
  form.display()*/

  background.velocityX = -2;

  score = score + Math.round(frameCount/60);

   if (background.x<0){
     background.x = background.width/2;
   } 

   if(keyDown(UP_ARROW)){
     changePosition(0,-5);
   } else if(keyDown(DOWN_ARROW)){
     changePosition(0,+5);
   }
   spawnObstacles();
    
   if(virusGroup.isTouching(player)){
       gameState = END;
   }
  } else if(gameState === END) {
    background.velocityX = 0;
     
    virusGroup.setVelocityXEach(0);
    virusGroup.setLifetimeEach(-1);
    
    gameOver.visible = true;
    restart.visible = true;

    if(mousePressedOver(restart)) {
      reset();
    }
  }

   drawSprites();
    
   text("Score: "+ score, 500,50);


  }

function changePosition(x,y){
  player.x = player.x + x;
  player.y = player.y + y;
}

function spawnObstacles(){
  if (frameCount % 60 === 0){
    var virus = createSprite(900,random(0,800),10,40);
    virus.velocityX = -6;
    
     //generate random obstacles
     var rand = Math.round(random(1,6));
     switch(rand) {
       case 1: virus.addImage(Virus1);
               break;
       case 2: virus.addImage(Virus2);
               break;
       case 3: virus.addImage(Virus3);
               break;
       case 4: virus.addImage(Virus4);
               break;
       case 5: virus.addImage(Virus5);
               break;
       case 6: virus.addImage(Virus6);
               break;
       default: break;
     }
    
     virus.setCollider("circle",0,0,100);
     virus.debug = true;
     
     virus.scale = 0.3;
     virus.lifetime = 300;
    
     virusGroup.add(virus);

     player.depth = virus.depth;
  }
 }
 
 function reset(){
  gameState=PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  virusGroup.destroyEach();
  
  score = 0;
}