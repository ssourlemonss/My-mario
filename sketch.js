var mario
var mario_running
var mario_jumping
var obstaclesGroup, obstacle, obstacle_img
var restart_button, restartImage
var background, backgroundImage
var jumpSound
var  ground, groundImage
var invisibleGround
var jump_sound
var restartImg
var PLAY = 1
var END = 0
var gameState = PLAY
var score = 0

function preload(){
backgroundImage = loadImage("mario wallpaper yay.jpeg")
mario_running = loadImage("mario_running-removebg-preview.png")
restartImage = loadImage("restart.png")
mario_jumping = loadImage("mario jumping.png")
groundImage = loadImage("ground.png")
jump_sound = loadSound("jump.mp3")
obstacle_img = loadImage("obstacle_mario-removebg-preview.png")
restartImg = loadImage("restart.png")
}

function setup(){
    createCanvas(windowWidth, windowHeight)
    mario = createSprite(70,height-155,20,50)
    mario.addImage("running", mario_running)
    mario.scale = 0.5
    ground = createSprite(width/2, height-30, windowWidth, 20);
    ground.addImage("ground", groundImage)
    invisibleGround = createSprite(width/2, height-30, windowWidth, 15);
    obstaclesGroup = createGroup()
    restart = createSprite(1100,600);
    restart.addImage(restartImg);
}

function draw(){
    background(backgroundImage)
    textSize(25)
    fill("black")
    text("score = " + score, 1850, 50)
    mario.setCollider("rectangle", 0, 0, 200, 350)
    mario.debug = true

    if (gameState === PLAY){
      invisibleGround.visible = false
      restart.visible = false
      ground.velocityX = -10
      score = score + 1
      if (ground.x < 0){
        ground.x = ground.width/2;
      }
      backgroundImage.velocityX = -5
      if (backgroundImage.x < 0){
        backgroundImage.x = backgroundImage.width/2;
      }
      if(keyDown("space")){
        mario.velocityY = -23
        jump_sound.play()
      }
      mario.velocityY = mario.velocityY + 0.8
      spawnObstacles()

      if(obstaclesGroup.isTouching(mario)){
        gameState = END
      }
    }
    else if (gameState === END){
      mario.velocityX = 0 
      ground.velocityX = 0
      obstaclesGroup.velocityX = 0
      textSize(50)
      fill("red")
      text("Game Over", 1000, 500)
      restart.visible = true
      if(mousePressedOver(restart)) {
        reset();
       
      }  
    }
      mario.collide(invisibleGround)

    drawSprites()
}

function spawnObstacles() {
       
  if (frameCount % 90 === 0) {
    var obstacle = createSprite(1000,900,40,10);
    obstacle.addImage(obstacle_img);
    obstacle.scale = 0.3;
    obstacle.velocityX = -3;
    obstacle.velocityX = -10
    obstaclesGroup.add(obstacle)
  }
}

function reset(){
  gameState = PLAY
  obstaclesGroup.destroyEach()
  score = 0
  }
