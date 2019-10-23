var gamePattern = [];
var buttonColors = ["green","red","yellow","blue"];
var gameOver = false;
var level = 0;
var index = 0;
var randomChooseColor;
var userClickedPattern = [];

function playSound(name){
  var src = 'sounds/' + name + '.mp3';
  console.log(src);
  var audio = new Audio(src);
  audio.play();
}

function animatePress(currentColor){
  $("."+currentColor).addClass('pressed');
  setTimeout(function(){$("."+currentColor).removeClass('pressed');},200);
}

function nextSequence(){
  level += 1;
  $("h1").html("Level " + level);
  randomChooseColor = Math.floor(Math.random() * 4);
  fadeButton();
  gamePattern.push(randomChooseColor);
}

function fadeButton(){
  var buttonName = buttonColors[randomChooseColor];
  $("."+buttonName).fadeOut(50).fadeIn(50).fadeOut(50).fadeIn(50);
  playSound(buttonName);
}

function ButtonClicked(name){
  animatePress(name);
  $("."+name).fadeOut(50).fadeIn(50).fadeOut(50).fadeIn(50);
  userClickedPattern.push(buttonColors.indexOf(name));
  playSound(name);
  CheckAnswer(buttonColors.indexOf(name));
}

function CheckAnswer(colorIndex){
  if(index < gamePattern.length){
    if(colorIndex === gamePattern[index]){
      console.log("Correct");
      index++;
    }
    else{
      gameOver = true;
      $("body").css("background-color","red");
      setTimeout(function(){
        $("body").css("background-color","#011F3F");
      },200);
      playSound("wrong");
      $("h1").html("Game Over, Press Any Key To Restart");
    }
  }

  if(index === gamePattern.length){
    setTimeout(function(){
      nextSequence();
      userClickedPattern = [];
    }, 1000);
    index = 0;
  }
}

$(document).keypress(function(event) {
  if(level < 1 && !gameOver){
    nextSequence();
  }
  else if(level >= 0 && gameOver){
    gameOver = false;
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    nextSequence();
  }
});

$(document).on("click",function(event) {
    if(buttonColors.includes(event.target.classList[1]) && !gameOver && (level >= 1)){
        ButtonClicked(event.target.classList[1]);
    }
});