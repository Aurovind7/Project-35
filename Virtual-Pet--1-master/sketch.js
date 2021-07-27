//Create variables here
var database;
var dogImg;
var happyDogImg;
var dog;
var foodS;
function preload() {
  //load images here
  dogImg = loadImage("./images/dogImg.png");
  happyDogImg = loadImage("./images/dogImg1.png");
}

function setup() {
  database = firebase.database();
  createCanvas(500, 500);
  // database=firebase.database();
  dog = createSprite(200, 200, 130, 50);
  foodS = database.ref("Food");
  foodS.on("value", readStock);
  dog.addImage(dogImg);
  dog.scale = 0.15;
}

function draw() {
  background("green");
  if (keyWentDown(UP_ARROW)) {
    writeStock(foodS);
    dog.addImage(happyDogImg);
  }
  drawSprites();
  //add styles here
  fill("white");
  stroke("black");
  text("Food Remaining: " + foodS, 170, 100);
  textSize(15);
  text("Note: Press the 'up' arrow to feed Drago milk!", 130, 10);
}

function readStock(data) {
  foodS = data.val();
}

function writeStock(x) {
  if (x <= 0) {
    x = 0;
  } else {
    x = x - 1;
  }
  database.ref("/").update({
    Food: x,
  });
}
