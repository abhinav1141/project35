var dog;
var feed,addFood;
var feedTime,lastFed;
var foodObj;
var database
var foodS,foodStock;
var dogimg,happydogimg;
function preload()
{
  //load images here
  dogimg=loadImage("dogImg.png");
  happydogimg=loadImage("dogImg1.png");
}

function setup() {
  createCanvas(1000, 500);
  database=firebase.database();
  foodObj=new Food();
  dog=createSprite(250,350);
  dog.addImage(dogimg);
  dog.scale=0.2;

 feed=createButton("Feed the Dog");
 feed.position(700,95);
 feed.mousePressed(feedDog)

 addfood=createButton("ADD FOOD");
 addfood.position(800,95);
 addfood.mousePressed(addFoods);
  
foodS = database.ref("Food").on("value",readstock);  
  
}


function draw() 
{  
background(46,139,87);

feedTime=database.ref("FeedTime");
feedTime.on("value",function(data){
  lastFed=data.val();
})

fill(255);
textSize(20);
if(lastFed>=12){
  text("Last Feed : "+ lastFed%12 +" PM",350,30);
}
else if(lastFed===0){
  text("LAST FEED : 12 AM",350,30);
}
else{
  text("LAST FEED : "+ lastFed + " AM",350,30);
}
foodObj.display();



  drawSprites();
  
  
}

function readstock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS)
  }

  function feedDog(){
    dog.addImage(happydogimg);
    foodObj.updateFoodStock(foodObj.getFoodStock()-1)
    database.ref("/").update({
      Food:foodObj.getFoodStock(),
      feedTime:hour()
       

    })
  }
  
function addFoods(){
  console.log(foodS);
  foodS++;
  console.log(foodS)
  database.ref("/").update({
    Food:foodS
  })
  console.log("check")
}

  


