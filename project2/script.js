// API endpoint for getting a random 5-letter word
const API_ENDPOINT = 'https://random-word-api.herokuapp.com/word?number=1&length=5';
// API endpoint for checking if a word is valid
const VALIDATION_API_ENDPOINT = 'https://api.dictionaryapi.dev/api/v2/entries/en/';

// List of possible words
const words = ['APPLE', 'WORLD', 'TODAY', 'MANGO', 'HELLO'];

// Randomly select a word from the list
let answer = "";

// Variables
const MAX_CHANCES = 6;
let remainingChances = MAX_CHANCES;
let guessedWords = [];
let usedLettersBoard = document.getElementById('used-letters-board');


// Get the game board elements
const gameBoardElement = document.getElementById('game-board');
const feedbackRowElement = document.getElementById('feedback-row');
const guessButton = document.getElementById('guess-button');
const newGameButton = document.getElementById('new-game-button');
const guessInput = document.getElementById('guess-input');


// Generate the game board
function generateGameBoard() {
    for (let i = 0; i < MAX_CHANCES; i++) {
        const wordRow = document.createElement('div');
        wordRow.classList.add('word-row');

        for (let j = 0; j < answer.length; j++) {
            const letterBox = document.createElement('div');
            letterBox.classList.add('letter-box');
            wordRow.appendChild(letterBox);
        }

        gameBoardElement.appendChild(wordRow);
    }
}


// Update the game board with the current guess
function updateGameBoard(guess) {
    var answer_copy = answer;
    // JavaScript object to record visited indices
    var visited = { 0: false, 1: false, 2: false, 3: false, 4: false };
    const letterBoxes = Array.from(gameBoardElement.children);

    for (let i = 0; i < letterBoxes.length; i++) {
        const letterBox = letterBoxes[i].querySelectorAll('.letter-box');
        const guessBoxes = Array.from(letterBox);

        if (guessBoxes.every(box => box.textContent !== '')) {
            continue;
        }
        
        // update correct letter first
        guessBoxes.map((letterBox, index) => {
            if (!visited[index]) {
                const letter = guess[index];
                // update content of each box
                letterBox.textContent = letter;
                if (letter === answer[index]) {
                    visited[index] = true;
                    answer_copy = answer_copy.replace(letter, '');
                    // answer_copy = answer_copy.slice(0, index) + answer_copy.slice(index + 1);
                    letterBox.className = "";
                    letterBox.classList.add('letter-box');
                    letterBox.classList.add('correct-letter');
                }
            }
        });
        // update wrongly placed letter second
        guessBoxes.map((letterBox, index) => {
            if (!visited[index]) {
                const letter = guess[index];
                // letterBox.textContent = letter;
                if (answer_copy.includes(letter)) {
                    visited[index] = true;
                    answer_copy = answer_copy.replace(letter, '');
                    letterBox.className = "";
                    letterBox.classList.add('letter-box');
                    letterBox.classList.add('wrong-place-letter');
                }
            }
        });
        // update not included letters
        guessBoxes.map((letterBox, index) => {
            if (!visited[index]) {
                visited[index] = true;
                letterBox.className = "";
                letterBox.classList.add('letter-box');
                letterBox.classList.add('not-included-letter');
            }
        });

        break;
    }
}

// Update the used letters board
function updateUsedLettersBoard() {
    usedLettersBoard.textContent = "Words used: " + guessedWords.join(', ');
}

// Check the user's guess against the answer
async function checkGuess(guess) {
    guessedWords.push(guess);

    // Validate the guess
    const isValidWord = await validateGuess(guess);
    if (!isValidWord) {
        alert('Please enter a valid 5-letter word.');
        return;
    }
    
    // Update the game board
    updateGameBoard(guess);

    // Check if the guess is correct
    if (guess === answer) {
        displayResult('Congratulations! You guessed the word correctly!', 'green');
        endGame();
    } else {
        // Decrease the remaining chances
        remainingChances--;

        // Check if the chances are used up
        if (remainingChances === 0) {
            displayResult(`Game over! You ran out of chances. The correct word was "${answer}".`, 'red');
            endGame();
        } else {
            displayResult(`Incorrect guess. You have ${remainingChances} chance(s) remaining.`, 'black');
        }
    }
    updateUsedLettersBoard();
}

// Display the game result
function displayResult(message, color) {
    const feedbackElement = document.getElementById('feedback-row');
    feedbackElement.textContent = message;
    feedbackElement.style.color = color;
}

// Generate a new random word for a new game
function generateNewWord() {
    answer = getRandomWord(words);
    console.log("new answer from array is " + answer);
}

// Fetch a random 5-letter word from the API
async function fetchRandomWord() {
    try {
        const response = await fetch(API_ENDPOINT);
        const data = await response.json();
        answer = data[0].toUpperCase();
        console.log("new answer from API is " + answer);
    } catch (error) {
        console.error('Failed to fetch a random word:', error);
    }
}

// Check if the guessed word is valid
// If the API response returns any data (indicating a valid word), the function returns true; otherwise, it returns false.
async function validateGuess(guess) {
    try {
        const response = await fetch(`${VALIDATION_API_ENDPOINT}${guess}`);
        const data = await response.json();
        return data.length > 0;
    } catch (error) {
        console.error('Failed to validate the word:', error);
        return false;
    }
}

// Function to end the game
function endGame() {
    guessButton.disabled = true;
    guessInput.disabled = true;
    newGameButton.style.display = 'inline-block';
}

// Function to start a new game
function startNewGame() {
    remainingChances = MAX_CHANCES;
    guessedWords = [];
    guessInput.value = '';
    guessButton.disabled = false;
    guessInput.disabled = false;
    newGameButton.style.display = 'none';
    gameBoardElement.innerHTML = '';
    feedbackRowElement.innerHTML = '';
    usedLettersBoard.textContent = '';
    
    // generateNewWord();
    // generateGameBoard();

    // call the fetchRandomWord function before generating the game board. This ensures that a new random word is fetched each time a new game is started.
    fetchRandomWord()
        .then(() => generateGameBoard())
        .catch(() => console.error('Failed to start a new game.'));
}

// Function to get a random word from the list
function getRandomWord(wordList) {
    const randomIndex = Math.floor(Math.random() * wordList.length);
    return wordList[randomIndex];
}

// Event listener for the guess button
guessButton.addEventListener('click', () => {
    const guess = guessInput.value.toUpperCase();

    // Validate the guess
    if (!isValidGuess(guess)) {
        alert('Please enter a valid 5-letter word.');
        return;
    }

    // Check if the guess has already been made
    if (guessedWords.includes(guess)) {
        alert('You have already guessed this word. Please try a different word.');
        return;
    }

    checkGuess(guess);
});

// Event listener for the new game button
newGameButton.addEventListener('click', startNewGame);

// Function to validate the guess
function isValidGuess(guess) {
    return /^[A-Z]{5}$/.test(guess);
}

// Initialize the game
startNewGame();
