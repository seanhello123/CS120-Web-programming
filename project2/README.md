The Wordle Game is a web-based word guessing game inspired by the popular Wordle game found in the New York Times. In this game, players have 6 chances to guess a 5-letter word. Each guess is evaluated, providing feedback on which letters are in the correct place and which letters are in the word but in the wrong place. In this game, green background indicates the correct placement of a letter, yellow indicates a wrong placement of the letter, and white indicates letters that do not appear in the word.

## How to Play
1. Enter a 5-letter word guess in the input field.
2. Click the "Guess" button to check your guess.
3. If the guess is correct, you win! The game will display a congratulatory message.
4. If the guess is incorrect, you will receive feedback on which letters are in the correct place and which are in the word but in the wrong place.
5. Continue guessing until you either guess the correct word or use all 6 chances.
6. Once the game is finished, you can start a new game by clicking the "New Game" button.

## Features
* Fetching of a word is done in two ways:
    1. Randomly generated 5-letter word for each game from a predefined array of words
    2. Get a 5 letter word using an API https://random-word-api.herokuapp.com/word?number=1&length=5
    * Note: the default is the second way, i.e. fetching a word from API. If you want to switch to the first way, go to startNewGame() function in the script.js file, uncomment the lines 198-199
        ```js
        generateNewWord();
        generateGameBoard();
        ```
        
        and comment out the lines 202-204 and refresh the page
        ```js
        fetchRandomWord()
            .then(() => generateGameBoard())
            .catch(() => console.error('Failed to start a new game.'));
        ```
* Responsive design for optimal viewing on different screen sizes under 600 pixels
* Visual feedback on the game board indicating correct and wrong letters
* The script.js file contains the following constructs:
    * An array: words which is an array of words to choose from
    * An arrow function: guessBoxes.map((letterBox, index) => {});
    * An event handler: guessButton.addEventListener();
    * .map or .forEach: guessBoxes.map((letterBox, index) => {});
    * A JavaScript object: var visited, key-value pair to store visited indices in a row

## Extra Credit:
* Validation of the guessed word to ensure it is a valid 5-letter word using a second API https://api.dictionaryapi.dev/api/v2/entries/en/
* Display a used letter board at the bottom of the page, and it will alert the user if a word was entered before to only allow new words entered each time.

## Technologies Used
* HTML
* CSS
* JavaScript


