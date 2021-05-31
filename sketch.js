var END = 0;
var PLAY = 1;
var gameState = PLAY;
var FighterImg,Background1Img,BulletImg,AlienImg;
var Bullet;
var score;
var alienCount;

function preload(){
  FighterImg = loadImage("Images/Fighter.png")
  Background1Img = loadImage("Images/Background.png")
  BulletImg = loadImage("Images/Bullet.png")
  AlienImg = loadImage("Images/Alien.png")
  GameOverImg = loadImage("Images/GameOver.png")
  ExplosionAnim = loadAnimation("Images/Explosion1.png","Images/Explosion2.png","Images/Explosion3.png")
}
function setup() {
  createCanvas(1365,625);
  background1 = createSprite(690,310)
  background1.addImage(Background1Img)
  background1.scale = 2.2;
  background1.velocityY = 3
  fighter = createSprite(400, 540,);
  fighter.addImage(FighterImg);
  fighter.scale = 0.1
  
  test = createSprite(750,140,1500,5);
  test.visible = false;

  GameOver = createSprite(600,300);
  GameOver.addImage("over",GameOverImg);
  GameOver.scale = 2
  GameOver.visible = false;

  AlienGrp = new Group();
  BulletGrp = new Group();
  
  score = 0;
  alienCount = 0;
}

function draw() {
  background(0)



if (gameState === PLAY){

  if(background1.y>700){
    background1.y = 200
  }
  if(keyWentDown("D")){
    fighter.velocityX = 20
  }
  if(keyWentUp("D")){
    fighter.velocityX = 0
  }
  if(keyWentDown("A")){
    fighter.velocityX = -20
  }
  if(keyWentUp("A")){
    fighter.velocityX = 0
  }
  if(keyWentDown("Space")){
    Bullet = createSprite(200,200,20,20)
    Bullet.position.x = fighter.position.x+55
    Bullet.position.y = fighter.position.y-60
    Bullet.velocity.y = -15
    Bullet.addImage("bullet",BulletImg)
    Bullet.scale = 0.5
    Bullet.setCollider("circle",-118,-70,20)
    Bullet.lifetime = 150
    BulletGrp.add(Bullet)
   }
   if (frameCount % 60 === 0){
    var Alien = createSprite(400,-30);
    Alien.addImage("villan",AlienImg)
    Alien.velocityY = 5 
    Alien.scale = 0.5
    Alien.position.x =  Math.round(random(200,1300));
    Alien.lifetime = 150
    AlienGrp.add(Alien)
  }
if(fighter.isTouching(AlienGrp)){
  gameState = END;
}
for(var i = 0;i<AlienGrp.length;i++){
  for(var j = 0;j<BulletGrp.length;j++){
    if(BulletGrp.isTouching(AlienGrp)){
      score = score+10
      alienCount = alienCount+1
 //     Alien.addAnimation("villan",ExplosionAnim)
      AlienGrp.get(i).destroy();
      BulletGrp.get(j).destroy();
      }
  }
}

  }
  else if (gameState === END){
    AlienGrp.setVelocityYEach(0)
    fighter.destroy();
    GameOver.visible = true
    AlienGrp.setLifetimeEach(-1)
    background1.velocityY = 0
  }
  
  drawSprites();
  textSize(40)
  fill("red")
  textFont("family")
  text("Score: "+score,50,60)
  text("Aliens Destroyed: "+alienCount,50,100)
}

