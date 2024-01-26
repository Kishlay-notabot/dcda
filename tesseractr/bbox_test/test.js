const Tesseract = require('tesseract.js');

const imageFilePath = 'photo.jpg';

Tesseract.recognize(
  imageFilePath,
  'hin', 
  {
    psm: 8,
  }
).then(({ data }) => {
  console.log(JSON.stringify(data, null, 2)); // Print the entire result for inspection


  // Gpt generated code to learn block output 
  // The rest of your code to process blocks or symbols
}).catch((error) => {
  console.error('Error:', error);
});
