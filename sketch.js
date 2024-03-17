var path, boy, cash, diamonds, jwellery, sword;
var pathImg, boyImg, cashImg, diamondsImg, jwelleryImg, swordImg;
var treasureCollection = 0;
var moneyGroup, swordGroup;

// Estados do jogo
var PLAY = 1;
var END = 0;
var gameState = PLAY; // Inicializado como PLAY

function preload() {
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("Runner-1.png", "Runner-2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg = loadImage("gameOver.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Movendo plano de fundo
  path = createSprite(width / 2, height / 2);
  path.addImage(pathImg);
  path.velocityY = 4;
  path.scale = 1.2;

  // Criar menino correndo
  boy = createSprite(70, height - 20, 20, 20);
  boy.addAnimation("SahilRunning", boyImg);
  boy.scale = 0.15;

  gameover = createSprite(width / 2, height / 2);
  gameover.addImage(endImg);
  gameover.visible = false;

  moneyGroup = new Group();
  swordGroup = new Group();
}

function draw() {
  if (gameState === PLAY) {
    background(0);
    boy.x = World.mouseX;
    path.velocityY = 4;

    edges = createEdgeSprites();
    boy.collide(edges);

    // Código para redefinir plano de fundo
    if (path.y > height) {
      path.y = height / 2;
    }

    createCash();
    createDiamonds();
    createJwellery();
    createSword();

    // Verificação de colisão com dinheiro (cash)
    for (var i = 0; i < moneyGroup.length; i++) {
      if (boy !== undefined && moneyGroup[i] !== undefined && moneyGroup[i].isTouching(boy)) {
        moneyGroup[i].destroy();
        treasureCollection = treasureCollection + 50;
      }
    }

    // Verificação de colisão com espada (sword)
    for (var i = 0; i < swordGroup.length; i++) {
      if (boy !== undefined && swordGroup[i] !== undefined && swordGroup[i].isTouching(boy)) {
        swordGroup[i].destroy();
        gameState = END;
        boy.destroy();
      }
    }
  } else if (gameState === END) {
    gameover.visible = true;
    moneyGroup.destroyEach();
    swordGroup.destroyEach();
  }

  drawSprites();

  textSize(20);
  fill(255);
  text("Tesouro: " + treasureCollection, 150, 30);
}

function createCash() {
  if (World.frameCount % 100 == 0) {
    var cash = createSprite(Math.round(random(50, width - 50), 40, 10, 10));
    cash.addImage(cashImg);
    cash.scale = 0.22;
    cash.velocityY = 3;
    cash.lifetime = 250;
    moneyGroup.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 320 == 0) {
    var diamonds = createSprite(Math.round(random(50, width - 50), 40, 10, 10));
    diamonds.addImage(diamondsImg);
    diamonds.scale = 0.06;
    diamonds.velocityY = 3;
    diamonds.lifetime = 250;
    moneyGroup.add(diamonds);
  }
}

function createJwellery() {
  if (World.frameCount % 410 == 0) {
    var jwellery = createSprite(Math.round(random(50, width - 50), 40, 10, 10));
    jwellery.addImage(jwelleryImg);
    jwellery.scale = 0.33;
    jwellery.velocityY = 3;
    jwellery.lifetime = 250;
    moneyGroup.add(jwellery);
  }
}

function createSword() {
  if (World.frameCount % 530 == 0) {
    var sword = createSprite(Math.round(random(50, width - 50), 40, 10, 10));
    sword.addImage(swordImg);
    sword.scale = 0.3;
    sword.velocityY = 3;
    sword.lifetime = 250;
    swordGroup.add(sword);
  }
}