// words => tableau d'objets. Propriétés : word, difficulty

const maxDifficulty = 196;

let level = 4;
let wordToGuess = pickWord(level).word;
let wordToGuessWA = "SERGE"; //withoutAccents(wordToGuess);
let gameStarted = false;
let usedLetters = "";
let finished = false;
let totalGuesses = 0;
let falseGuesses = 0;
let mask = createMask();
/* console.log(mask);
while (!finished) {
  letterEntered = prompt("Encodez une lettre").toUpperCase();
  letterEntered = (" " + letterEntered).slice(-1);
  console.log(letterEntered);
  if (usedLetters.indexOf(letterEntered) > -1) {
    continue;
  }
  if (wordToGuessWA.indexOf(letterEntered) > -1) {
    usedLetters += letterEntered;
    if (!updateMask(letterEntered)) {
      falseGuesses++;
    }
    totalGuesses++;
    console.log(mask);
  }
  //finished = true;
} */

function updateMask(letter) {
  let counter = 0;
  let index = -1;
  do {
    index = wordToGuessWA.indexOf(letter, index + 1);
    if (index > -1) {
      console.log("ici" + mask);
      mask = replaceAt(mask, index, letter);
      counter++;
    }
  } while (index > -1);
  if (counter > 0) return true;
  return false;
}
function replaceAt(mask, index, replacement) {
  return (
    mask.substr(0, index) +
    replacement +
    mask.substr(index + replacement.length)
  );
}
function createMask() {
  let mask = "";
  for (let i = 0; i < wordToGuessWA.length; i++) {
    mask += "-";
  }
  return mask;
}
function withoutAccents(word) {
  let accent = "àâäçéèêëîïôöùûüÿ";
  let notAccent = "aaaceeeeiioouuuy";
  let wordWithoutAccents = "";
  for (el of word) {
    index = accent.indexOf(el);
    if (index > -1) {
      wordWithoutAccents += notAccent.charAt(index);
    } else {
      wordWithoutAccents += el;
    }
  }
  return wordWithoutAccents.toUpperCase();
}

// Pickword.
// difficulty : 1 -> 4

function pickWord(difficulty) {
  let nWords = words.length;
  let rangeMax = parseInt(nWords / 4) * difficulty;
  let rangeMin = rangeMax - parseInt(nWords / 4);
  let index = Math.floor(Math.random() * (rangeMax - rangeMin) + rangeMin);

  return words[index];
}
