var initializeGame = () => {
    var game = new Game();
    game.initialize();
    console.log(game);
}

$(document).ready(initializeGame);

class Game {
    constructor() {
        this.theObject = this;
        this.randomNumber = null;
        this.theGuessString = null;
        this.theGuess = null;
        this.numberOfGuess = 0;
        this.submitBtn = null;
        this.inputVal = null;
        this.displayTextBox = null;
        this.playAgainBtn = null;
        this.guessHistory = null;
        this.guessHistoryArray = [];
        this.currentguess = null;
    };
    initialize() {
        this.submitBtn = $(".submitBtn");
        this.inputVal = $(".inputBar");
        this.displayTextBox = $("#talkbubble");
        this.playAgainBtn = $(".playAgainBtn");
        this.guessHistory = $(".guessHistory");;
        this.currentguess = $(".currentGuess");
        this.randomNumber = this.pickNumber();
        // this.submitBtn.on('click', this.makeGuess.bind(this.theObject));
        // this.playAgainBtn.on('click', this.resetGame.bind(this.theObject));
        this.submitBtn.on('click', ()=>this.makeGuess());
        this.playAgainBtn.on('click', ()=>this.resetGame());
    }
    pickNumber() {
        return Math.floor(Math.random() * 10) + 1;
    };
    clearInputValue() {
        this.inputVal.val('');
    };
    makeGuess() {
        this.numberOfGuess++;
        this.currentguess.text(`Nummber of times guessed: ${this.numberOfGuess}`)
        this.theGuessString = this.inputVal.val();
        this.theGuess = parseInt(this.theGuessString);
        //if theGuess is < 1, > 10, not an interger, or not a number then alert the message
        if (this.theGuess < 1 | this.theGuess > 10 | this.theGuessString % 1 !== 0 | typeof this.theGuess !== "number" | isNaN(this.theGuess)) {
            this.displayTextBox.text("Please input a whole number between 1 and 10.");
        } else {
            this.guessHistoryArray.push(this.theGuess);
            this.guessHistory.text(`Guess history: ${this.guessHistoryArray.join(" ")}`);
            // If the_guess is the same as the_number, it changes the contents of #response_div to "You guessed it!" 
            if (this.numberOfGuess > 10) {
                this.displayTextBox.text("Game over! You have guessed more than 10 times!");
                this.gameOver();
            } else if (this.theGuess === this.randomNumber) {
                this.displayTextBox.text("You guessed it!");
                this.gameOver();
            } else if (this.theGuess === this.randomNumber + 1 | this.theGuess === this.randomNumber - 1) {
                this.displayTextBox.text("Very close. Try again.");
            }
            // If the_guess is higher than the_number, it changes the contents of #response_div to "Too High!"
            else if (this.theGuess > this.randomNumber) {
                this.displayTextBox.text("Too high!");
            }
            // If the_guess is lower than the_number, it changes the contents of #response_div to "Too Low!"
            else {
                this.displayTextBox.text("Too low!");
            }
        }
        this.clearInputValue();
    };
    gameOver() {
        this.inputVal.addClass('invisible');
        this.submitBtn.addClass('invisible');
        this.playAgainBtn.removeClass('invisible');
    };
    resetGame() {
        this.inputVal.removeClass('invisible');
        this.submitBtn.removeClass('invisible');
        this.playAgainBtn.addClass('invisible');
        this.randomNumber = this.pickNumber();
        this.clearInputValue();
    };
}