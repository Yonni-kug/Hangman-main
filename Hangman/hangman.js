var POSSIBLE_WRDS = ["hams", "gold", "kug", "epoch", "moon", "harbor"];
var word = "";
var guesses = "";
const MAX_GUESSES = 6;
const NO_GUESSES = 0;
var guess_count = MAX_GUESSES;
var statsString = "";
var endGame = true;
var isWrongLetter = false;

function newGame(){
    var randomIndex = parseInt(Math.random() * POSSIBLE_WRDS.length);
    word = POSSIBLE_WRDS[randomIndex];
    guesses = "";
    guess_count = MAX_GUESSES;
    statsString = " ";
    endGame = false
    updatePage();
    console.log(`Send me the word to guess: ${word}`);
}

function guessLetter(){
    var input = document.getElementById("guess");
    var letter = input.value;
    if(endGame == true){
        statsString = "Press New Game to start, silly!";
    }

    else if((word !== "") && (guesses.indexOf(letter) < 0) && (guess_count > 0) && (endGame == false)){
        isWrongLetter = false;
        guesses += letter;
        console.log(`letter checked: ${letter}`)
        statsString = "Correct Letter!";
    }
    
    else if((word !== "") && (guesses.indexOf(letter) >= 0) && (guess_count > 0) && (endGame == false)){
        statsString = "You already guessed this letter.";
    }


    if((word.indexOf(letter) < 0) && (guess_count > 0) && (endGame == false) && (word !== "")) {
        isWrongLetter = true;
        statsString = "Wrong letter!";
        console.log(`Error!`);
        guess_count--;
    }

    else if((word.indexOf(letter) < 0) && (guess_count > 0) && (endGame == false) && (word !== "") && (guesses.indexOf(letter) >= 0) && (isWrongLetter == true)){
        statsString = "You already guessed this letter. IT'S ALSO WRONG ! ! !";
    }

    if(guess_count === 0){
        guesses = "";
        guess_count = NO_GUESSES;
        statsString = "You lost! Try again.";
    }
    
    console.log(`Show me the letter guessed!: ${letter}`);
    updatePage();
    input.value = "";
    console.log(`Guesses Left: ${guess_count}`);


}   


function updatePage(){
    var clueString = "";
    for (var i = 0; i < word.length; i++){
        var currentLetter = word.charAt(i);
        if(guesses.indexOf(currentLetter) >= 0){
            clueString += currentLetter + " ";
        }
        
        else {
            clueString += "_ ";
        }
    }

    if((clueString.indexOf("_") < 0) && (word !== "")){
        endGame = true;
        statsString = "You won! Play again?";
    }

var clue = document.getElementById("clue");
    clue.innerHTML = clueString;

var guessArea = document.getElementById("guesses");
    guessArea.innerHTML = "Guessed Letters: " + guesses;
    
var image = document.getElementById("HangmanImage");
    image.src = "images/images/hangman" + guess_count + ".gif";
    console.log(`hangman image currently: ${image}`);
    console.log(`progress update: ${statsString}`)

var winorlose = document.getElementById("winorlose");
    winorlose.innerHTML = statsString;
    

}