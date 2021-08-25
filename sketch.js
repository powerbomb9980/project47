var level = 1;
var player, playerImg, plrAnimation, plrAnimationLeft;
var ground, ground2, ground3, ground4, groundImg;
var ground5, ground6, ground7, ground8, groundImg2;
var back;
var backgroundImg, backImg2;
var topBorder, rightBorder, leftBorder, bottomBorder;
var obstacle;
var obsImgUp, obsImgDown, obsImgUp2, obsImgDown2;
var obstacleGroup, obstacleGroup1, obstacleGroup2;;
var gameState = 0;
var gameOver, gmOverImg;
var restart, restartImg;
var health = 3;
var heart1, heart2, heart3, heartImg;
var lava, lavaImg;
var platform1, platform2, platform3, platImg;
var respawnX = 40;
var respawnY = 50;
var bomb1, bomb2, bomb3, bombImg;
var addHeart, addHeartImg;
var end;






function preload() {
  playerImg = loadAnimation("Images/Player.png");
  plrAnimation = loadAnimation("Images/Player Walk/sprite_0.png", "Images/Player Walk/sprite_1.png")
  plrAnimationLeft = loadAnimation("Images/Player Walk Left/sprite_0.png", "Images/Player Walk/sprite_1.png")
  groundImg = loadImage("Images/Ground.Png");
  backgroundImg = loadImage("Images/Background.png");
  gmOverImg = loadImage("Images/Game Over.png");
  restartImg = loadImage("Images/Restart.png");
  heartImg = loadImage("Images/Heart.png");
  lavaImg = loadImage("Images/Lava.png");
  platImg = loadImage("Images/Platform.png");
  bombImg = loadImage("Images/Bomb.png")
  addHeartImg = loadImage("Images/Add Heart.png")

  backImg2 = loadImage("Images2/Background2.png");
  groundImg2 = loadImage("Images2/Ground2.png");


}

function setup() {
  createCanvas(1400, 700);
  ground = new Ground(600, 165, 1200, 20, "Images/Ground.png");
  ground2 = new Ground(800, 350, 1200, 20, "Images/Ground.png");
  ground3 = new Ground(600, 535, 1200, 20, "Images/Ground.png");
  ground4 = new Ground(800, 695, 1200, 20, "Images/Ground.png");

  player = new Player(40, 50, 25, 25);

  topBorder = createSprite(700, -50, 1400, 10);
  rightBorder = createSprite(1400, 350, 10, 1400);
  leftBorder = createSprite(0, 350, 10, 1400);
  bottomBorder = createSprite(700, 700, 1400, 10);

  obstacleGroup = new Group();
  obstacleGroup1 = new Group();

  gameOver = createSprite(700, 200, 50, 50);
  gameOver.addImage(gmOverImg);
  gameOver.scale = 1.5;

  end = createSprite(50, 700, 300, 15);
  //end.visible = false;

  restart = createSprite(700, 400, 50, 50);
  restart.addImage(restartImg);
  restart.scale = 0.25;

  heartGroup = new Group();

  // heart1 = createSprite(1275, 25, 25, 25);
  // heart1.addImage(heartImg);
  // heart1.scale = 0.25;

  // heart2 = createSprite(1325, 25, 25, 25);
  // heart2.addImage(heartImg);
  // heart2.scale = 0.25;

  // heart3 = createSprite(1375, 25, 25, 25);
  // heart3.addImage(heartImg);
  // heart3.scale = 0.25;

  addHeart = createSprite(225, 650, 50, 50);
  addHeart.addImage(addHeartImg);
  addHeart.scale = 0.125;

  lava = createSprite(775, 337.5, 700, 5);
  lava.visible = false;

  platform1 = createSprite(1050, 300, 150, 10);
  platform1.addImage(platImg);
  platform1.scale = 0.3;

  platform2 = createSprite(800, 300, 150, 10);
  platform2.addImage(platImg);
  platform2.scale = 0.3;

  platform3 = createSprite(550, 300, 150, 10);
  platform3.addImage(platImg);
  platform3.scale = 0.3;

  bomb1 = createSprite(400, 400, 50, 50);
  bomb1.addImage(bombImg);
  bomb1.scale = 0.125;
  bomb1.velocityY = 5;
  bomb1.setCollider("circle", 0, 25, 150);

  bomb2 = createSprite(600, 400, 50, 50);
  bomb2.addImage(bombImg);
  bomb2.scale = 0.125;
  bomb2.velocityY = 5;
  bomb2.setCollider("circle", 0, 25, 150);

  bomb3 = createSprite(800, 400, 50, 50);
  bomb3.addImage(bombImg);
  bomb3.scale = 0.125;
  bomb3.velocityY = 5;
  bomb3.setCollider("circle", 0, 25, 150);

  for (var i = 150; i < 1200; i = i + 300) {
    obstacle = new Obstacles(i, 137, 25, 25, "Images/Ice Spike Up.png");
    obstacleGroup.add(obstacle.sprite);
    obstacle.sprite.setCollider("rectangle", 0, 0, 25, 25);
  }

  for (var i = 300; i < 1200; i = i + 300) {
    obstacle = new Obstacles(i, 18, 25, 25, "Images/Ice Spike Down.png");
    obstacleGroup.add(obstacle.sprite);
    obstacle.sprite.setCollider("rectangle", 0, 0, 25, 35);
  }

  for (var i = 450; i < 1200; i = i + 300) {
    obstacle1 = new Obstacles(i, 561, 25, 25, "Images/Ice Spike Down.png");
    obstacleGroup1.add(obstacle1.sprite);
    obstacle.sprite.setCollider("rectangle", 0, 0, 25, 35);
  }

  for (var i = 325; i < 1400; i = i + 300) {
    obstacle1 = new Obstacles(i, 669, 25, 25, "Images/Ice Spike Up.png");
    obstacleGroup1.add(obstacle1.sprite);
    obstacle.sprite.setCollider("rectangle", 0, 0, 25, 25);
  }





}

function draw() {
  if (level == 1) {
    if (gameState == 0) {
      background(backgroundImg);
      player.sprite.changeAnimation("player", playerImg);
      if (keyDown(RIGHT_ARROW)) {
        player.sprite.x = player.sprite.x + 10;
        player.sprite.changeAnimation("playerA", plrAnimation);
      }
      if (health != 0) {
        heartGroup.destroyEach();
      }
      distance = 1225;
      for (var i = 0; i < health; i++) {
        heart = createSprite(distance, 25, 25, 25);
        heart.addImage(heartImg);
        heart.scale = 0.25;
        heartGroup.add(heart);
        distance = distance + 50;
      }

      player.sprite.collide(platform1);
      player.sprite.collide(platform2);
      player.sprite.collide(platform3);

      bomb1.bounceOff(ground2.sprite);
      bomb1.bounceOff(ground3.sprite);

      bomb2.bounceOff(ground2.sprite);
      bomb2.bounceOff(ground3.sprite);

      bomb3.bounceOff(ground2.sprite);
      bomb3.bounceOff(ground3.sprite);

      imageMode(CENTER);
      image(lavaImg, 775, 337.5, 700, 5);



      if (keyWentDown(UP_ARROW)) {
        player.sprite.y = player.sprite.y - 75;
      }

      if (keyWentDown(UP_ARROW) && keyWentDown(RIGHT_ARROW)) {
        player.sprite.y = player.sprite.y - 75;
        player.sprite.x = player.sprite.x + 15;
      }

      if (keyWentDown(UP_ARROW) && keyWentDown(LEFT_ARROW)) {
        player.sprite.y = player.sprite.y - 75;
        player.sprite.x = player.sprite.x - 15;
      }

      if (keyDown(LEFT_ARROW)) {
        player.sprite.x = player.sprite.x - 10;
        player.sprite.changeAnimation("playerB", plrAnimationLeft);
      }
      player.sprite.y += 5;
    }

    gameOver.visible = false;
    restart.visible = false;

    ground.display();
    ground2.display();
    ground3.display();
    ground4.display();

    //topBorder.visible = false;
    bottomBorder.visible = false;
    rightBorder.visible = false;
    leftBorder.visible = false;

    player.sprite.collide(ground.sprite);
    player.sprite.collide(ground2.sprite);
    player.sprite.collide(ground3.sprite);
    player.sprite.collide(ground4.sprite);
    player.sprite.collide(bottomBorder);
    player.sprite.collide(rightBorder);
    player.sprite.collide(leftBorder);
    player.sprite.collide(topBorder);

    if (player.sprite.isTouching(addHeart)) {
      health = health + 1;
      // if(health == 2){
      //   heart1.visible = true;
      // }
      // if(health == 1){
      //   heart2.visible = true;
      // }
      // var distance = 200;
      // for (var i = 0; i < health; i++) {
      //   health2 = createSprite(distance, 100, 50, 50);
      //   health2.addImage(heartImg);
      //   distance = distance + 50;
      // }
      addHeart.destroy();
    }

   // console.log(health);

    if (player.sprite.isTouching(obstacleGroup)) {
      health = health - 1;
      player.sprite.x = respawnX;
      player.sprite.y = respawnY;
    }

    if (player.sprite.isTouching(obstacleGroup1)) {
      health = health - 1;
      respawnX = 1300;
      respawnY = 650;
      player.sprite.x = respawnX;
      player.sprite.y = respawnY;
    }

    if (player.sprite.isTouching(bomb1)) {
      health = health - 1;
      respawnX = 50;
      respawnY = 400;
      player.sprite.x = respawnX;
      player.sprite.y = respawnY;
    }

    if (player.sprite.isTouching(bomb2)) {
      health = health - 1;
      respawnX = 50;
      respawnY = 400;
      player.sprite.x = respawnX;
      player.sprite.y = respawnY;
    }
    //console.log("level" + level);

    if (player.sprite.isTouching(bomb3)) {
      health = health - 1;
      respawnX = 50;
      respawnY = 400;
      player.sprite.x = respawnX;
      player.sprite.y = respawnY;
    }

    if (player.sprite.isTouching(lava)) {
      health = health - 1;
      respawnX = 1300;
      respawnY = 250;
      player.sprite.x = respawnX;
      player.sprite.y = respawnY;
    }

    // if(health == 2){
    //   heart1.visible = false;
    // }

    // if(health == 1){
    //   heart2.visible = false;
    // }

    if (health == 0) {
      //   heart3.visible = false;
      gameState = 1;
    }

    if (gameState == 1) {
      background(0);
      player.sprite.visible = false;
      obstacleGroup.setVisibleEach(false);
      obstacleGroup1.setVisibleEach(false);
      heartGroup.setVisibleEach(false);
      gameOver.visible = true;
      restart.visible = true;
      textSize(35);
      fill(255);
      text("RESTART", 625, 500);
      platform1.visible = false;
      platform2.visible = false;
      platform3.visible = false;
      bomb1.visible = false;
      bomb2.visible = false;
      bomb3.visible = false;
      addHeart.visible = false;

      if (mousePressedOver(restart)) {
        gameState = 0;
        player.sprite.visible = true;
        player.sprite.x = 40;
        player.sprite.y = 50;
        obstacleGroup.setVisibleEach(true);
        obstacleGroup1.setVisibleEach(true);
        heartGroup.setVisibleEach(true);
        health = 3;
        // heart1.visible = true;
        // heart2.visible = true;
        // heart3.visible = true;
        platform1.visible = true;
        platform2.visible = true;
        platform3.visible = true;
        bomb1.visible = true;
        bomb2.visible = true;
        bomb3.visible = true;
        addHeart.visible = true;

      }

    }
    if (player.sprite.isTouching(end)) {
      level = 1.5;
    }
  }

if(level === 1.5){
  ground5 = new Ground(600, 165, 1200, 20, "Images2/Ground2.png");
  ground6 = new Ground(800, 350, 1200, 20, "Images2/Ground2.png");
  ground7 = new Ground(600, 535, 1200, 20, "Images2/Ground2.png");
  ground8 = new Ground(800, 695, 1200, 20, "Images2/Ground2.png");
  level = 2;
  console.log("hello");
}


  if (level == 2) {
    obstacleGroup.destroyEach();
    obstacleGroup1.destroyEach();
    platform1.destroy();
    platform2.destroy();
    platform3.destroy();
    bomb1.destroy();
    bomb2.destroy();
    bomb3.destroy();
    end.destroy();
    addHeart.destroy();

    if (gameState == 0) {
      background(backImg2);
      player.sprite.changeAnimation("player", playerImg);

      if (keyDown(RIGHT_ARROW)) {
        player.sprite.x = player.sprite.x + 10;
        player.sprite.changeAnimation("playerA", plrAnimation);
      }
      if (keyWentDown(UP_ARROW)) {
        player.sprite.y = player.sprite.y - 75;
      }

      if (keyWentDown(UP_ARROW) && keyWentDown(RIGHT_ARROW)) {
        player.sprite.y = player.sprite.y - 75;
        player.sprite.x = player.sprite.x + 15;
      }

      if (keyWentDown(UP_ARROW) && keyWentDown(LEFT_ARROW)) {
        player.sprite.y = player.sprite.y - 75;
        player.sprite.x = player.sprite.x - 15;
      }

      if (keyDown(LEFT_ARROW)) {
        player.sprite.x = player.sprite.x - 10;
        player.sprite.changeAnimation("playerB", plrAnimationLeft);
      }
      player.sprite.y += 5;
    }
    if (health != 0) {
      heartGroup.destroyEach();
    }
    distance = 1225;
    for (var i = 0; i < health; i++) {
      heart = createSprite(distance, 25, 25, 25);
      heart.addImage(heartImg);
      heart.scale = 0.25;
      heartGroup.add(heart);
      distance = distance + 50;
    }

    player.sprite.collide(bottomBorder);
    player.sprite.collide(rightBorder);
    player.sprite.collide(leftBorder);
    player.sprite.collide(topBorder);
    player.sprite.collide(ground5.sprite);
    player.sprite.collide(ground6.sprite);
    player.sprite.collide(ground7.sprite);
    player.sprite.collide(ground8.sprite);
    ground5.display();
    ground6.display();
    ground7.display();
    ground8.display();
    ground8.rotation = 135;

  }

  if (keyCode == 192) {
    level = 1.5;
    player.sprite.x = 50;
    player.sprite.y = 650;
  }


  drawSprites();
}

