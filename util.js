// Constants
const INVALID_CHAR_REGEX = /[!"#$%|&()*+,-./\\:;|<=>?@[\]^_`{|}~\t\n\r]/g;
const CONTRACTION_REGEX = /'+\s|\s+'/g;
const MAXIMUM_RESULT_LENGTH = 5;

// Working variables
let wordsArray = [];
let wordsObj = {};
let result = '';

function processLineOfText(lineOfText) {
    // Clean up line of text and add each new word to array for processing
    const cleanLineOfText = lineOfText.toLowerCase().replace(INVALID_CHAR_REGEX, ' ').replace(CONTRACTION_REGEX, ' ');
    const newWords = cleanLineOfText.split(' ');
    newWords.forEach(word => {
        if (word) wordsArray.push(word);
    });

    // Process all possible 3 word phrases stored in the array
    // (will run on loop as long as there are enough words fora phrase before reading next line of text)
    while (wordsArray.length > 2) {
        // Create the 3 word phrase
        const threeWordPhrase = `${wordsArray[0]}${wordsArray[1]}${wordsArray[2]}`;

        // Add to the tally for that phrase
        wordsObj[threeWordPhrase] = 1 + (wordsObj[threeWordPhrase] || 0);

        // Remove first word from beginning of array
        wordsArray.shift();
    }

    // Sort by tally and only save the most common phrases
    const topPhraseList = Object.entries(wordsObj)
        .sort(([, tally1], [, tally2]) => tally2 - tally1).slice(0, MAXIMUM_RESULT_LENGTH);

    // Format result for output
    result = topPhraseList.map(phrase => {
        return `${phrase[0]} - ${phrase[1]}`;
    }).join('\n');
}

function printResult() { console.log(result) }

module.exports.processLineOfText = processLineOfText;
module.exports.printResult = printResult;