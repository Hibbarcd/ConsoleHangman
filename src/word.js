
var Letter = require("./letter.js");

function Word(word) {
	// word and array of letters in word
	this.word = word;
	this.letterArray = word.split + "";
	this.letterObjectArray = [];
	this.currentGuess = [];
	this.flag = false;
	this.makeWord = function() {
		// runs Letter constructor 
		for (var i = 0; i < this.letterArray.length; i++) {
			this.letterObjectArray[i] = new Letter(this.letterArray[i]);
		}
	};
	this.showGuess = function(userguess) {
		var guessedRight = false;

		// updates and displays the user's current guessing progress
		for (var i = 0; i < this.letterArray.length; i++) {
			guessedRight = this.letterObjectArray[i].checkGuess(userguess);
			this.currentGuess[i] = this.letterObjectArray[i].returnLetter();

			if (guessedRight == true) {
				this.flag = true;
			}
		}

		//alert flag logic
		if (this.flag == true) {
			console.log("\x1b[32m", "CORRECT!");
			console.log("\x1b[37m", "CURRENT GUESS: " + this.currentGuess.join(" ") + "\n");
			this.flag = false;
			return true;
		} else {
			console.log("\x1b[31m", "INCORRECT!");
			console.log("\x1b[37m", "CURRENT GUESS: " + this.currentGuess.join(" ") + "\n");
			return false;
		}
	};
	
}

module.exports = Word;