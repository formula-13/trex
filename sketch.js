//var dos sprites
var Trex,floor, invFloor, cloud, cactus, gameOver, restart;
var TrexCorre, TrexDie, floor_spr, cloud_spr, cactus_spr, cactus_spr2, cactus_spr3, cactus_spr4, catus_spr5, cactus_spr6, gameOverText, restartSym;

var barulhoDePular, barulhoDeMorrer, barulhoDeCheckpoint;



var randonum;

var numDeCactos;

var Pontos;

var GrpObstaculos;

var GrpNuvens

var Jogar=1 ;

var Encerrar=0;

var EstadoDeJogo = Jogar;


//preload
function preload(){
  TrexCorre = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  
  TrexDie = loadAnimation ("trex_collided.png");
  
  floor_spr = loadImage("ground2.png");
  
  cloud_spr = loadImage("cloud.png");
  
  cactus_spr1 = loadImage ("obstacle1.png");  
  
  cactus_spr2 = loadImage ("obstacle2.png");
    
  cactus_spr3 = loadImage ("obstacle3.png");
    
  cactus_spr4 = loadImage ("obstacle4.png");
    
  cactus_spr5 = loadImage ("obstacle5.png");
    
  cactus_spr6 = loadImage ("obstacle6.png");
  
  gameOverText = loadImage ("gameOver.png");
  
  restartSym = loadImage ("restart.png");
  
  barulhoDePular = loadSound ("jump.mp3");
    
  barulhoDeMorrer = loadSound ("die.mp3");
    
  barulhoDeCheckpoint = loadSound ("checkPoint.mp3");
  
  Pontos = 0;
}

//cria os sprite no setup
function setup () {
  createCanvas(600,200);
  
  Trex = createSprite(50,60,20,50);
  Trex.addAnimation ("corre", TrexCorre);
  Trex.addAnimation ("collide", TrexDie);
  Trex.scale=0.5;
  Trex.setCollider("circle", 0, 0, 40);
  floor = createSprite(300,180,600,20);
  floor.addImage ("ground1", floor_spr);
  
  invFloor = createSprite(300, 190, 600, 10);
  invFloor.visible=false;
  
  gameOver = createSprite (300, 85);
  gameOver.addImage ("gmovr", gameOverText);
  
  restart = createSprite (300,130);
  restart.addImage ("rstrt", restartSym);
  restart.scale = 0.5;
  
  
  randonum = Math.round(random(1, 100));
  
  GrpObstaculos = new Group();
  
  GrpNuvens = new Group();
}

function draw(){
  background("white");
  
//oq rola no jogo
  if (EstadoDeJogo === Jogar) {
    Pontos = Math.round (frameCount/3);
    
    if (Pontos > 0 && Pontos%100===0) {
      barulhoDeCheckpoint.play();
    }
    
    floor.velocityX = -5;
    
    Trex.velocityY = Trex.velocityY + 0.5;
    
    gameOver.visible = false;
    restart.visible = false;
    
 //faze o chao anda   
    if (floor.x < 0) {
      floor.x=floor.width /2;
    }
      
    Trex.collide(invFloor);
 //trex pula     
    if (keyDown ("w") && Trex.y>160) {
      Trex.velocityY = -10;
      barulhoDePular.play();
    }
    //coloca a paisage e os enimigo
    gerarNuvens();
    
    GerarCactos();
 //morrey   
    if (GrpObstaculos.isTouching (Trex)) {
      Trex.velocityY = -10;
      EstadoDeJogo = Encerrar;
      barulhoDeMorrer.play();
    }
 //e se morre   
  } else if (EstadoDeJogo === Encerrar) {
    Trex.changeAnimation ("collide", TrexDie);
    Trex.velocityY = 0;
    floor.velocityX = 0;
    GrpObstaculos.setVelocityXEach(0);    
    GrpObstaculos.setLifetimeEach(-1);
    GrpNuvens.setVelocityXEach(0);    
    GrpNuvens.setLifetimeEach(-1);
    gameOver.visible = true;
    restart.visible = true;
     // recomecao ojogo  
    if (mousePressedOver(restart)){
        reset();
   }
  }
    
  
 //pontos 
  textSize (14)
  text ("Pontos: "+Pontos, 500, 50);
  
  


  

  
    
    
  
  

  
  
  
  drawSprites();
}
//nuvens
function gerarNuvens(){
  if (frameCount%60===0){
    cloud = createSprite (600, 100, 40, 10);
    cloud.lifetime = 160;
    cloud.velocityX = -4;
    cloud.addImage (cloud_spr);
    cloud.y = Math.round(random(60, 80));
    cloud.scale=Math.random(0.25, 1);
    Trex.depth = +2;
    cloud.depth = 1; 
    GrpNuvens.add(cloud);
  }
}
//cactos
function GerarCactos(){
  var d;
  var r = Math.round (random(1, 3));
  switch (r) {
   case 1: d= 30;
   break;
   case 2: d=60;
   break;
   case 3: d=120;
   break;
  }    
  if (frameCount% d === 0) {
    numDeCactos = createSprite (600,165,10,40)
    numDeCactos.lifetime = 160;
    numDeCactos.velocityX = -(6+Pontos/180);
    console.log(numDeCactos.velocityX);
    
    var randCactus = Math.round(random(1,6));
    switch (randCactus) {
      case 1 : numDeCactos.addImage(cactus_spr1);
        break;
      case 2 : numDeCactos.addImage(cactus_spr2);
        break;
      case 3 : numDeCactos.addImage(cactus_spr3);
        break;
      case 4 : numDeCactos.addImage(cactus_spr4);
        break;
      case 5 : numDeCactos.addImage(cactus_spr5);
        break;
      case 6 : numDeCactos.addImage(cactus_spr6);
        break; 
    }
    numDeCactos.scale = 0.5;
    
    GrpObstaculos.add(numDeCactos);
  }
}

function reset(){
  GrpNuvens.destroyEach();
  GrpObstaculos.destroyEach();
  Trex.changeAnimation("corre", TrexCorre);
  frameCount = 0;
  Pontos = 0;
  EstadoDeJogo = Jogar;
}