// the arrays
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = []; //mechine colors
var userClickedPattern = []; //user color
var level = 0;


//keyborad clicked to start
document.addEventListener("keydown", function start(event) {
  var x = event.key;
  if((x == "a")&&(gamePattern == 0)) {  //check if start gamePattern[] is empty
    level = 0;
    userClickedPattern = [];
    $("h1").text("Level 0");
    nextSequence();
    }
  }
);

//mechine choose random color and
function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var colorRun = (buttonColours[randomNumber]);
  gamePattern.push(colorRun);
  console.log(gamePattern);

  $("#" + colorRun).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(colorRun);
  level ++;
  $("h1").text("Level " + level);
}


//user choose color
$(".btn").on("click", function(){
  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  console.log(userClickedPattern);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  if (level == userClickedPattern.length){
    checkAnswer();
  }
});

//play the sound
function playSound(colorPlay){
  var colorSound = new Audio("sounds/" + colorPlay + ".mp3");
  colorSound.play();
}

// make clicked button grey
function animatePress(ChosenColour){
  $("." + ChosenColour).addClass("pressed");

  setTimeout(function(){
    $("." + ChosenColour).removeClass("pressed");
  }, 100);
}


// chkcing if arrays equal
function checkAnswer(){
  function arraysEqual(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length != b.length) return false;

    for (var i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }

  if(arraysEqual(gamePattern, userClickedPattern)){
    setTimeout(function(){ nextSequence(); }, 1000);
    userClickedPattern = [];
  }else{
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);

    $("h1").text("Game Over, Press 'a' to Restart");

    var colorSound = new Audio("sounds/wrong.mp3");
    colorSound.play();
    gamePattern = [];
    start();
  }
}
