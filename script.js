var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = []
var userClickedPattern = [];

var isGameStarted = false;

var level = 0;

$(document).keypress(function () {
    if (!isGameStarted) {
        $('#level-title').text("Level " + level);
        nextSequence();
        isGameStarted = true;
    }
})

$('.btn').click(function () {
    var usenChosenColour = $(this).attr('id');
    userClickedPattern.push(usenChosenColour);

    playSound(usenChosenColour);
    animatePress(usenChosenColour);
    checkAnswer(userClickedPattern.length - 1);
})

function nextSequence() {

    userClickedPattern = [];

    level++;
    $('#level-title').text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $('#' + currentColour)
        .last()
        .addClass('pressed')
        .delay(100)
        .queue(function (next) {
            $(this).removeClass('pressed');
            next();
        });
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        playSound('wrong');
        $('#level-title').text("Game Over, Press Any Key to Restart");
        $('body')
            .last()
            .addClass('game-over')
            .delay(200)
            .queue(function (next) {
                $(this).removeClass('game-over');
                next();
            });

        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    isGameStarted = false;
}