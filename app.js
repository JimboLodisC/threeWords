// Three Words by Jim Collins 07/11/2022
// --------------------------------------------------
// Find the most common 3-word phrases in a text file

// Modules
const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { getFilePath, printResult, processLineOfText } = require('./util');

getTopPhrasesFromFile(getFilePath(), processLineOfText);

function getTopPhrasesFromFile(filePath, callback) {
    // Create stream for reading the specified file
    const lineReader = readline.createInterface({
        input: fs.createReadStream(filePath)
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
