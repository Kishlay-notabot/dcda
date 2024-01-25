const Tesseract = require('tesseract.js');

const imageFilePath = 'photo.jpg';

Tesseract.recognize(
  imageFilePath,
  'hin', 
  {
    psm: 6,
  }
).then(({ data }) => {
  console.log(JSON.stringify(data, null, 2)); // Print the entire result for inspection

  // The rest of your code to process blocks or symbols
}).catch((error) => {
  console.error('Error:', error);
});
