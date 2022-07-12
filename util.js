const fs = require("fs");
const path = require("path");

// Constants
const INVALID_CHAR_REGEX = /[!"#$%|&()*+,-./\\:;|<=>?@[\]^_`{|}~\t\n\r]/g;
const NOT_A_CONTRACTION_REGEX = /'+\s|\s+'/g;
const MAXIMUM_RESULT_LENGTH = 100;

// Working variables
let wordsArray = [];
let phrasesObj = {};
let result = '';

// Get filename from command line argument
function getFilePath() {
    if (process.argv.length < 3) {
        console.log(`Please provide the filename as an argument.\n> node app.js filename.txt`);
        return;
    }

    // Grab requested filename from the command line
    const arguments = process.argv.splice(2);
    const requestedFileName = arguments[0];

    // Find file in immediate directory or look in `samples` folder
    const primaryPath = path.resolve(__dirname, requestedFileName);
    const secondaryPath = path.resolve(__dirname, 'samples', requestedFileName);
    if (fs.existsSync(primaryPath)) return primaryPath;
    if (fs.existsSync(secondaryPath)) return secondaryPath;
    console.error(`File '${requestedFileName}' was not found.`);
}

// Process a given line of text and populate working variables with data
function processLineOfText(lineOfText) {
    // Clean up line of text and split into array of words
    const newWords = parseTextForNewWords(lineOfText)

    // Add each new word from this line of text to the stack
    newWords.forEach(word => {
        if (word) wordsArray.push(word);
    });

    // Process all possible 3 word phrases stored in the array
    processWordsArray();
}

// Parse and clean up line of text
function parseTextForNewWords(lineOfText) {
    return lineOfText
        .toLowerCase()
        .replace(INVALID_CHAR_REGEX, ' ')
        .replace(NOT_A_CONTRACTION_REGEX, ' ')
        .split(' ');
}

// Run through the current stack of words to find 3 word phrases
function processWordsArray() {
    // will run on loop as long as there are enough words for a phrase
    while (wordsArray.length > 2) {
        // Create the 3 word phrase
        const threeWordPhrase = `${wordsArray[0]} ${wordsArray[1]} ${wordsArray[2]}`;

        // Add to the tally for that phrase
        phrasesObj[threeWordPhrase] = 1 + (phrasesObj[threeWordPhrase] || 0);

        // Remove first word from beginning of array
        wordsArray.shift();
    }
}

function printResult() {
    // Sort by tally and filter for only the most common phrases
    const topPhraseList = Object.entries(phrasesObj)
        .sort(([, tally1], [, tally2]) => tally2 - tally1).slice(0, MAXIMUM_RESULT_LENGTH);

    // Format result for output
    result = topPhraseList.map(phrase => {
        return `${phrase[0]} - ${phrase[1]}`;
    }).join('\n');

    console.log(result);
}

module.exports.getFilePath = getFilePath;
module.exports.processLineOfText = processLineOfText;
module.exports.printResult = printResult;