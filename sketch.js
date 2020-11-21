//Create variables here
var dog, happyDog, database, foodS, foodStock, foodCount;
var addFood, feed, lastFed;
var foodObj;

var DOG;

var food;

function preload() {

  dog = loadImage("images/dogImg.png")
  happyDog = loadImage("images/dogImg1.png")

}

function setup() {
  database = firebase.database()


  createCanvas(1000, 500);

  DOG = createSprite(800, 250, 20, 20)
  DOG.addImage(dog)
  DOG.scale = 0.3;

  foodStock = database.ref('food');
  foodStock.on("value", readStock)

  foodObj = new Food()

  feed = createButton("Feed The Dog")
  feed.position(700, 95)
  feed.mousePressed(feedDog)

  addFood = createButton("Add Food")
  addFood.position(800, 95)
  addFood.mousePressed(addFoods)


}


function draw() {
  background(46, 139, 87)

  fedTime = database.ref("feedTime")
  fedTime.on("value", function (data) {
    lastFed = data.val()
  })
  

  drawSprites();

 
  fill("white")


  textSize(15)
  if (lastFed >= 12) {
    text("Last fed:" +lastFed%12 + "PM",350,30)
  } else if(lastFed === 0) {
    text("Last fed: 12 AM", 350,30)
  } else {
    text("Last fed:" +lastFed + "AM", 350,30)
  }

  foodObj.display()

}

function readStock(data) {
  foodS = data.val();
  foodObj.updateFoodStock(foodS)
}



function feedDog() {
  DOG.addImage(happyDog)

  foodObj.updateFoodStock(foodObj.getFoodStock() - 1)
  database.ref('/').update({
    food: foodObj.getFoodStock(),
    feedTime: hour()
  })
}

function addFoods() {
  foodS++
  database.ref('/').update({
    food: foodS
  })
}