// words => tableau d'objets. Propriétés : word, difficulty

const maxDifficulty = 196;

let level = 1;
let wordToGuess = ""; //pickWord(level).word;
let wordToGuessWA = ""; //withoutAccents(wordToGuess);
/* let gameStarted = false; */
let usedLetters = "";
/* let finished = false; */
let totalGuesses = 0;
let falseGuesses = 0;
let maxFalseGuesses = 7;

highScore = localStorage.getItem("highScore");
if (highScore == null) {
  localStorage.setItem("highScore", "");
  highScore = "";
}
startGame();

document.getElementById("start-game").addEventListener("click", function() {
  startGame();
});
document.getElementById("difficulte").addEventListener("change", function() {
  level = parseInt(this.value);
  startGame();
});
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

function displayKeyboard() {
  const elementKeyboard = document.getElementById("keyboard");
  const alphabet = "AZERTYUIOPQSDFGHJKLMWXCVBN";
  displayHighscore();
  elementKeyboard.innerHTML = "";
  document.getElementById("image-pendu").src = "assets/images/pendu1.png";
  document.getElementById("mask").innerHTML = mask;
  for (elem of alphabet) {
    let span = document.createElement("span");
    span.setAttribute("class", "active");
    span.innerHTML = elem;
    elementKeyboard.append(span);
    span.addEventListener("click", function() {
      this.className = "inactive";
      let letter = this.innerHTML;
      usedLetters = usedLetters + letter;
      if (updateMask(letter)) {
        document.getElementById("mask").innerHTML = mask;
      } else {
        falseGuesses++;
        document.getElementById("image-pendu").src =
          "assets/images/pendu" + (falseGuesses + 1) + ".png";
        document.getElementById("remaining-guesses").innerHTML =
          "Nombre de fautes autorisées : " + (maxFalseGuesses - falseGuesses);
        if (falseGuesses == maxFalseGuesses) {
          alert("You lost ! The word was " + wordToGuess);
          document.getElementById("mask").innerHTML = wordToGuess;
        }
      }
      if (mask == wordToGuessWA) {
        let score = calculScore();
        addHighScore(score);
        alert(
          "Congrats ! The word was " +
            wordToGuess.toUpperCase() +
            ". You won " +
            score +
            " points. Click on RESTART GAME to play again!"
        );
      }
    });
  }
}
function addHighScore(score) {
  let today = new Date();
  console.log(today);
  let year = today.getFullYear();
  let month = today.getMonth();
  let day = today.getDate();
  let fullDate = day + "/" + month + "/" + year;
  let newHighScore = fullDate + " : " + score;
  if (highScore == "0") {
    highScore = newHighScore;
  } else {
    highScore = newHighScore + ";" + highScore;
  }
  localStorage.setItem("highScore", highScore);
  displayHighscore();
}
function displayHighscore() {
  if (highScore == "0") return false;
  let individualHighScores = highScore.split(";");
  let tableHighScores = [];
  individualHighScores.forEach(element => {
    let x = element.split(":");
    tableHighScores.push({ date: x[0].trim(), score: parseInt(x[1].trim()) });
  });
  tableHighScores.sort((a, b) => (a.score < b.score ? 1 : -1));
  console.log(tableHighScores);
  let html = '<ul class="list-group">';
  tableHighScores.forEach(element => {
    console.log(element);
    html +=
      '<li class="list-group-item">' +
      element.date +
      " : " +
      element.score +
      " pts</li>";
  });
  html += "</ul>";
  document.getElementById("high-scores").innerHTML = html;
}
function calculScore() {
  let score;
  score = mask.length * level + (maxFalseGuesses - falseGuesses) * level;
  return score;
}
function startGame() {
  wordToGuess = pickWord(level).word;
  wordToGuessWA = withoutAccents(wordToGuess);
  usedLetters = "";
  totalGuesses = 0;
  falseGuesses = 0;
  mask = createMask();
  displayKeyboard();
  console.log(mask);
  document.getElementById("remaining-guesses").innerHTML =
    "Nombre de fautes autorisées : " + (maxFalseGuesses - falseGuesses);
}
