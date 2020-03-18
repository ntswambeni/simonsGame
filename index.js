var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;


$(document).on("keydown", function(){
  if(!started){
    $("h1").html("Level 0");
    nextSequence();
    started = true;
  }
});

function nextSequence(){
  level++;
  $("h1").text("Level "+level);
  var randomNumber = Math.floor(Math.random()*4);
  var buttonChosenColors = buttonColors[randomNumber];
  gamePattern.push(buttonChosenColors);
  playSound(buttonChosenColors);
}

$(".btn").on("click", function(){
  if(started){
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePressed(userChosenColor)
    checkAnswer(userClickedPattern);
  }else{
    $("h1").html("Level 0");
    nextSequence();
    started = true;
  }   
});

function startOver(){
  started = false;
  level = 0;
  gamePattern = [];
}
function nextSequence(){
  userClickedPattern=[];
  var randomNumber = Math.floor(Math.random()*4);
  var buttonChosenColors = buttonColors[randomNumber];
  gamePattern.push(buttonChosenColors);
  level++;
  $("h1").text("Level "+level);
  $("#"+gamePattern[gamePattern.length-1]).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(gamePattern[gamePattern.length-1]);
}

function playSound(color){
  var audio = new Audio("sounds/" + color + ".mp3");
  audio.play();
}

function animatePressed(color){
  $("#"+color).addClass("pressed");
  setTimeout(function(){
    $("#"+color).removeClass("pressed")
  }, 100);
}

function checkAnswer(positio){
  if(userClickedPattern[userClickedPattern.length-1] !== gamePattern[userClickedPattern.length-1]){
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
      startOver();


      $("h1").text("Game Over, press any key to restart");
    },200);


  }else if(gamePattern.length === userClickedPattern.length){
    setTimeout(function(){
      nextSequence();
    },800);
  }
}
