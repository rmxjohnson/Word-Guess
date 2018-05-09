// Javascript for Homework Assignment 3
// Word Guess Game
// Rhonda Johnson


var wordArray = [];
var numberGuessesAllowed = 12;
var correctGuesses = 0;
var guesses = [];
var wins = 0;
var losses = 0;

// Constructor function for wordItem object
// objWord: word choice
// addon: the addon of an image  associated with the word choice
var wordItem = function (wordArg, addonArg) {
    this.objWord = wordArg;
    this.addon = addonArg;
};

// Array of wordItem objects
var wordArray = [
    new wordItem("SPAGHETTI", "Spaghetti.jpg"),
    new wordItem("LASAGNA", "Lasagna.jpg"),
    new wordItem("PIZZA", "Pizza.jpg"),
    new wordItem("STROMBOLI", "Stromboli.jpg"),
    new wordItem("TIRAMISU", "Tiramisu.jpg"),
    new wordItem("GELATO", "Gelato.jpg"),
    new wordItem("RISOTTO", "Risotto.jpg"),
    new wordItem("CANNOLI", "Cannoli.jpg"),
    new wordItem("PANETTONE", "Panettone.jpg"),
    new wordItem("PROSCIUTTO", "Prosciutto.jpg"),
];

// Get a new word from the word array.  
// Index within the array is randomly generated
var getNextWordArray = function () {

    //var currentWord = wordArray[Math.floor(Math.random() * wordArray.length)];
    // Math.random() - generates a number 0 <= x < 1
    var random = Math.random();
    var randomIndexUnrounded = random * wordArray.length;
    var randomIndex = Math.floor(randomIndexUnrounded);
    var currentItem = wordArray[randomIndex];
    var currentWord = currentItem.objWord;
    var currentAddon = currentItem.addon;
    return currentItem;
}

// Get a new word from the wordbank array.  
// Index within the array is randomly generated
// var getNextWord = function () {
//     //var currentWord = wordBank[Math.floor(Math.random() * wordBank.length)];
//     var random = Math.random();
//     var randomIndexUnrounded = random * wordBank.length;
//     var randomIndex = Math.floor(randomIndexUnrounded);
//     var currentWord = wordBank[randomIndex];
//     return currentWord;
// }




// Check to see if player won the game
// loop through the current word and 
// check to see that all letters in the current word 
// are also in the guesses array
var wonGame = function () {
    for (var i = 0; i < word.length; i++) {
        var currentCharacter = word.charAt(i);
        if (guesses.indexOf(currentCharacter) < 0) {
            return false;
        }
    }

    return true;
}

// Check if a valid guess
// Check if letter A-Z or if the letter was a previous choice
var checkIfValid = function (playerInput) {

    var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    // Check if player input is a letter
    if (alphabet.indexOf(playerInput) < 0) {
        alert("Please select a letter A-Z." + "\nInvalid choice:  " + playerInput);
        return false;
    }

    // Check if current letter has previously been selected by the player
    else if (guesses.indexOf(playerInput) >= 0) {
        alert("You already guessed the letter  " + playerInput + ". \nPlease select another letter.");
        return false;
    }

    // Else - it's a valid guess
    else {
        return true;
    }
}

// Display word with correctly guessed letters in the correct location 
// within the selected word
var getWordToDisplay = function () {
    //console.log("Word = " + word);
    var result = "";
    for (var i = 0; i < word.length; i++) {
        var currentCharacter = word.charAt(i);
        
        // If current word character is also in the guesses array, display the letter
        if (guesses.indexOf(currentCharacter) >= 0){
            result = result + currentCharacter;
        }
        // else display a "_" instead of the letter
        else {
            result = result + "_";
        }
        result = result + " ";
    }
    //console.log ("Result" + result);
    
    return result;
}


// Display the letters already guessed
var getGuessesToDisplay = function () {
    var result = "";
    for (var i = 0; i < guesses.length; i++) {
        result += guesses[i] + " ";
    }

    return result;
}

// Count the number of guesses not in the selected word
var incorrectGuessCount = function () {
    var count = 0;
    for (var i = 0; i < guesses.length; i++) {
        var currentGuess = guesses[i];
        // if a guessed letter is not in the word, increment the count
        if (word.indexOf(currentGuess) < 0) {
            count++;
        }
    }
    return count;
};

// Number of guesses left 
var getRemainingGuesses = function () {
    return (numberGuessesAllowed - guesses.length);
}

// Get a new word and set the player guesses array back to an empty array
var newGame = function (winner) {
    // reset the guesses array 
    guesses = [];

    // set the html string to display the correct image of the word
    var htmlString = "<img id=\"currentImage\" src=\"assets/images/" + currentAddon + "\" alt=\"ItalianFood\">";
    // display the image
    document.getElementById("imageContainer").innerHTML = htmlString;

    // Display winner's message
    if (winner) {
        document.getElementById("userMessage1").innerHTML = "CONGRATULATIONS";
        document.getElementById("userMessage2").innerHTML = "You Won!!";
        document.getElementById("userMessage3").innerHTML = "";
        document.getElementById("userMessage4").innerHTML = word;
    }
    // Display loser's message and the correct word
    else {
        document.getElementById("userMessage1").innerHTML = "*** GAME OVER ***";
        document.getElementById("userMessage2").innerHTML = "You used all your guesses";
        document.getElementById("userMessage3").innerHTML = "Answer:";
        document.getElementById("userMessage4").innerHTML = word;
    }
    
    // Change the message to start a new game
    document.getElementById("pressStart").innerHTML = "Press Any Letter To Start A New Game";
   
    // get a new wordItem 
    var currentItem = getNextWordArray();
    // get new word
    word = currentItem.objWord;
    // get new image
    currentAddon = currentItem.addon;
    } // end of newGame

   

// *******************************************
// Begin the game by getting a new word      *
// *******************************************

// get first word and set the display to _ _ _ _ _
var currentItem = getNextWordArray();
var word = currentItem.objWord;
var currentAddon = currentItem.addon;

var firstDisplay = function(){
    document.getElementById("currentDisplay").innerHTML = getWordToDisplay();
}



// Get player input - when player presses the keyboard
document.onkeyup = function (event) {
    //clear the user message
    document.getElementById("userMessage1").innerHTML = "";
    document.getElementById("userMessage2").innerHTML = "";
    document.getElementById("userMessage3").innerHTML = "";
    document.getElementById("userMessage4").innerHTML = "";

    // Change the instruction
    document.getElementById("pressStart").innerHTML = "Press another letter to Continue";

    // Assign player input as the current letter
    var letter = event.key.toUpperCase();
    //var letter = String.fromCharCode(event.keyCode).toUpperCase();


    // Check to see if the letter is valid input
    var isValid = checkIfValid(letter);
   
    // Only Continue Game if a Valid choice
    if (isValid) {
        // Push a valid letter to the guesses array
        guesses.push(letter);

        // Display word with correctly guessed letters in the correct location 
        //var toDisplay = "";
        document.getElementById("currentDisplay").innerHTML = getWordToDisplay();

        // Get the number of guesses the player has left 
        var guessesLeft = getRemainingGuesses();

        // Display the letters already guessed
        document.getElementById("lettersGuessed").innerHTML = getGuessesToDisplay();

        // set gameOver to false
        var gameOver = false;
        // Player ran out of guesses
        if (guessesLeft <= 0) {
            losses++;
            // Display losses count
            document.getElementById("lossCount").innerHTML = losses;
            
            // Ran out of guesses - set gameOver
            gameOver = true;
        }

         // Always display guesses remaining
         document.getElementById("guessesRemaining").innerHTML = guessesLeft;
        

        var winner = wonGame();

        if (winner) {
            // Player won the game
            // Increment number of WINS & display the win count
            wins++;
            document.getElementById("winCount").innerHTML = wins;
            

            // stop playing by setting guessesLeft to 0
            guessesLeft = 0;
           
            gameOver = true;
        }

       
        

        
        //restart a new game ; set messages; set the image
        if (gameOver) {
            newGame(winner);
        }
    }
}



