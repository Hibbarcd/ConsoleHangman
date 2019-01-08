function Letter(correctLetter) {
	this.correctLetter = correctLetter;
	this.guessed = false;
	this.returnLetter = function() {
		if (this.guessed == true) {
			return correctLetter;
		} else {
			return "_";
		}
	}
	this.checkGuess = function(userguess) {
		if (this.guessed == true) {
			this.guessed = true;
			return false;
		} else if (correctLetter == " ") {
			this.guessed = true;
			return false;
		} else if (userguess == correctLetter) {
			this.guessed = true;
			return true;
		} else {
			this.guessed = false;
			return false;
		}
	};
}

module.exports = Letter;