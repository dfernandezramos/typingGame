const quotes = [
    'When you have eliminated the impossible, whatever remains, however improbable, must be the truth',
    'There is nothing more deceptive than an obvious fact',
    'I ought to know by this time that when a fact appears to be opposed to a long train of deductions it invariably proves to be capable of bearing some other interpretation',
    'I never make exceptions. An exception disproves the rule',
    'What one man can invent another can discover',
    'Nothing clears up a case so much as stating it to another person',
    'Education never ends, Watson. It is a series of lessons, with the greatest for the last',
];
const quoteElement = document.getElementById('quote');
const messageElement = document.getElementById('message');
const typedValueElement = document.getElementById('typed-value');

let words = [];
let wordIndex = 0;
let startTime = Date.now();

// Add a button click listener to trigger an anonymous method that will:
// - Select a random quote.
// - Setup the user interface.
// - Setup tracking for current word.
// - Control typing timing.
document.getElementById('start').addEventListener('click', () => {
    // get a quote
    const quoteIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[quoteIndex];

    // put the quote into an array of words
    words = quote.split(' ');

    // reset the word index for typing tracking
    wordIndex = 0;

    // Create an array of span elements so we can set a class
    const spanWords = words.map(function(word) { return `<span>${word} </span>`});

    // Convert into string and set as innerHTML on quote display
    quoteElement.innerHTML = spanWords.join('');

    // Highlight the first word
    quoteElement.childNodes[0].className = "highlight";

    // Clear any prior message
    messageElement.innerText = "";

    // Setup the textbox
    typedValueElement.value = "";

    // enable the input element
    typedValueElement.disabled = false;

    // Set focus
    typedValueElement.focus();

    // Start listening for key pressed values on the input element
    typedValueElement.addEventListener('input', keyPressed);

    // Start the timer
    startTime = new Date().getTime();
});

function keyPressed () {
    if (wordIndex === words.length){
        return;
    }

    // Get the current word and the typed value
    const currentWord = words[wordIndex];
    const typedValue = typedValueElement.value;

    if (typedValue === currentWord &&  wordIndex === words.length - 1) { // the typed word is correct and there are no more words to type
        const elapsedTime = new Date().getTime() - startTime;
        const message = `Congratulations! You finished in ${elapsedTime / 1000} seconds.`
        messageElement.innerText = message;
        typedValueElement.disabled = true;
        typedValueElement.removeEventListener('input', keyPressed)
        wordIndex++;

        for (const wordElement of quoteElement.childNodes) {
            wordElement.className = "correct";
        }

        const highscore = localStorage.getItem ('highscore');

        if (highscore === null || elapsedTime < highscore) {
            localStorage.setItem('highscore', elapsedTime)
            var highscorerName = prompt(`You made the highest score! ${elapsedTime / 1000}`, "Enter your name here");
            localStorage.setItem('highscorerName', highscorerName)
        } else {
            const highscorerName = localStorage.getItem ('highscorerName');
            alert(`You completed the quote in ${elapsedTime} seconds! Highest score: ${highscore / 1000} by ${highscorerName}`);
        }
    } else if (typedValue.endsWith(' ') && typedValue.trim() === currentWord) { // the typed word is correct
        typedValueElement.value = "";
        quoteElement.childNodes[wordIndex++].className = "";

        if (wordIndex === words.length){
            return;
        }

        quoteElement.childNodes[wordIndex].className = "highlight";
    } else if (currentWord.startsWith(typedValue)) { // the typed word is inclomplete, but correct
        typedValueElement.className = "";
    } else { // the typed word is incorrect
        typedValueElement.className = "error";
    }
}
