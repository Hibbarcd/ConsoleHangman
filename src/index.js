var Word = require("./word.js");
var inquirer = require("inquirer");

var alreadyGuessed = false;					
var chosenWord;								
var guessesLeft = 10;						
var guessedLetters = ["You have guessed:"];	
var guessedRight = false;					
var userguess;								
var won = false;							
var wordChoices = [
    ["Igneous", "Metamorphic", "Pyroclastic", "Illuvial", "Fossiliferous", "Agglomerate", "Asthenosphere", "Batholith", "Breccia", "Cambrian", "Concretion", "Dolomite", "Epoch", "Extrusive", "Feldspar", "Gastrolith", "Gneiss", "Isotope", "Limestone", "Lithification", "Mineralization", "Orogenesis", "Topography",
    "Kinetic Chain", "Ketoacidosis", "Hypertrophy", "Plastic Response", "Steroidal Saponins", "Homeostasis", "Biofeedback", "Flexion", "Somatic", "Parasympathetic", "Lymphatic", "Synapse", "Neurological", "Adenotriphosphate", "Norepinephrine", "Dopamine", "Acetylcholine", "Ossification", "Docahexanoic Acid", "Eicosapentanoic Acid", "Inflammatory Response",
    "Isotope", "Polarization", "Valence", "Radiation", "Oxidation", "Reduction", "Acidification", "Molarity", "Molality", "Fission Reaction", "Alkaline", "Cathode", "Catalyst", "Electrode", "Fermentation", "Halogen", "Insoluble", "Metalloid", "Noble Gas", "Polymer", "Saponification", "Sublimation", "Van der Waals", "Stoichiometry", "Titration", "Alkaline Earth"]
];
var wordMatches = true; 					

runGame();

function runGame() {
	console.log("The category is Science!");

	var word = wordChoices[Math.floor(Math.random() * wordChoices.length)];

	chosenWord = new Word(word);
	chosenWord.makeWord();
//===========Convert to lodash==============================
	var blankWord = [];
	for (var i = 0; i < chosenWord.letterArray.length; i++) {
		if (chosenWord.letterArray[i] == " ") {
			blankWord.push(" ");
		} else {
			blankWord.push("_");
		}
	}
	console.log(blankWord.join(" ") + "\n");
	promptUser();
}

function promptUser() {
	inquirer.prompt([
	{
		message: "Guess a letter!",
		name: "userguess"
	}
	]).then(function(answer) {
		userguess = answer.userguess.toLowerCase();

		// ==========displays guessed letter=============
		console.log("\x1b[37m", "\nYou guessed: " + userguess);

		// === already guessed this letter?  =============
		for (var i = 0; i < guessedLetters.length; i++) {
			if (userguess == guessedLetters[i]) {
				console.log("\x1b[33m", "You've already guessed this letter!");
				alreadyGuessed = true;
				break;
			} 
		}

		guessedRight = chosenWord.showGuess(userguess);

		if (alreadyGuessed == true) {
			alreadyGuessed = false;
		} else if (guessedRight == false) {
			guessesLeft--;
			guessedLetters.push(userguess);
		} else {
			guessedLetters.push(userguess);
			guessedRight = false;
		}

		guessedLetters = guessedLetters.sort();
		console.log(guessedLetters.join(" "));
		console.log("You have " + guessesLeft + " guesses remaining! \n");

		for (var i = 0; i < chosenWord.letterArray.length; i++) {
			if (chosenWord.currentGuess[i] != chosenWord.letterArray[i]) {
				wordMatches = false;
			}
		}

		if (wordMatches == true) {
			won = true;
			wordMatches = false;
		} else {
			wordMatches = true;
		}

// ============Win/Lose game logic========================
		if (won == true) {
			won = false;
			console.log("YOU WIN!!!");
			resetGame();
		} else if (guessesLeft > 0) {
			promptUser();
		} else {
			console.log(" GAME OVER. ")
			resetGame();
		}
	});
}

// ====================reset func==============================
function resetGame() {
	alreadyGuessed = false;
	chosenWord;
	guessesLeft = 10;
	guessedLetters = ["You have guessed:"];
	guessedRight = false;
	userguess;
	won = false;
	wordMatches = true; 
// =================Play again?================================
	inquirer.prompt([
	{
		message: "Continue?",
		type: "confirm",
		default: true,
		name: "keepgoing"
	}
	]).then(function(answer) {
		if(answer.keepgoing == true) {
			runGame();
		} else {
			console.log(" Okay, thanks for playing! ");
		}
	});
}