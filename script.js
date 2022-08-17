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
    const spanWords = words.map(function(word) { return `<span>${word}</span><span> </span>`});

    // Convert into string and set as innerHTML on quote display
    quoteElement.innerHTML = spanWords.join('');

    // Highlight the first word
    quoteElement.childNodes[0].className = "highlight";

    // Clear any prior message
    messageElement.innerText = "";

    // Setup the textbox
    typedValueElement.value = "";

    // Set focus
    typedValueElement.focus();

    // Start the timer
    startTime = new Date().getTime();
});
