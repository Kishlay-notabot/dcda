const Tesseract = require('tesseract.js');

const imageFilePath = 'photo.jpg';

Tesseract.recognize(
  imageFilePath,
  'hin', 
  {
  }
).then(({ data }) => {
  console.log(JSON.stringify(data, null, 2)); // Print the entire result for inspection
  // Gpt generated code to learn block output 
}).catch((error) => {
  console.error('Error:', error);
});
