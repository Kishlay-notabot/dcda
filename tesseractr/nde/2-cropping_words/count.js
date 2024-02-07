const fs = require('fs');

// Read the JSON file
const filePath = 'ocr_results.json';

fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error(`Error reading file: ${err}`);
    return;
  }

  // Specify the target string
  const targetString = 'text';

  // Count occurrences in the entire file
  const occurrencesCount = (data.match(new RegExp(targetString, 'gi')) || []).length;

  console.log(`Occurrences of "${targetString}": ${occurrencesCount}`);
});
