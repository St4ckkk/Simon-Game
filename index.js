let level = 0; // Initialize the game level
let started = false; // Initialize the game status
let score = 0; // Initialize the player's score
let highestScore = 0; // Initialize the highest score
const buttonColours = [
    "red", "blue", "green", "yellow"
]; // Define the available button colors
let gamePattern = []; // Initialize the pattern the game generates
let userClickedPattern = []; // Initialize the pattern the user clicks on

function updateLevel() {
    $("#level-title").text("Level " + level); // Update the displayed level
}

function updateScore() {
    $("#score").text("Score: " + score); // Update the displayed score
    $("#highest-score").text("Highest Score: " + highestScore); // Update the displayed highest score
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function nextSequence() {
    let randomNumber = Math.floor(Math.random() * buttonColours.length); 
    let randomChosenColour = buttonColours[randomNumber]; // Generate a random color
    gamePattern.push(randomChosenColour); // Add the color to the game pattern
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100); // Show and hide the button with animation
    animatePress(randomChosenColour);
    playSound(randomChosenColour); // Play the corresponding sound
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed"); // Add a pressed effect to the button
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed"); // Remove the pressed effect
    }, 100);
}

$(".btn").click(function () { 
    let userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor); // Add the clicked color to the user's pattern
    $("#" + userChosenColor).fadeOut(100).fadeIn(100); // Show and hide the button with animation
    $("#" + userChosenColor).addClass("pressed"); // Add a pressed effect to the button
    setTimeout(function () {
        $("#" + userChosenColor).removeClass("pressed"); // Remove the pressed effect
    }, 100);
    playSound(userChosenColor); // Play the corresponding sound
    level++; // Increase the level
    updateLevel(); // Update the displayed level
    checkAnswer(userClickedPattern.length-1); // Check if the user's pattern matches the game pattern
});

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("Success");
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                userClickedPattern = [];
                score++; // Increase the score when the pattern is successfully matched
                if (score > highestScore) {
                    highestScore = score; // Update the highest score if needed
                }
                updateScore(); // Update displayed scores 
                updateLevel(); 
                nextSequence(); // Move to the next level
            }, 1000);
        }
    } else {
        console.log("Fail");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key To Restart");
        startOver();
    }
}

function startOver() {
    level = 0; // Reset the level
    gamePattern = []; // Clear the game pattern
    userClickedPattern = []; // Clear the user's pattern
    started = false; // Reset the game status
    score = 0; // Reset the score
    updateScore(); // Update the displayed score
}

$(document).keydown(function (event) {
    if (!started) {
        updateLevel(); // Update the displayed level
        started = true; // Start the game
        updateScore(); // Initialize the displayed scores
        nextSequence(); // Start the game by generating the first pattern
    }
});
