var POSSIBLE_WRDS = ["hams", "gold", "kug", "epoch", "moon", "harbor"];
var word = "";
var guesses = "";
const MAX_GUESSES = 6;
const NO_GUESSES = 0;
var guess_count = MAX_GUESSES;
var statsString = "";





function newGame(){
    var randomIndex = parseInt(Math.random() * POSSIBLE_WRDS.length);
    word = POSSIBLE_WRDS[randomIndex];
    guesses = "";
    guess_count = MAX_GUESSES;
    statsString = " ";
    updatePage();
    console.log(`Send me the word to guess: ${word}`);
}

function guessLetter(){
    var input = document.getElementById("guess");
    var letter = input.value;
    if(word.indexOf(letter) < 0) {
        statsString = "Wrong letter!";
        console.log(`Error!`);
        guess_count--;
    }

    if(word.indexOf(letter) === 0){
        statsString = "Correct Letter!";
    }
    
    if(letter === word.charAt(word.length) && (word.indexOf(letter) === 0)){
        guesses = "";
        console.log(`You've already put that letter.`);
        statsString = "Try another letter, that one has already been used.";
    }

    if((guess_count !== 0) && (guesses === word.indexOf(letter))){
        statsString = "You won! Play again?";
    }

    if(guess_count === 0){
        guesses = "";
        guess_count = NO_GUESSES;
        statsString = "You lost! Try again.";
    }
    console.log(`Show me the letter guessed!: ${letter}`);
    guesses += letter;
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