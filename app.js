// Three Words by Jim Collins 07/11/2022
// --------------------------------------------------
// Find the most common 3-word phrases in a text file

// Modules
const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { printResult, processLineOfText } = require('./util');

// Constants
const TEXT_FILENAME = 'test_file.txt';
// const TEXT_FILENAME = 'chapter1.txt';
// const TEXT_FILENAME = 'moby_dick.txt';

getTopPhrasesFromFile(TEXT_FILENAME, processLineOfText);

function getTopPhrasesFromFile(filename, callback) {
    // Create stream for reading the specified file
    const lineReader = readline.createInterface({
        input: fs.createReadStream(path.resolve(__dirname, filename))
    });

    // Read each line of the text file for processing
    lineReader.on('line', line => {
        callback(line);
    });

    // When done reading lines, print the resulting phrases
    lineReader.on('close', function () {
        printResult();
    });
}
