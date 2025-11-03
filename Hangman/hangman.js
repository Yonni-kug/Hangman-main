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
    endGame = false;
    updatePage();

    //Debugger line to ensure the word is received.
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
        //Console log to show which letter was chosen.
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
    
    //Attempted to register wrong letters as a duplicate guess. Didn't work. It's fine :p
    else if((word.indexOf(letter) < 0) && (guess_count > 0) && (endGame == false) && (word !== "") && (guesses.indexOf(letter) >= 0) && (isWrongLetter == true)){
        statsString = "You already guessed this letter. IT'S ALSO WRONG ! ! !";
    }

    //Lose condition.
    if(guess_count === 0){
        guesses = "";
        guess_count = NO_GUESSES;
        statsString = "You lost! The correct word was: " + word + ". Try again?";
    }
    
    //Displays in console the letter guessed to make sure it works.
    console.log(`Show me the letter guessed!: ${letter}`);
    updatePage();
    input.value = "";

    //Counts the guesses left.
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

    //Win condition
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

    //Makes the statString display via the "winorlose" text div.
var winorlose = document.getElementById("winorlose");
    winorlose.innerHTML = statsString;
    

}