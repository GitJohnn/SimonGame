var gamePattern = [];
var buttonColors = ["green","red","yellow","blue"];
var gameOver = false;
var level = 0;
var index = 0;
var randomChooseColor;
var userClickedPattern = [];
var onMobile = false;
var width = window.innerWidth;

if( navigator.userAgent.match(/Android/i)
 || navigator.userAgent.match(/webOS/i)
 || navigator.userAgent.match(/iPhone/i)
 || navigator.userAgent.match(/iPad/i)
 || navigator.userAgent.match(/iPod/i)
 || navigator.userAgent.match(/BlackBerry/i)
 || navigator.userAgent.match(/Windows Phone/i)){
   onMobile = true;
   $("h1").html("Click Button To Start");
   $("h1").after("<button>Start</button>");
   $("button").addClass("startBtn");
 }

if(width <= 500){
  $("h1").html("Click Button To Start");
  $("h1").after("<button>Start</button>");
  $("button").addClass("startBtn");
  onMobile = true;
}else{
  $(document).keypress(function(event) {
    if(level < 1 && !gameOver){
      nextSequence();
    }
    else if(level >= 0 && gameOver){
      gameOver = false;
      level = 0;
      index = 0;
      gamePattern = [];
      userClickedPattern = [];
      nextSequence();
    }
  });
}

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
      if(!onMobile){
          $("h1").html("Game Over, Press Any Key To Restart");
      }
      else{
        $("h1").html("Game Over, Press Retry Button");
        $("button").show();
        $("button").html("Retry");
      }
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

$("button").on("click",function(){
  if(level < 1 && !gameOver){
    nextSequence();
    $("button").hide();
  }
  else if(level >= 0 && gameOver){
    gameOver = false;
    index = 0;
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    $("button").html("Start");
    $("button").hide();
    nextSequence();
  }
});

$(document).on("click",function(event) {
    if(buttonColors.includes(event.target.classList[1]) && !gameOver && (level >= 1)){
        ButtonClicked(event.target.classList[1]);
    }
});
